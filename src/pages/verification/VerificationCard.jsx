import { CheckCircle, Hourglass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const VerificationCard = ({ title, description, status, image, type }) => {
    const navigate = useNavigate();
    const handleClcikVerify = (title) => {
        if (title === 'Verify Education') {
            navigate('/educationVerify');
        }
        if (title === 'Verify ID Card') {
            navigate('/passportVerify');
        }
        if (title === 'Verify Parent Info') {
            navigate('/parentVerify');
        }
    }
    return (
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center space-x-6 gap-2">
                {/* Icon Placeholder */}
                <div className="max-w-37.5 bg-white p-3 rounded-lg shadow-sm">
                    <img className='w-full' src={image} alt="verification-card" />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#B6003F]">{title}</h3>
                    <p className="text-[#737373] text-base mt-1">{description}</p>
                </div>
            </div>

            <div className="flex items-center">
                {type === "completed" && (
                    <span className="flex items-center text-rose-500 font-medium">
                        Verified <CheckCircle className="ml-2 w-5 h-5" />
                    </span>
                )}
                {/* here is pending button */}

                {/* {type === "pending" && (
                    <span className="flex items-center text-amber-500 font-medium">
                        Pending <Hourglass className="ml-2 w-5 h-5 animate-pulse" />
                    </span>
                )} */}

                {type === "action" && (
                    <button onClick={() => handleClcikVerify(title)} className="bg-[#B6003F] w-fit hover:bg-rose-800 text-white px-6 py-2 rounded-full font-medium transition-colors cursor-pointer">
                        {status}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerificationCard;