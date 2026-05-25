import Recommendation from './tab/Recommendation';
import Nearby from './tab/Nearby';
import Interactions from './tab/Interactions';
import { useState } from 'react';

const NEARBY_RADIUS_KM = 25;
const NEARBY_LIMIT = 20;


const Discover = () => {
    const [activeTab, setActiveTab] = useState('AI Recommendation');

    const recommendations = Array(20).fill({
        name: "Hania Amir",
        age: 21,
        occupation: "Student",
        religion: "Islam",
        location: "Lahore, Punjab, Pakistan",
        imageUrl: "https://outspoken.newagebd.com/files/img/202509/973c08360b8ad3917ef2c56f57e6daf1.jpg",
    });

    const interactions = Array(1).fill({
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

            {activeTab === 'AI Recommendation' && <Recommendation profiles={recommendations} />}
            {activeTab === 'Nearby matches' && <Nearby />}
            {activeTab === 'My Interactions' && <Interactions profiles={interactions} />}
        </div >
    );
};

export default Discover;
