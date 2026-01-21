import { MessageCircle, Search } from "lucide-react";
import { useState } from "react";

const ChatList = () => {
    const [activeTab, setActiveTab] = useState('Messages');

    const messageData = [
        { id: 1, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '5m ago', unread: 0 },
        { id: 2, name: 'Sadia Hossain', text: 'New Messages', time: '5m ago', unread: 2 },
        { id: 3, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '5m ago', unread: 0 },
        { id: 4, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '5m ago', unread: 0 },
        { id: 5, name: 'Sadia Hossain', text: 'New Messages', time: '5m ago', unread: 2 },
        { id: 6, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '5m ago', unread: 0 },
    ];

    const tabs = ['Messages', 'Matches', 'Requests'];
    return (
        <div className="max-w-7xl mx-auto min-h-screen flex">
            <div className="w-full max-w-7xl bg-white rounded-xl">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex bg-gray-50 p-1 rounded-full w-fit overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-[#C2185B] text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C2185B] focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                <div className="p-2">
                    {activeTab === 'Messages' ? (
                        <div className="divide-y divide-gray-50 overflow-x-auto">
                            {messageData.map((msg, index) => (
                                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src="https://t4.ftcdn.net/jpg/09/75/07/11/360_F_975071103_e99E3iSot86QtdT8vRJUyTOYao83XxRB.jpg"
                                                alt={msg.name}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-800">{msg.name}</h3>
                                                {msg.unread > 0 && (
                                                    <span className="bg-[#C2185B] text-white text-[10px] px-1.5 py-0.5 rounded-md flex items-center">
                                                        <MessageCircle className="w-3 h-3 mr-1" fill="currentColor" />
                                                        {msg.unread}
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`text-sm ${msg.unread > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                                                {msg.text}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">{msg.time}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-400 italic">
                            No {activeTab} to show at the moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
