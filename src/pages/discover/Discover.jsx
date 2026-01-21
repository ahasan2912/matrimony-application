import { useState } from 'react';
import Recommendation from './components/Recommendation';
import Nearby from './components/Nearby';
import Interactions from './components/Interactions';

const Discover = () => {
    const [activeTab, setActiveTab] = useState('AI Recommendation');

    // Mock data for the cards
    const recommendations = Array(15).fill({
        name: "Hania Amir",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://outspoken.newagebd.com/files/img/202509/973c08360b8ad3917ef2c56f57e6daf1.jpg",
    });
    // Mock data for the cards
    const nearby = Array(15).fill({
        name: "Sadia Hossain",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://t4.ftcdn.net/jpg/09/75/07/11/360_F_975071103_e99E3iSot86QtdT8vRJUyTOYao83XxRB.jpg",
    });
    // Mock data for the cards
    const interactions = Array(15).fill({
        name: "Hania Amir",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://i.ibb.co.com/qYBv1KKy/image.png",
    });

    const tabs = ['AI Recommendation', 'Nearby matches', 'My Interactions'];
    return (
        <div className="max-w-7xl mx-auto px-4 bg-white min-h-screen">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4 py-5 overflow-x-auto">
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

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'AI Recommendation' && <Recommendation profiles={recommendations} />}
            {activeTab === 'Nearby matches' && <Nearby profiles={nearby} />}
            {activeTab === 'My Interactions' && <Interactions profiles={interactions} />}
        </div >
    );
};

export default Discover;