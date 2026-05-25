import React from 'react';
import { useSelector } from 'react-redux';
import { useReceivedLikesQuery } from '../../../../features/intraction/likeApi';

const Likedyou = () => {
    const { user } = useSelector((state) => state.auth);

    const { data: receivedLikesData, isLoading } = useReceivedLikesQuery({
        candidateId: user?.candidateLink?.candidateId,
        page: 1,
        limit: 50
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    const likedProfiles = receivedLikesData?.data || [];
    const totalLikes = receivedLikesData?.meta?.total || 0;

    return (
        <div>
            <section>
                <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#58001C]">People Liked Me</h2>
                    <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalLikes}</span>
                </div>
                <p className="text-rose-400 text-base font-medium mb-2">Total likes: {totalLikes}</p>
                <p className="text-[#737373] text-base">
                    See the profiles who have shown interest in you. Check out who liked you and make connections!
                </p>
            </section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5">
                {likedProfiles.length > 0 ? (
                    likedProfiles.map((like) => (
                        <div key={like._id} className="relative group rounded-xl overflow-hidden shadow-lg aspect-3/4 cursor-pointer">
                            <img
                                src={like.candidate.images[0]}
                                alt={like.candidate.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{like.candidate.name}, {like.candidate.age}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs mb-2">
                                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                                        🏠 {like.candidate.livesIn}
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                                        🙏 {like.candidate.religion}
                                    </span>
                                </div>

                                <p className="text-xs flex items-center gap-1 opacity-90">
                                    ❤️ Liked on {new Date(like.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-10">
                        No likes yet. Keep exploring!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Likedyou;