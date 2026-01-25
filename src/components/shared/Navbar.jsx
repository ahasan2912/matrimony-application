import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { images } from '../../../public/image';
import { User } from 'lucide-react';
import ProfileCard from './ProfileCard';

// For google translator
const getCurrentLanguage = () => {
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    return match ? match[1] : "en";
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const menuRef = useRef(null);
    /* language */
    const currentLang = getCurrentLanguage();
    const changeLanguage = (lang) => {
        const path = window.location.pathname;

        if (lang === "en") {
            document.cookie =
                "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            document.cookie = `googtrans=/en/${lang}; path=/`;
        }
        window.location.href = path;
    };
    const navLinks = [
        { name: 'Mathces', href: '/metches' },
        { name: 'Discover', href: '/discover' },
        { name: 'Chat', href: '/chatlist' },
        { name: 'Marriage Counselling', href: '/marriageCounselling' },
        { name: 'Verification', href: '/verificationpage' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickProfile = () => {
        setShowProfile(true);
    }
    // '/subcribtion'

    return (
        <nav ref={menuRef} className="bg-[#FFF1F3] py-4 shadow-sm sticky top-0 z-40 notranslate">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 relative">
                <div className="flex items-center">
                    <div className="bg-[#FF2D55] text-white px-6 py-2 rounded-md font-bold text-xl cursor-pointer">
                        Logo
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-5">
                    {navLinks.map((link) => (
                        <NavLink to={link.href}
                            key={link.name}
                            className={({ isActive }) => isActive ? 'text-base font-semibold transition-colors text-[#FF2D55]' : 'font-semibold transition-colors text-[#8E1B3E] hover:text-[#FF2D55] text-base'}>
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div>
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link to='/subcribtion'>
                            <button className="bg-[#F0B90B] hover:bg-[#D9A608] text-white px-2 py-2 rounded-lg flex items-center space-x-1 font-medium shadow-sm transition-all cursor-pointer">
                                <img src={images.queenIcon} alt="queenIcon" />
                                <span className='mt-0.5'>Upgrade</span>
                            </button>
                        </Link>
                        {/* Language */}
                        <select
                            value={currentLang}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-white font-medium text-gray-700 text-base cursor-pointer border border-gray-300">
                            <option value="en">English</option>
                            <option value="bn">Bangla</option>
                            <option value="ur">Urdu</option>
                            <option value="ar">Arabic</option>
                        </select>
                        <div className="flex items-center space-x-8 text-[#8E1B3E]">
                            <button className="hover:scale-110 transition-transform cursor-pointer">
                                <img src={images.navernotification} alt="navernotification" />
                            </button>
                            <button onClick={handleClickProfile} className="hover:scale-110 transition-transform cursor-pointer">
                                <User size={28} />
                            </button>
                        </div>
                    </div>
                </div>
                {
                    showProfile && <ProfileCard menuRef={menuRef} />

                }
                <div className="lg:hidden flex items-center">
                    <div className='flex items-center gap-2'>
                        {/* Language */}
                        <select
                            value={currentLang}
                            onChange={(e) => changeLanguage(e.target.value)}
                            className="px-3 py-2.5 rounded-lg bg-white font-medium text-gray-700 text-base cursor-pointer border border-gray-300">
                            <option value="en">English</option>
                            <option value="bn">Bangla</option>
                            <option value="ur">Urdu</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#8E1B3E] p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* for mobile */}
            {isOpen && (
                <div className="lg:hidden mt-4 bg-white px-3 py-3 shadow-xl border border-pink-100 absolute left-0 right-0 animate-in slide-in-from-top duration-500">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link to={link.href}
                                key={link.name}
                                className={`text-base font-semibold ${link.active ? 'text-[#FF2D55]' : 'text-[#8E1B3E]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-pink-50" />
                        <button className="bg-[#F0B90B] text-white py-3 rounded-xl font-bold flex justify-center items-center space-x-1">
                            <img src={images.queenIcon} alt="queenIcon" />
                            <span>Upgrade</span>
                        </button>
                        <div className="flex justify-around pt-2 text-[#8E1B3E]">
                            <span>🔔 Notification</span>
                            <span>👤 Profile</span>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;