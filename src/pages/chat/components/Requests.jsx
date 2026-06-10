import { useState } from "react";
import { useRequestAcceptMutation, useRequestDeclineMutation, useRequestListQuery } from "../../../features/chat/requestApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Requests = ({ setActiveTab }) => {
    const { user } = useSelector((state) => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;

    const { data: requestList, isLoading, refetch } = useRequestListQuery(candidateId);
    const [requestAccept] = useRequestAcceptMutation();
    const [requestDecline] = useRequestDeclineMutation();

    const [acceptingId, setAcceptingId] = useState(null);
    const [decliningId, setDecliningId] = useState(null);

    if (isLoading) {
        return (
            <div className="p-4 text-center">
                <p>Loading...</p>
            </div>
        );
    }

    const handleClickAcceted = async (requestId) => {
        setAcceptingId(requestId);
        const res = await requestAccept({
            data: { candidateId },
            requestId,
        });
        setAcceptingId(null);

        if (res?.data?.statusCode) {
            toast.success("Request accepted!", { className: "toast-maroon" });
            refetch();
            setActiveTab("Messages");
        } else {
            toast.error("Request accept failed!", { className: "toast-maroon" });
        }
    };

    const handleClicDecline = async (requestId) => {
        setDecliningId(requestId);
        const res = await requestDecline({
            data: { candidateId },
            requestId,
        });
        setDecliningId(null);

        if (res?.data?.statusCode) {
            toast.success("Request declined!", { className: "toast-maroon" });
            refetch();
            setActiveTab("Messages");
        } else {
            toast.error("Request decline failed!", { className: "toast-maroon" });
        }
    };

    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {requestList?.data?.map((requester) => {
                const isAccepting = acceptingId === requester?._id;
                const isDeclining = decliningId === requester?._id;
                const isBusy = isAccepting || isDeclining;

                return (
                    <div key={requester?._id} className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-1.5 max-w-100">
                            <div className="relative">
                                <img
                                    src={requester?.requesterCandidate?.image}
                                    alt={requester?.requesterCandidate?.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-800">{requester?.requesterCandidate?.name}</h3>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {requester?.initialMessage
                                        ? (requester.initialMessage.split(" ").length > 3
                                            ? requester.initialMessage.split(" ").slice(0, 4).join(" ") + "..."
                                            : requester.initialMessage)
                                        : "I want to connect with you"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={() => handleClickAcceted(requester?._id)}
                                disabled={isBusy}
                                className="bg-[#34C759] text-white px-3 py-1 rounded-full flex items-center gap-2
                                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                                    ease-in-out hover:bg-[#28a745] hover:scale-105 active:scale-95 active:brightness-90 cursor-pointer"
                            >
                                {isAccepting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Accepting...
                                    </>
                                ) : (
                                    "Accept"
                                )}
                            </button>

                            <button
                                onClick={() => handleClicDecline(requester?._id)}
                                disabled={isBusy}
                                className="bg-[#DA0041] text-white px-3 py-1 rounded-full flex items-center gap-2
                                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                                    ease-in-out hover:bg-[#b80035] hover:scale-105 active:scale-95 active:brightness-90 cursor-pointer"
                            >
                                {isDeclining ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Declining...
                                    </>
                                ) : (
                                    "Decline"
                                )}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
