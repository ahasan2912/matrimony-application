const ConversationItem = ({ conv, isActive, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left cursor-pointer
            ${isActive ? 'bg-[#FFEFF1]' : 'hover:bg-gray-50'}`}>
        <div className="relative shrink-0">
            <img
                src={conv.avatar}
                alt={conv.name}
                className={`w-12 h-12 rounded-full object-cover border-2 ${isActive ? 'border-[#C2004D]' : 'border-white'} shadow-sm`}
            />
            {conv.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#34C759] rounded-full border-2 border-white" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
                <span className={`font-semibold text-sm truncate ${isActive ? 'text-[#C2004D]' : 'text-gray-800'}`}>
                    {conv.name}
                </span>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">{conv.time}</span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}>
                    {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                    <span className="ml-2 shrink-0 bg-[#C2004D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {conv.unread}
                    </span>
                )}
            </div>
        </div>
    </button>
);

export default ConversationItem;