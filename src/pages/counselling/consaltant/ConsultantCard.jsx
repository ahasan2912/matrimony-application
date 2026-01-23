import { Link } from "react-router-dom";

const ConsultantCard = ({ name, imageUrl, id }) => {
    return (
        <div className="flex flex-row items-center bg-[#FFF1F3] rounded-lg border border-[#FFE4E8] shadow-sm w-full p-3">

            <div className="max-w-40">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            <div className="flex flex-col flex-grow pl-5">
                <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[20px] font-bold text-[#1A1A1A] leading-tight">
                        {name}
                    </h2>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L14.47 4.88L18.24 4.1L18.66 7.93L22.28 9.36L20.47 12.75L22.28 16.14L18.66 17.57L18.24 21.4L14.47 20.62L12 23.5L9.53 20.62L5.76 21.4L5.34 17.57L1.72 16.14L3.53 12.75L1.72 9.36L5.34 7.93L5.76 4.1L9.53 4.88L12 2Z" fill="#F42C5D" />
                        <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="flex items-center gap-1.5 text-gray-600 mb-4">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15L15 12L12 9M9 12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[14px] font-medium text-[#4A4A4A]">Our Affiliated Consultant</span>
                </div>
                <Link to={`/subcribtion/${id}`}>
                    <button className="flex items-center justify-between bg-[#B3003C] hover:bg-[#8e0030] text-white py-3 px-5 rounded-full text-[14px] font-semibold transition-all group w-full max-w-50 cursor-pointer">
                        <span>Contact Consultant</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ConsultantCard;