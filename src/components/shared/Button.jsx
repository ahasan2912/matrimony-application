
const Button = ({ children }) => {
    return (
        <button className="w-full bg-[#B30042] hover:bg-[#900035] text-white py-3 sm:py-4 rounded-full flex items-center justify-center space-x-3 transition-colors cursor-pointer">
            <span className="font-medium text-lg text-[#FFFFFF]">{children}</span>
        </button>
    );
};

export default Button;