import MessageBubble from "./MessageBubble";

const MessageList = ({
    candidateId,
    isLoading,
    messages,
    opponentAvatar,
    selectedConversationId,
}) => {
    if (!selectedConversationId) {
        return (
            <p className="pt-4 text-center text-sm font-medium text-[#8B8FA3]">
                Select a conversation to start chatting.
            </p>
        );
    }

    if (isLoading) {
        return (
            <p className="pt-4 text-center text-sm font-medium text-[#8B8FA3]">
                Loading messages...
            </p>
        );
    }

    if (messages.length === 0) {
        return (
            <p className="pt-1 text-center text-sm font-medium text-[#8B8FA3]">
                No messages yet. Say Hi
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {messages.map((item) => (
                <MessageBubble
                    key={item?._id ?? item?.createdAt}
                    candidateId={candidateId}
                    message={item}
                    opponentAvatar={opponentAvatar}
                />
            ))}
        </div>
    );
};

export default MessageList;