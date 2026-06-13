import { Paperclip, Send } from "lucide-react";
import { useRef } from "react";

const MessageForm = ({
    isImageUploading,
    isSending,
    message,
    onSubmit,
    selectedConversationId,
    setMessage,
    setUploadedImage,
    uploadedImage,
    handleSendImage
}) => {
    const fileInputRef = useRef(null);
    const canSend = Boolean(message.trim() || uploadedImage) && selectedConversationId;

    const handleAttachClick = () => {
        if (!selectedConversationId || isImageUploading) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            handleSendImage(file);
        }
        event.target.value = '';
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex h-16 shrink-0 items-center gap-3 border-t border-[#F1DDE4] bg-white px-4 md:px-6">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={handleAttachClick}
                aria-label="Attach file"
                disabled={!selectedConversationId || isImageUploading}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#E00057] transition hover:bg-[#FFF0F5] disabled:cursor-not-allowed disabled:opacity-60">
                <Paperclip size={19} />
            </button>

            <div className="relative min-w-0 flex-1">
                {uploadedImage && (
                    <div className="absolute bottom-full left-0 mb-2 flex items-center gap-2 rounded-xl border border-[#F1DDE4] bg-white p-1.5 shadow-sm">
                        <img
                            src={uploadedImage?.imageUrl}
                            alt="Selected upload"
                            className="h-12 w-12 rounded-lg object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setUploadedImage(null)}
                            className="px-2 text-xs font-semibold text-[#C2004D]">
                            Remove
                        </button>
                    </div>
                )}
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    disabled={!selectedConversationId}
                    placeholder={isImageUploading ? 'Uploading image...' : 'Type a message...'}
                    className="h-10 w-full rounded-full border border-[#F1DDE4] bg-[#FFF7FA] pl-5 pr-12 text-sm text-[#06122B] outline-none transition placeholder:text-[#8B8FA3] focus:border-[#E00057] focus:ring-2 focus:ring-[#F8D5E2] disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!canSend || isSending || isImageUploading}
                    className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#E99ABC] text-white transition hover:bg-[#E00057] disabled:cursor-not-allowed disabled:opacity-60">
                    <Send size={16} />
                </button>
            </div>
        </form>
    );
};

export default MessageForm;
