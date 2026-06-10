import { useEffect, useMemo, useRef, useState } from 'react';
import { Phone, Video, Info, Send, Smile, Paperclip, ChevronLeft, Circle } from 'lucide-react';
import { useSelector } from 'react-redux';
import ChatBubble from './ChatBubble';
import Sidebar from './Sidebar';
import {
    useConversationListQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
} from '../../../../features/chat/messageApi';

const MessageBox = () => {
    const { user } = useSelector((state) => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;
    const [activeId, setActiveId] = useState(null);
    const [input, setInput] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const scrollRef = useRef(null);
    const { data: conversationData } = useConversationListQuery(candidateId, {
        skip: !candidateId,
    });

    const conversations = useMemo(
        () => conversationData?.data?.conversations ?? [],
        [conversationData]
    );

    const resolvedActiveId = activeId ?? conversations[0]?._id ?? null;
    const activeConv = useMemo(
        () => conversations.find((c) => c._id === resolvedActiveId) ?? null,
        [conversations, resolvedActiveId]
    );
    const opponent = activeConv?.opponent ?? null;

    const { data: messagesData, isLoading: msgLoading } = useGetMessagesQuery(
        resolvedActiveId,
        { skip: !resolvedActiveId, pollingInterval: 5000 }
    );

    const messages = useMemo(
        () => messagesData?.data ?? [],
        [messagesData]
    );

    const normalisedMessages = useMemo(
        () =>
            messages.map((msg) => ({
                id: msg?._id,
                text: msg?.message ?? '',
                time: msg?.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                      })
                    : '',
                sender: msg?.sentBy === candidateId || msg?.sender === candidateId
                    ? 'me'
                    : 'other',
            })),
        [messages, candidateId]
    );

    const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [normalisedMessages, resolvedActiveId]);

    const handleSend = async () => {
        if (!input.trim() || !resolvedActiveId) return;
        const payload = {
            candidateId,
            conversationId: resolvedActiveId,
            type: 'text',
            message: input.trim(),
            attachments: [],
        };
        setInput('');
        await sendMessage(payload);
    };

    const handleSelect = (id) => {
        setActiveId(id);
        setShowSidebar(false);
    };

    return (
        <div className="max-w-7xl mx-auto my-6 px-3 sm:px-4">
            <div className="flex h-[88vh] overflow-hidden rounded-2xl border border-[#F1DDE4] shadow-[0_18px_55px_rgba(88,0,28,0.08)] bg-white">

                {/* ── Sidebar ── */}
                <Sidebar
                    showSidebar={showSidebar}
                    activeId={resolvedActiveId}
                    handleSelect={handleSelect}
                />

                {/* ── Chat Panel ── */}
                <div className={`${!showSidebar ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0`}>
                    {activeConv ? (
                        <>
                            {/* Chat header */}
                            <header className="flex items-center justify-between px-4 py-3.5 border-b border-[#F1DDE4] bg-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowSidebar(true)}
                                        className="md:hidden p-1.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer"
                                    >
                                        <ChevronLeft size={22} />
                                    </button>
                                    <div className="relative">
                                        <img
                                            src={opponent?.image ?? '/default-avatar.png'}
                                            alt={opponent?.name ?? 'User'}
                                            className="w-11 h-11 rounded-full object-cover border-2 border-[#F1DDE4]"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#58001C] text-base leading-tight">
                                            {opponent?.name ?? 'Unknown'}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button type="button" className="p-2.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors">
                                        <Phone size={19} />
                                    </button>
                                    <button type="button" className="p-2.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors">
                                        <Video size={19} />
                                    </button>
                                    <button type="button" className="p-2.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors">
                                        <Info size={19} />
                                    </button>
                                </div>
                            </header>

                            {/* Messages area */}
                            <main
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#FDFAFA]"
                            >
                                <div className="flex items-center gap-3 my-2">
                                    <div className="flex-1 h-px bg-[#F1DDE4]" />
                                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Today</span>
                                    <div className="flex-1 h-px bg-[#F1DDE4]" />
                                </div>

                                {msgLoading ? (
                                    <div className="flex flex-col gap-4 animate-pulse">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                <div className="h-9 bg-[#F1DDE4] rounded-2xl w-48" />
                                            </div>
                                        ))}
                                    </div>
                                ) : normalisedMessages.length === 0 ? (
                                    <p className="text-center text-gray-400 text-sm mt-8">
                                        No messages yet. Say Hi 👋
                                    </p>
                                ) : (
                                    normalisedMessages.map((msg) => (
                                        <ChatBubble
                                            key={msg.id}
                                            msg={msg}
                                            opponentAvatar={opponent?.image ?? '/default-avatar.png'}
                                        />
                                    ))
                                )}
                            </main>

                            {/* Input footer */}
                            <footer className="px-4 py-3 border-t border-[#F1DDE4] bg-white shrink-0">
                                <div className="flex items-center gap-2">
                                    <button type="button" className="p-2.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors shrink-0">
                                        <Paperclip size={19} />
                                    </button>
                                    <button type="button" className="p-2.5 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors shrink-0">
                                        <Smile size={19} />
                                    </button>
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Type a message..."
                                            className="w-full bg-[#FFF5F7] border border-[#F1DDE4] rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#C2004D] transition-colors pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSend}
                                            disabled={!input.trim() || sending}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[#C2004D] text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#A90043] transition-colors"
                                        >
                                            {sending ? (
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Send size={15} className="-rotate-45" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 rounded-full bg-[#FFEFF1] flex items-center justify-center mb-4">
                                <Circle size={36} className="text-[#C2004D]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#58001C]">Select a conversation</h3>
                            <p className="text-gray-400 text-sm mt-2">Choose from your matches to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
