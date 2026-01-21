
const AuthSidebar = () => {
    return (
        <div
            className="relative w-full md:w-1/2 min-h-100 bg-cover bg-no-repeat bg-center flex items-end p-8 md:p-16 flex-col justify-center"
            style={{ backgroundImage: "url('../../../src/assets/images/authpage.png')" }}>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 text-white max-w-md mx-auto mt-20">
                <span className="text-4xl text-[#FF96AD] md:text-5xl font-bold leading-tight">Find Your Perfect Match</span>
                <span className="font-normal text-[#D4D4D4]"> with Smart AI Recommendations and Parental Involvement, Guided with Care.</span>
                <p className="text-base text-[#D4D4D4] opacity-90 leading-relaxed">
                    
                </p>
            </div>
        </div>
    );
};

export default AuthSidebar;