import loveIcon from '../../../public/images/svg/loveIcon.svg';
import HeadingTitle from '../../components/home/HeadingTitle';
import { useState } from 'react';
import { selecteInterestItems, selectePersonalInterest } from '../../data/data';
import { useNavigate } from 'react-router-dom';

const TypeSelected = () => {
    const [selected, setSelected] = useState([]);
    const [prsnlInrstSelected, setPrsnlInrstSelected] = useState([]);
    const [smoking, setSmoking] = useState('Yes, Regularly');
    const [alcohol, setAlcohol] = useState('Yes, Regularly');
    const navigate = useNavigate();

    const toggleInterest = (interest) => {
        let updated;
        if (selected.includes(interest)) {
            updated = selected.filter(i => i !== interest);
        } else {
            if (selected.length >= 15) return;
            updated = [...selected, interest];
        }
        setSelected(updated);
    };
    const togglePersonalInterest = (personalInterest) => {
        let updated;
        if (prsnlInrstSelected.includes(personalInterest)) {
            updated = prsnlInrstSelected.filter(i => i !== personalInterest);
        } else {
            if (prsnlInrstSelected.length >= 5) return;
            updated = [...prsnlInrstSelected, personalInterest];
        }
        setPrsnlInrstSelected(updated);
    };

    const options = [
        "Yes, Regularly",
        "Occasionally",
        "Rarely",
        "No, Never"
    ];

    const handleClickSelected = () => {
        navigate("/profileupload");
    }

    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <img src={loveIcon} className="hidden sm:block absolute top-20 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                {/* Smoking & Alcohol habits */}
                <div className="max-w-md bg-white">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-[#58001C] mb-3">Smoking & Alcohol habits</h2>
                        <label className="text-xl font-semibold text-[#262626]">
                            Do you smoke?
                        </label>
                        <div className="relative mt-3">
                            <select
                                value={smoking}
                                onChange={(e) => setSmoking(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-400 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-500"
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="text-xl font-semibold text-[#262626]">
                            Do you drink alcohol?
                        </label>
                        <div className="relative mt-3">
                            <select
                                value={alcohol}
                                onChange={(e) => setAlcohol(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-400 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-500"
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interests & Personality */}
                <div className='mt-10'>
                    <h1 className="text-2xl font-bold text-[#58001C] mb-3">Interests & Personality</h1>
                    <div className=''>
                        <h1 className='text-xl font-semibold text-[#262626]'>What are your interests?</h1>
                        <p className='text-[#737373] text-base mt-1'>Pick up to <span className='text-[#262626] font-bold'>15 interests</span> that describe you best.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                        {selecteInterestItems.map((cat) => (
                            <div key={cat.title} className={`${cat.color} rounded-xl overflow-hidden shadow-sm border border-gray-100`}>
                                <div className={`${cat.headerColor} text-white text-lg text-center py-2 font-bold`}>
                                    {cat.title}
                                </div>
                                <div className="p-4 flex flex-wrap gap-2 justify-start">
                                    {cat.items.map((item) => {
                                        const isSelected = selected.includes(item);
                                        return (
                                            <button
                                                key={item}
                                                onClick={() => toggleInterest(item)}
                                                className={`px-3 py-1.5 rounded-full text-base font-medium transition-all duration-200 border
                                                ${isSelected
                                                        ? 'bg-pink-300 border-pink-300 text-white shadow-inner scale-95'
                                                        : 'bg-white border-transparent text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* describe your personality */}
                    <div className='mt-10'>
                        <h1 className='text-xl font-semibold text-[#262626]'>How would you describe your personality?</h1>
                        <p className='text-[#737373] text-base mt-1'> Pick up to <span className='text-[#262626] font-bold'>5 traits</span>to express your personality.</p>
                        <div className="mt-5">
                            {selectePersonalInterest.map((cat) => (
                                <div key={cat.title} className={`${cat.color} rounded-lg overflow-hidden shadow-sm border border-gray-100`}>
                                    <div className="px-4 py-6 flex flex-wrap gap-2 justify-start">
                                        {cat.items.map((item) => {
                                            const isprsnlInrstSelected = prsnlInrstSelected.includes(item);
                                            return (
                                                <button
                                                    key={item}
                                                    onClick={() => togglePersonalInterest(item)}
                                                    className={`px-3 py-1.5 rounded-full text-base font-medium transition-all duration-200 border
                                                      ${isprsnlInrstSelected
                                                            ? 'bg-[#FF225E] border-pink-300 text-white shadow-inner scale-95'
                                                            : 'bg-white border-transparent text-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {item}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        onClick={handleClickSelected}
                        className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypeSelected;
