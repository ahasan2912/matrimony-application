import { LogOut, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';


const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(userLoggedOut);
        localStorage.clear();
    }
    return (
        <>
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />
            <aside className={`fixed inset-y-0 left-0 z-50 w-66.5 bg-[#2F1E54] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-300`}>
                <div className="flex flex-col h-full py-3 pl-2">
                    <div className="flex items-center justify-between pl-3">
                        <div className='max-w-28'>
                            <Link to="/">
                                <img className='w-full' src='' alt="logo" />
                            </Link>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1">
                        <ul className='space-y-2 pr-5 mt-4 pl-2'>
                            <NavLink to='dashboardHome' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>
                                <span>Schedule a Pickup</span>
                            </NavLink>
                            <NavLink to='preference' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Preferences</span>
                            </NavLink>
                            <NavLink to='payment' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>
                                <span>Payment Method</span>
                            </NavLink>
                            <NavLink to='billing' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Billing History</span>
                            </NavLink>
                            <NavLink to='groupLaundery' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Group Laundry</span>
                            </NavLink>
                            <NavLink to='coupon' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Coupon</span>
                            </NavLink>
                            <NavLink to='redeem-gift' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Redeem Gift Certificate</span>
                            </NavLink>
                            <NavLink to='setting' className={({ isActive }) => `flex items-center gap-1 w-full py-3 transition-all duration-200 text-base text-white ${isActive ? 'bg-[#3D286D] py-2 pl-5 rounded-md' : 'pl-5'}`}>

                                <span>Settings</span>
                            </NavLink>
                        </ul>
                    </nav>

                    {/* Profile Card */}
                    <button onClick={logOut} className=" mt-auto py-4 pl-5 flex items-center gap-1 cursor-pointer">
                        <LogOut size={18} className="text-white hover:text-red-400 cursor-pointer transition-colors" />
                        <span className='text-white hover:text-red-400 cursor-pointer transition-colors'>LogOut</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;