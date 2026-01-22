import { useNavigate } from "react-router-dom";

const Requests = ({ messageData }) => {
    const navigate = useNavigate();

    const handleClickAcceted = () => {
        navigate('/chatbox');
    }
    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {messageData.map((msg, index) => (
                <div key={index} className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-1.5 max-w-58.75">
                        <div className="relative">
                            <img
                                src="https://t4.ftcdn.net/jpg/09/75/07/11/360_F_975071103_e99E3iSot86QtdT8vRJUyTOYao83XxRB.jpg"
                                alt={msg.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-800">{msg.name}</h3>
                            </div>
                            <p className={`text-[12px] text-[#FF225E] font-bold}`}>
                                You share 5 matches
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div onClick={handleClickAcceted} className="bg-[#34C759] text-white px-3 py-1 rounded-full"><span>Accept</span></div>
                        <div className="bg-[#DA0041] text-white px-3 py-1 rounded-full"><span>Decline</span></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Requests;