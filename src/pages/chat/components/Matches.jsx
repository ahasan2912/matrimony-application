/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    useMatchesListQuery,
    useSendHIMessageMutation,
} from "../../../features/chat/matcheApi";
import { toast } from "react-toastify";

const Matches = ({ setActiveTab }) => {
    const { user } = useSelector((state) => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;
    const { data: matchesList, isLoading, refetch } = useMatchesListQuery(candidateId, {
        skip: !candidateId,
    });
    const [sendHIMessage] = useSendHIMessageMutation();
    const [loadingId, setLoadingId] = useState(null);

    const handleHiMessage = async (conversationId) => {
        try {
            setLoadingId(conversationId);

            const payload = {
                candidateId,
                conversationId,
                type: "text",
                message: "Say Hi",
                attachments: [],
            };

            const res = await sendHIMessage(payload);

            if (res?.data?.statusCode) {
                toast.success("Message sent successfully", {
                    className: "toast-maroon",
                });
                refetch();
                setActiveTab("Messages");
            } else {
                toast.error("Message sent failed", {
                    className: "toast-maroon",
                });
            }
        } catch (error) {
            toast.error("Something went wrong", {
                className: "toast-maroon",
            });
        } finally {
            setLoadingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="p-4 text-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {matchesList?.data?.map((match) => {
                // Find the other candidate (excluding current user)
                const otherCandidate = match?.candidates?.find(
                    (candidate) =>
                        candidate?._id !== candidateId &&
                        candidate?.candidateId !== candidateId
                );

                return (
                    <div
                        key={match?._id}
                        className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors group"
                    >
                        <div className="flex items-center gap-1.5 max-w-58.75">
                            <div className="relative">
                                <img
                                    src={
                                        otherCandidate?.image ||
                                        "/default-avatar.png"
                                    }
                                    alt={otherCandidate?.name || "Candidate"}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-800">
                                        {otherCandidate?.name || "Unknown"}
                                    </h3>
                                </div>

                                <p className="text-gray-500 text-sm">
                                    You share 5 matches
                                </p>
                            </div>
                        </div>

                        <button
                            disabled={loadingId === match?.conversation}
                            onClick={() =>
                                handleHiMessage(match?.conversation)
                            }
                            className="
                                flex items-center gap-2
                                bg-[#B6003F]
                                hover:bg-[#9A0035]
                                hover:scale-105
                                active:scale-95
                                text-white
                                px-2 sm:px-4
                                py-1
                                rounded-full
                                cursor-pointer
                                transition-all
                                duration-300
                                ease-in-out
                                shadow-md
                                hover:shadow-lg
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {loadingId === match?.conversation ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Say Hi...
                                </>
                            ) : (
                                "Say Hi 👋"
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Matches;