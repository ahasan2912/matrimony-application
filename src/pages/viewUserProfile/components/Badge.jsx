
const Badge = ({ children, icon: Icon, img: Img, color = "bg-[#F5F5F5]" }) => {
    return (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${color} text-gray-700 border border-gray-200 w-fit`}>
            {Icon && <Icon size={18} className="text-gray-500" />}
            {children}
            {Img && <img src={Img} className='w-4 h-4'/>}
        </div>
    );
};

export default Badge;