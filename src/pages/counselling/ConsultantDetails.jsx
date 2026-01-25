import { Calendar, Video, Send } from 'lucide-react';
import { images } from '../../../public/image';
import { useState } from 'react';

const ConsultantDetails = () => {
    const [text, setText] = useState('');
    // const { id } = useParams();

    const handleSendClick = () => {
        console.log(text);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 bg-white text-slate-800 my-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <div className="relative">
                    <div className="w-40 h-40 rounded-full border-2 border-[#B6003F] p-1.25">
                        <img
                            src="../../src/assets/images/consultant.png"
                            alt="Alfaaz Ahmed"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="absolute top-4 right-0 z-50 rounded-full p-1">
                        <img src={images.verified} alt="" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-1">Alfaaz Ahmed</h1>
                    <div className="flex items-center justify-center md:justify-start gap-1 text-gray-600 mb-3">
                        <span className="text-lg">🏅</span>
                        <span className="text-sm font-medium">Our Affiliated Consultant</span>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Active now
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <button className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors cursor-pointer">
                            <Calendar size={18} />
                            Ask to schedule
                        </button>
                        <button className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors cursor-pointer">
                            <Video size={18} />
                            Request video meet
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-[#404040] text-base leading-relaxed mb-8">
                With over 10 years of experience, Alfaaz Ahmed specializes in communication and relationship counseling,
                offering expert guidance to help couples build lasting connections.
            </p>

            <div className="bg-[#F5F5F5] border border-gray-100 rounded-xl py-5 md:py-10 px-5">
                <h2 className="text-[#B6003F] text-xl font-semibold mb-1">Want to ask something first?</h2>
                <p className="text-[#737373] mb-8">Send a quick message to the consultant!</p>

                <div className="relative group">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message...."
                        className="w-full bg-gray-200 border-none rounded-lg py-4 px-6 pr-12 focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendClick();
                            }
                        }}
                    />
                    <button onClick={handleSendClick} className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-600 hover:scale-110 transition-transform">
                        <Send size={24} className="-rotate-9" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ConsultantDetails;