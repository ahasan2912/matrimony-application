import { Phone, Video, Info, Paperclip } from "lucide-react";
import HeaderIconButton from "./HeaderIconButton";

const ChatHeader = ({
    onBack,
    opponentAvatar,
    opponentName,
    selectedConversationId,
}) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#F1DDE4] px-4 md:px-5">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="mr-1 text-sm font-semibold text-[#C2004D] md:hidden">
                    Back
                </button>
                {selectedConversationId && (
                    <img
                        src={opponentAvatar}
                        alt={opponentName}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                )}
                <h3 className="truncate text-base font-bold text-[#58001C]">
                    {opponentName}
                </h3>
            </div>

            <div className="flex items-center gap-1 text-[#E00057]">
                <HeaderIconButton label="Call" icon={<Phone size={18} />} />
                <HeaderIconButton label="Video call" icon={<Video size={18} />} />
                <HeaderIconButton label="Conversation info" icon={<Info size={18} />} />
            </div>
        </header>
    );
};

export default ChatHeader;