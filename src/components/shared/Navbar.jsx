import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Mathces', href: '/metches' },
        { name: 'Discover', href: '/discover' },
        { name: 'Chat', href: '/chatlist' },
        { name: 'Marriage Counselling', href: '/marriageCounselling' },
        { name: 'Verification', href: '/verificationpage' },
    ];

    return (
        <nav className="bg-[#FFF1F3] py-4 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4">

                <div className="flex items-center">
                    <div className="bg-[#FF2D55] text-white px-6 py-2 rounded-md font-bold text-xl cursor-pointer">
                        Logo
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {navLinks.map((link) => (
                        <NavLink to={link.href}
                            key={link.name}
                            className={({ isActive }) => isActive ? 'text-base font-semibold transition-colors text-[#FF2D55]' : 'text-sm font-semibold transition-colors text-[#8E1B3E] hover:text-[#FF2D55]'}>
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <button className="bg-[#F0B90B] hover:bg-[#D9A608] text-white px-5 py-2 rounded-xl flex items-center space-x-2 font-bold shadow-sm transition-all">
                        <span className="text-lg">👑</span>
                        <span>Upgrade</span>
                    </button>

                    <div className="flex items-center space-x-4 text-[#8E1B3E]">
                        <button className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#8E1B3E] p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden mt-4 bg-white px-3 py-3 shadow-xl border border-pink-100 absolute left-0 right-0 animate-in slide-in-from-top duration-500">
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
                        <button className="bg-[#F0B90B] text-white py-3 rounded-xl font-bold flex justify-center items-center space-x-2">
                            <span>👑</span>
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