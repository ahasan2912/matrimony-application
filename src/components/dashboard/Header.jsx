import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = ({ setSidebarOpen }) => {
    const auth = useSelector(state => state.auth);
    console.log(auth)
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="fixed w-full top-0 z-30 flex items-center justify-between px-4 md:px-8 py-2 bg-white/80 backdrop-blur-md ">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2.5 bg-slate-50 text-slate-600 rounded-md border border-slate-200"
                >
                    <Menu size={20} />
                </button>

                <div className="relative w-full max-w-md hidden sm:block">
                </div>
            </div>

            <div className='relative'>
                <div className="flex items-center gap-2 md:gap-4" onClick={() => setIsOpen(!isOpen)}>
                    <img className='w-10 h-10 rounded-full object-fill' src={auth.user.photoUrl} alt="profile-pic" />
                </div>
                <div className='absolute top-12 bg-red-500 h-10'>

                </div>
            </div>
        </header>
    );
};

export default Header;