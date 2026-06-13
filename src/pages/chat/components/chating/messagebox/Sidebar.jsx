import { MoreHorizontal, Search } from 'lucide-react';
import { fallbackAvatar, formatTime, getUnreadCount } from './utility';

const Sidebar = ({
    candidateId,
    conversations,
    isLoading,
    onConversationSelect,
    search,
    selectedConversationId,
    setSearch,
    showChat,
}) => {
    return (
        <aside
            className={`${showChat ? 'hidden' : 'flex'} w-full flex-col border-[#F1DDE4] md:flex md:w-[345px] md:border-r`}>
            <div className="border-b border-[#F1DDE4] px-4 py-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#58001C]">Chats</h2>
                    <button
                        type="button"
                        aria-label="More options"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#C2004D] transition-colors hover:bg-[#FFF0F5]">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9BA3B5]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search conversations..."
                        className="h-10 w-full rounded-full border border-[#F1DDE4] bg-[#FFF7FA] pl-11 pr-4 text-sm text-[#1F2937] outline-none transition focus:border-[#C2004D] focus:ring-2 focus:ring-[#F8D5E2]"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                {isLoading ? (
                    <ConversationSkeleton />
                ) : conversations.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-[#8B8FA3]">
                        No conversations found.
                    </p>
                ) : (
                    conversations.map((conversation) => (
                        <ConversationItem
                            key={conversation?._id}
                            candidateId={candidateId}
                            conversation={conversation}
                            isActive={selectedConversationId === conversation?._id}
                            onSelect={onConversationSelect}
                        />
                    ))
                )}
            </div>
        </aside>
    );
};

const ConversationSkeleton = () => {
    return (
        <div className="space-y-4 px-4 py-3">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex animate-pulse items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-[#F4DCE6]" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-[#F4DCE6]" />
                        <div className="h-2.5 w-4/5 rounded bg-[#FAEDF2]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const ConversationItem = ({
    candidateId,
    conversation,
    isActive,
    onSelect,
}) => {
    const unread = getUnreadCount(conversation, candidateId);
    const opponent = conversation?.opponent;

    return (
        <button
            type="button"
            onClick={() => onSelect(conversation?._id)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive ? 'bg-[#FCE9EF]' : 'hover:bg-[#FFF7FA]'
            }`}>
            <img
                src={opponent?.image ?? fallbackAvatar}
                alt={opponent?.name ?? 'User'}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                    <h3
                        className={`truncate text-sm font-bold ${
                            isActive ? 'text-[#D00050]' : 'text-[#06122B]'
                        }`}>
                        {opponent?.name ?? 'Unknown'}
                    </h3>
                    <span className="shrink-0 text-[10px] font-medium text-[#9BA3B5]">
                        {formatTime(conversation?.lastMessage?.createdAt)}
                    </span>
                </div>

                <div className="mt-0.5 flex items-center gap-2">
                    <p
                        className={`min-w-0 flex-1 truncate text-xs ${
                            unread > 0
                                ? 'font-bold text-[#06122B]'
                                : 'font-medium text-[#8B8FA3]'
                        }`}>
                        {conversation?.lastMessage?.message ?? 'Say Hi'}
                    </p>
                    {unread > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#C2004D] px-1.5 text-[10px] font-bold text-white">
                            {unread}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
};

export default Sidebar;
