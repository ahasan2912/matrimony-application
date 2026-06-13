import {
    getAttachmentImageUrl,
    getMessageAttachments,
    getMessageSenderId,
} from "./utility";

const MessageBubble = ({ candidateId, message, opponentAvatar }) => {
    const isMine = getMessageSenderId(message) === candidateId;
    const messageText = message?.message ?? message?.text;
    const imageAttachments = getMessageAttachments(message).filter((attachment) =>
        getAttachmentImageUrl(attachment)
    );

    return (
        <div
            className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'
                }`}>
            {!isMine && (
                <img
                    src={opponentAvatar}
                    alt=""
                    className="mb-1 h-8 w-8 rounded-full object-cover"
                />
            )}
            <div
                className={`max-w-[78%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed shadow-sm ${isMine
                    ? 'rounded-br-sm bg-[#E00057] text-white'
                    : 'rounded-bl-sm border border-[#F1DDE4] bg-white text-[#06122B]'
                    }`}>
                {imageAttachments.length > 0 && (
                    <div className="space-y-2">
                        {imageAttachments.map((attachment) => (
                            <img
                                key={getAttachmentImageUrl(attachment)}
                                src={getAttachmentImageUrl(attachment)}
                                alt="Chat attachment"
                                className="max-h-72 rounded-xl object-cover"
                            />
                        ))}
                    </div>
                )}
                {messageText && (
                    <p className={imageAttachments.length > 0 ? 'mt-2' : ''}>
                        {messageText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
