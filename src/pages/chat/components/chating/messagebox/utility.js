import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

export const fallbackAvatar = '/images/navaruser.png';

export const chatSocketEvents = {
    connectUser: 'user:connect',
    joinConversation: 'conversation:join',
    leaveConversation: 'conversation:leave',
    messageNew: 'message:new',
    messageReceived: 'receive_message',
    messageSent: 'send_message',
};

export const incomingMessageEvents = [
    chatSocketEvents.messageNew,
    chatSocketEvents.messageReceived,
    'newMessage',
    'receiveMessage',
    'message:received',
];

export const createChatSocket = (candidateId) => {
    const socketUrl = getSocketUrl();
    const accessToken = Cookies.get('accessToken');

    return io(socketUrl, {
        autoConnect: false,
        transports: ['websocket', 'polling'],
        withCredentials: true,
        auth: {
            token: accessToken,
            candidateId,
        },
        query: {
            candidateId,
        },
    });
};

export const getSocketUrl = () => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    if (socketUrl) return socketUrl;
    if (!baseUrl) return window.location.origin;

    return baseUrl.replace(/\/api\/?$/i, '').replace(/\/api\/v\d+\/?$/i, '');
};

export const formatTime = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getUnreadCount = (conversation, candidateId) => {
    return (
        conversation?.unreadCounts?.[candidateId] ??
        conversation?.unreadCount ??
        conversation?.unread ??
        0
    );
};

export const getMessageSenderId = (message) => {
    return (
        message?.senderId?._id ??
        message?.senderId ??
        message?.sender?._id ??
        message?.sender ??
        message?.sentBy?._id ??
        message?.sentBy
    );
};

export const getMessageConversationId = (message) => {
    return (
        message?.conversationId?._id ??
        message?.conversationId ??
        message?.conversation?._id ??
        message?.conversation
    );
};

export const normalizeSocketMessage = (payload) => {
    return payload?.data?.message ?? payload?.message ?? payload?.data ?? payload;
};

export const mergeMessages = (currentMessages, incomingMessage) => {
    if (!isMessageObject(incomingMessage)) return currentMessages;

    const incomingKey = getMessageKey(incomingMessage);
    const alreadyExists = currentMessages.some(
        (message) => getMessageKey(message) === incomingKey
    );

    if (alreadyExists) return currentMessages;

    return [...currentMessages, incomingMessage];
};

export const isMessageObject = (message) => {
    return Boolean(message && typeof message === 'object' && !Array.isArray(message));
};

export const getMessageKey = (message) => {
    return (
        message?._id ??
        message?.id ??
        `${getMessageSenderId(message) ?? 'unknown'}-${
            message?.createdAt ?? message?.message ?? message?.text
        }`
    );
};

export const getMessageAttachments = (message) => {
    const attachments =
        message?.attachments ??
        message?.media ??
        message?.files ??
        message?.images ??
        [];

    if (Array.isArray(attachments)) return attachments;
    return [attachments];
};

export const getAttachmentImageUrl = (attachment) => {
    return (
        attachment?.imageUrl ??
        attachment?.url ??
        attachment?.secureUrl ??
        attachment?.src ??
        attachment?.path
    );
};
