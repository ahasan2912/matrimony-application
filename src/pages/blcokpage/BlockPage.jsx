import React, { useState } from 'react';

const BlockPage = () => {
    const [blockedUsers, setBlockedUsers] = useState([
        { id: 1, name: 'Sadia Hossain', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBZBnpNcBrvaK_39KJtsMQbsb1KGIs1LeAw&s' },
        { id: 2, name: 'Sadia Hossain', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBZBnpNcBrvaK_39KJtsMQbsb1KGIs1LeAw&s' },
        { id: 3, name: 'Sadia Hossain', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBZBnpNcBrvaK_39KJtsMQbsb1KGIs1LeAw&s' },
    ]);

    const handleUnblock = (id) => {
        setBlockedUsers(blockedUsers.filter(user => user.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 bg-white my-10">
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-[#58001C] mb-2">Report & Blocking</h2>
                <p className="text-base leading-relaxed text-[#525252]">
                    In this section, you can report users who are violating our community guidelines or block individuals who are disruptive to your experience.
                    Reporting is an important feature that helps maintain a safe environment for all users. When you report a user, our moderation team
                    will review the issue and take necessary action. Blocking a user prevents them from messaging or interacting with your profile.
                    You can unblock anyone at any time, giving you control over your connections and interactions. Please use these features responsibly
                    to help keep the community safe and respectful.
                </p>
            </section>
            <section>
                <h3 className="text-xl font-semibold text-[#58001C]">Your Block List</h3>

                <div className="space-y-0">
                    {blockedUsers.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-lg font-medium text-gray-800">{user.name}</span>
                            </div>

                            <button
                                onClick={() => handleUnblock(user.id)}
                                className="text-[#58001C] font-semibold cursor-pointer transition-all"
                            >
                                Unblock
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <div className="mt-12 flex justify-center cursor-pointer">
                <button className="w-full sm:w-auto bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 px-12 rounded-full text-lg shadow-md transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default BlockPage;