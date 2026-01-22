
const Messages = ({ messageData }) => {
    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {messageData.map((msg, index) => (
                <div
                    key={index}
                    className="flex items-center px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors gap-2">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <img
                            src="https://t4.ftcdn.net/jpg/09/75/07/11/360_F_975071103_e99E3iSot86QtdT8vRJUyTOYao83XxRB.jpg"
                            alt={msg.name}
                            className="w-14 h-14 rounded-full object-cover shrink-0"
                        />

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-800 truncate">
                                    {msg.name}
                                </h3>

                                {msg.unread > 0 && (
                                    <span className="bg-[#C2185B] text-white text-[10px] px-1.5 py-0.5 rounded-md shrink-0">
                                        {msg.unread}
                                    </span>
                                )}
                            </div>

                            <p
                                className={`text-sm truncate ${msg.unread > 0
                                        ? "text-gray-900 font-bold"
                                        : "text-gray-500"
                                    }`}>
                                {msg.text}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE (ALWAYS RIGHT) */}
                    <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                        {msg.time}m ago
                    </span>
                </div>
            ))}
        </div>

    );
};

export default Messages;