
const AuthSidebar = () => {
    return (
        <div
            className="relative w-full md:w-1/2 min-h-100 bg-cover bg-no-repeat bg-center flex items-end p-8 md:p-16 flex-col justify-center"
            style={{ backgroundImage: "url('../../../src/assets/images/authpage.png')" }}>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 text-white max-w-md mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Find Your Perfect <span className="text-pink-400">Match</span>
                </h1>
                <p className="text-base text-[#D4D4D4] opacity-90 leading-relaxed">
                    with Smart AI Recommendations and Parental Involvement, Guided with Care.
                </p>
            </div>
        </div>
    );
};

export default AuthSidebar;