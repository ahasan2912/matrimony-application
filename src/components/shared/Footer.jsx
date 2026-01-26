import React from 'react';
import { Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import youtubeIcon from '../../../public/images/svg/youtube.svg';
import faceBookIcon from '../../../public/images/svg/facebook.svg';
import instagramIcon from '../../../public/images/svg/instagram.svg';

const Footer = () => {
    return (
        <footer className="w-full font-sans">
            <div className="bg-[#FFF0F3] px-4 py-12 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <div className="bg-[#FF2D55] text-white inline-block px-8 py-2 text-xl font-semibold rounded-sm">
                            Logo
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-[#58001C] font-bold text-2xl mb-4">Contact Information:</h3>
                            <div className="flex items-center gap-2 text-[#630D21]">
                                <Mail size={18} className="text-[#737373]" />
                                <span className='text-[#737373]'>Email: <span className="text-[#B6003F]">support@example.com</span></span>
                            </div>
                            <div className="flex items-center gap-2 text-[#630D21]">
                                <Phone size={18} className="text-[#737373]" />
                                <span className='text-[#737373]'>Phone: <span className="text-[#B6003F]">+1-234-567-8901</span></span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 text-gray-600 font-medium">
                            <Link to="/" className="hover:text-[#FF2D55] transition-colors">About Us</Link>
                            <Link to="/" className="hover:text-[#FF2D55] transition-colors">Contact US</Link>
                            <Link to="/" className="hover:text-[#FF2D55] transition-colors">Terms & Conditions</Link>
                        </div>
                        <div className="flex flex-col space-y-4 text-gray-600 font-medium">
                            <Link to="/" className="hover:text-[#FF2D55] transition-colors">Privacy Policy</Link>
                            <Link to="/" className="hover:text-[#FF2D55] transition-colors">Help & Support</Link>
                        </div>

                        <div className="flex md:justify-end gap-4">
                            <Link to="#" className="text-[#B30030] hover:scale-110 transition-transform">
                                <img src={faceBookIcon} alt="facebookIcon" />
                            </Link>
                            <Link to="#" className="text-[#B30030] hover:scale-110 transition-transform">
                                <img src={instagramIcon} alt="instagramIcon" />
                            </Link>
                            <Link to="#" className="text-[#B30030] hover:scale-110 transition-transform mt-1">
                                <img src={youtubeIcon} alt="youtubeIcon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#B30030] py-4 px-6 md:px-16 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <p className="text-white text-sm md:text-base">
                        © {new Date().getFullYear()} Rishta Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;