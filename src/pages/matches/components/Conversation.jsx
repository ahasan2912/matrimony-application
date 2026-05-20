import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Heart, MessageCircle, Send, ShieldCheck, X } from "lucide-react";

const defaultMessage = "Assalamu Alaikum, I liked your profile and would be happy to get to know you better.";

const Conversation = ({ candidate, image, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: defaultMessage,
    },
  });

  const candidateName = candidate?.name || "this match";
  const candidateAge = candidate?.age ? `, ${candidate.age}` : "";
  const matchScore = Number(candidate?.matchScore);
  const formattedMatchScore = Number.isFinite(matchScore) ? `${Math.round(matchScore)}% match` : "Matched profile";
  const candidateImage = image || candidate?.images?.[0];
  const quickMessages = [
    defaultMessage,
    `Hi ${candidateName}, your profile caught my attention. Would you like to talk?`,
    "Hello, I appreciate your profile and values. I would like to start a respectful conversation.",
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const onSubmit = (data) => {
    onCreate?.({
      ...data,
      candidateId: candidate?.targetCandidateId || candidate?.candidateId || candidate?._id || candidate?.id,
    });
    console.log(data);
    reset();
    onClose?.();
  };

  console.log(candidate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F0711]/60 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="conversation-title"
        className="relative flex max-h-[92vh] w-full max-w-145 flex-col overflow-hidden rounded-2xl border border-[#F1DDE4] bg-white shadow-[0_24px_70px_rgba(88,0,28,0.22)]"
      >
        <div className="bg-[#FFF5F8] px-5 py-5 sm:px-6">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close conversation modal"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-lg border border-[#F1DDE4] bg-white text-[#58001C] transition-colors hover:bg-[#FFEAF2] cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4 pr-10">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#FFEAF2]">
              {candidateImage ? (
                <img src={candidateImage} alt={candidateName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#C2004D]">
                  <Heart size={28} fill="currentColor" />
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-[#FFB8CB] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#C2004D]">
                <ShieldCheck size={13} />
                {formattedMatchScore}
              </div>
              <h2 id="conversation-title" className="truncate text-xl font-semibold text-[#58001C]">
                Message {candidateName}{candidateAge}
              </h2>
              {candidate?.livesIn && (
                <p className="mt-1 truncate text-sm text-[#737373]">{candidate.livesIn}</p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto px-5 py-2 sm:px-6">
          <div className="mt-3">
            <label htmlFor="conversation-message" className="mb-2 block text-base font-semibold text-[#262626]">
              First message
            </label>
            <textarea
              id="conversation-message"
              rows={5}
              {...register("message", {
                required: "Please write a message.",
                minLength: {
                  value: 12,
                  message: "Message should be at least 12 characters.",
                },
              })}
              className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-[#1F2937] outline-none transition focus:border-[#C2004D] focus:ring-4 focus:ring-[#FFEAF2] ${errors.message ? "border-[#B30042]" : "border-[#E7DDE1]"
                }`}
              placeholder="Write a respectful first message..."
            />
            {errors.message && (
              <p className="mt-1.5 text-sm font-medium text-[#B30042]">{errors.message.message}</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickMessages.map((message) => (
              <button
                key={message}
                type="button"
                onClick={() => setValue("message", message, { shouldDirty: true, shouldValidate: true })}
                className="rounded-md border border-[#E7DDE1] bg-white px-3 py-1.5 text-left text-sm font-medium text-[#58001C] transition-colors hover:border-[#FF9BB7] hover:bg-[#FFF5F8]"
              >
                {message}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E7DDE1] bg-white px-5 text-sm font-semibold text-[#58001C] transition-colors hover:bg-[#FFF5F8]">
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#C2004D] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(194,0,77,0.25)] transition-colors hover:bg-[#A90043]">
              Send request
              <Send size={17} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Conversation;
