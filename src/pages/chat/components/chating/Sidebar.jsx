import { MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useConversationListQuery } from "../../../../features/chat/messageApi";
import ConversationItem from "./ConversationItem";

export default function Sidebar({ showSidebar, activeId, handleSelect }) {
    const [search, setSearch] = useState('');

    const { user } = useSelector((state) => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;

    const { data: conversationData, isLoading } = useConversationListQuery(
        candidateId,
        { skip: !candidateId }
    );

    const conversations = useMemo(
        () => conversationData?.data?.conversations ?? [],
        [conversationData]
    );

    const buildConvShape = (conv) => {
        const unread = conv?.unreadCounts?.[candidateId] ?? conv?.unreadCount ?? 0;
        return {
            id: conv?._id,
            name: conv?.opponent?.name ?? 'Unknown',
            avatar: conv?.opponent?.image ?? '/default-avatar.png',
            lastMessage: conv?.lastMessage?.message ?? 'Say Hi 👋',
            time: conv?.lastMessage?.createdAt
                ? new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                  })
                : '',
            unread,
            online: false,
        };
    };

    const filtered = useMemo(() => {
        if (!search.trim()) return conversations;
        return conversations.filter((conv) => {
            const name = conv?.opponent?.name ?? '';
            return name.toLowerCase().includes(search.toLowerCase());
        });
    }, [conversations, search]);

    return (
        <aside className={`${showSidebar ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-80 lg:w-96 border-r border-[#F1DDE4] shrink-0`}>

            {/* Header */}
            <div className="px-4 pt-5 pb-3 border-b border-[#F1DDE4]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#58001C]">Chats</h2>
                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-[#FFEFF1] text-[#C2004D] cursor-pointer transition-colors"
                    >
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FFF5F7] border border-[#F1DDE4] rounded-full outline-none focus:border-[#C2004D] transition-colors"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-2">
                {isLoading ? (
                    <div className="flex flex-col gap-3 px-4 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 animate-pulse">
                                <div className="w-12 h-12 rounded-full bg-[#F1DDE4] shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-[#F1DDE4] rounded w-3/4" />
                                    <div className="h-2.5 bg-[#F1DDE4] rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm mt-8">
                        No conversations found.
                    </p>
                ) : (
                    filtered.map((conv) => (
                        <ConversationItem
                            key={conv._id}
                            conv={buildConvShape(conv)}
                            isActive={activeId === conv._id}
                            onClick={() => handleSelect(conv._id)}
                        />
                    ))
                )}
            </div>
        </aside>
    );
}
