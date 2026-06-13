import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useConversationListQuery,
    useConversationMediaMutation,
    useConversationMessageQuery,
    useSendMessageMutation,
} from '../../../../../features/chat/messageApi';
import Sidebar from './Sidebar';
import {
    chatSocketEvents,
    createChatSocket,
    fallbackAvatar,
    getMessageConversationId,
    incomingMessageEvents,
    mergeMessages,
    normalizeSocketMessage,
} from './utility';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import DateDivider from './DateDivider';
import ChatHeader from './ChatHeader';

const MessageBox = () => {
    const [search, setSearch] = useState('');
    const [activeConversationId, setActiveConversationId] = useState('');
    const [message, setMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [socketMessages, setSocketMessages] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const socketRef = useRef(null);
    const selectedConversationIdRef = useRef('');

    const { user } = useSelector((state) => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;

    const {
        data: conversationData,
        isLoading: isConversationLoading,
        refetch: refetchConversations,
    } = useConversationListQuery(candidateId, {
        skip: !candidateId,
    });

    const conversations = useMemo(
        () => conversationData?.data?.conversations ?? [],
        [conversationData]
    );

    const activeConversation = useMemo(() => {
        if (activeConversationId) {
            return conversations.find((item) => item?._id === activeConversationId);
        }

        return conversations[0];
    }, [activeConversationId, conversations]);

    const selectedConversationId = activeConversation?._id;

    const {
        data: messageData,
        isLoading: isMessageLoading,
        refetch: refetchMessages,
    } = useConversationMessageQuery(
        { conversationId: selectedConversationId, candidateId },
        { skip: !selectedConversationId || !candidateId }
    );

    const [conversationMedia, { isLoading: isImageUploading }] =
        useConversationMediaMutation();
    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    const filteredConversations = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return conversations;

        return conversations.filter((conversation) =>
            conversation?.opponent?.name?.toLowerCase().includes(query)
        );
    }, [conversations, search]);

    const messages = useMemo(() => {
        return (
            messageData?.data?.messages ??
            messageData?.data ??
            messageData?.messages ??
            []
        );
    }, [messageData]);

    const displayMessages = useMemo(() => {
        return socketMessages.reduce(
            (mergedMessages, socketMessage) =>
                mergeMessages(mergedMessages, socketMessage),
            messages
        );
    }, [messages, socketMessages]);

    useEffect(() => {
        selectedConversationIdRef.current = selectedConversationId;
    }, [selectedConversationId]);

    useEffect(() => {
        if (!candidateId) return undefined;

        const socket = createChatSocket(candidateId);
        socketRef.current = socket;

        const handleIncomingMessage = (payload) => {
            const incomingMessage = normalizeSocketMessage(payload);
            const incomingConversationId = getMessageConversationId(incomingMessage);
            const currentConversationId = selectedConversationIdRef.current;

            if (incomingConversationId === currentConversationId) {
                setSocketMessages((currentMessages) =>
                    mergeMessages(currentMessages, incomingMessage)
                );
            }

            refetchConversations();
        };

        incomingMessageEvents.forEach((eventName) => {
            socket.on(eventName, handleIncomingMessage);
        });
        socket.connect();
        socket.emit(chatSocketEvents.connectUser, { candidateId });

        return () => {
            incomingMessageEvents.forEach((eventName) => {
                socket.off(eventName, handleIncomingMessage);
            });
            socket.disconnect();
            socketRef.current = null;
        };
    }, [candidateId, refetchConversations]);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket || !selectedConversationId || !candidateId) return undefined;

        const roomPayload = {
            conversationId: selectedConversationId,
            candidateId,
        };

        socket.emit(chatSocketEvents.joinConversation, roomPayload);

        return () => {
            socket.emit(chatSocketEvents.leaveConversation, roomPayload);
        };
    }, [candidateId, selectedConversationId]);

    const opponent = activeConversation?.opponent;
    const opponentName = opponent?.name ?? 'Select a chat';
    const opponentAvatar = opponent?.image ?? fallbackAvatar;

    const handleConversationSelect = (conversationId) => {
        setActiveConversationId(conversationId);
        setShowChat(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (
            (!trimmedMessage && !uploadedImage) ||
            !selectedConversationId ||
            isSending ||
            isImageUploading
        ) {
            return;
        }

        const payload = {
            conversationId: selectedConversationId,
            candidateId,
            type: uploadedImage ? 'image' : 'text',
            message: trimmedMessage,
            attachments: uploadedImage ? [uploadedImage] : [],
        };

        try {
            const response = await sendMessage(payload).unwrap();
            const sentMessage = normalizeSocketMessage(response);

            setSocketMessages((currentMessages) =>
                mergeMessages(currentMessages, sentMessage)
            );
            socketRef.current?.emit(chatSocketEvents.messageSent, {
                ...payload,
                message: sentMessage?.message ?? payload.message,
            });
            setMessage('');
            setUploadedImage(null);
            refetchMessages();
            refetchConversations();
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const handleSendImage = async (file) => {
        if (!file || !selectedConversationId || isImageUploading) return;

        const formData = new FormData();
        formData.append('metadata',{candidateId: candidateId} )
        formData.append('file', file);
        
        try {
            const response = await conversationMedia({
                conversationId: selectedConversationId,
                data: formData,
            }).unwrap();

            setUploadedImage(response?.data ?? response);
        } catch (error) {
            console.error('Failed to upload chat image', error);
        }
    };

    return (
        <div className="h-[calc(100vh-180px)] min-h-155 overflow-hidden rounded-2xl border border-[#F1DDE4] bg-white">
            <div className="flex h-full">
                <Sidebar
                    candidateId={candidateId}
                    conversations={filteredConversations}
                    isLoading={isConversationLoading}
                    onConversationSelect={handleConversationSelect}
                    search={search}
                    selectedConversationId={selectedConversationId}
                    setSearch={setSearch}
                    showChat={showChat}
                />

                <section
                    className={`${showChat ? 'flex' : 'hidden'} min-w-0 flex-1 flex-col bg-[#FFFCFD] md:flex`}>
                    <ChatHeader
                        onBack={() => setShowChat(false)}
                        opponentAvatar={opponentAvatar}
                        opponentName={opponentName}
                        selectedConversationId={selectedConversationId}
                    />

                    <main className="flex-1 overflow-y-auto px-4 py-7 md:px-5">
                        <DateDivider />
                        <MessageList
                            candidateId={candidateId}
                            isLoading={isMessageLoading}
                            messages={displayMessages}
                            opponentAvatar={opponentAvatar}
                            selectedConversationId={selectedConversationId}
                        />
                    </main>

                    <MessageForm
                        isImageUploading={isImageUploading}
                        isSending={isSending}
                        message={message}
                        uploadedImage={uploadedImage}
                        selectedConversationId={selectedConversationId}
                        setMessage={setMessage}
                        setUploadedImage={setUploadedImage}
                        onSubmit={handleSubmit}
                        handleSendImage={handleSendImage}
                    />
                </section>
            </div>
        </div>
    );
};

export default MessageBox;
