import { Link } from "react-router-dom";
import { images } from "../assets/image";

const ErrorPage = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-80px)] items-center justify-center">
            <div className="max-w-5xl mx-auto">
                <img className="w-full" src={images.foundImage} alt="" />
            </div>
            <div className="text-center mt-2">
                <button className="bg-[#313030] text-white font-semibold py-2 px-6 cursor-pointer rounded-md w-full sm:w-auto">
                    <Link to='/'>Go Home</Link>
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;