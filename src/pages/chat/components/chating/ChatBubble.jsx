const ChatBubble = ({ msg, opponentAvatar }) => {
    const isMe = msg.sender === 'me';
    return (
        <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
            {!isMe && (
                <img src={opponentAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0 mb-1" />
            )}
            <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${isMe
                        ? 'bg-[#C2004D] text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-[#F1DDE4] rounded-bl-none'
                    }`}
                >
                    {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
            {isMe && (
                <img src="https://i.pravatar.cc/150?u=me" alt="" className="w-8 h-8 rounded-full object-cover shrink-0 mb-1" />
            )}
        </div>
    );
};

export default ChatBubble;