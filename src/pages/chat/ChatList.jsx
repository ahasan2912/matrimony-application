import { Search } from "lucide-react";
import { useState } from "react";
import Messages from "./components/Messages";
import Matches from "./components/Matches";
import Requests from "./components/Requests";

const ChatList = () => {
    const [activeTab, setActiveTab] = useState('Messages');

    const messageData = [
        { id: 1, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '5', unread: 0 },
        { id: 2, name: 'Sadia Hossain', text: 'New Messages', time: '15', unread: 2 },
        { id: 3, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '10', unread: 0 },
        { id: 4, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '15', unread: 0 },
        { id: 5, name: 'Sadia Hossain', text: 'New Messages', time: '25', unread: 2 },
        { id: 6, name: 'Sadia Hossain', text: 'Looking forward to our date!', time: '20', unread: 0 },
    ];

    const tabs = ['Messages', 'Matches', 'Requests'];
    return (
        <div className="max-w-7xl mx-auto min-h-screen flex px-3 pt-3 sm:pt-5">
            <div className="w-full bg-white rounded-xl">
                <div className="border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between md:gap-4 pb-4 md:pb-0">
                    {/* Tab Navigation */}
                    <div className="flex py-5 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 md:py-3 text-sm space-x-2 rounded-full font-medium transition-colors duration-200 text-nowrap ${activeTab === tab
                                    ? 'bg-[#b30047] text-white rounded-full'
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
                <div className="pt-2">
                    {activeTab === 'Messages' && <Messages messageData={messageData} setActiveTab={setActiveTab} />}
                    {activeTab === 'Matches' && <Matches messageData={messageData} />}
                    {activeTab === 'Requests' && <Requests messageData={messageData} setActiveTab={setActiveTab}/>}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
