import { useSelector } from "react-redux";
import { useConversationListQuery } from "../../../features/conversation/conversation";
import { timeAgo } from "./utility";

const Messages = () => {
    const { user } = useSelector(state => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;

    const { data: conversationData, isLoading } = useConversationListQuery(candidateId, {
        skip: !candidateId,
    });

    if (isLoading) {
        return <p>Loading......</p>
    }

    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {conversationData?.data?.conversations?.map((msg) => (
                <div
                    key={msg?._id}
                    className="flex items-center px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors gap-2">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <img
                            src={msg?.opponent?.image}
                            alt={msg.name}
                            className="w-14 h-14 rounded-full object-cover shrink-0"
                        />

                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-800 truncate">
                                    {msg?.opponent?.name}
                                </h3>

                                {msg.unread > 0 && (
                                    <span className="bg-[#C2185B] text-white text-[10px] px-1.5 py-0.5 rounded-md shrink-0">
                                        {msg.unread}
                                    </span>
                                )}
                            </div>

                            {
                                msg?.lastMessage?.message ? <p
                                    className={`text-sm truncate ${msg.unread > 0
                                        ? "text-gray-900 font-bold"
                                        : "text-gray-500"
                                        }`}>
                                    {msg?.lastMessage?.message}
                                </p> : <p className="text-gray-500 text-sm">No messages yet</p>
                            }
                        </div>
                    </div>

                    {/* RIGHT SIDE (ALWAYS RIGHT) */}
                    <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                        {timeAgo(msg?.lastMessage?.createdAt)}
                    </span>
                </div>
            ))}
        </div>

    );
};

export default Messages;