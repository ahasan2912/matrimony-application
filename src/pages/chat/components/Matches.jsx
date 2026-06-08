import { useSelector } from "react-redux";
import { useMatchesListQuery } from "../../../features/matches/matcheApi";

const Matches = ({ messageData }) => {
    const { user } = useSelector(state => state?.auth);
    const candidateId = user?.candidateLink?.candidateId;

    console.log(candidateId)

    const { data: matchesList, isLoading } = useMatchesListQuery(candidateId, {
            skip: !candidateId,
        });
    
    if(isLoading){
        return <p>Loading.....</p>
    }

    console.log(matchesList?.data);  

    return (
        <div className="divide-y divide-gray-200 overflow-x-auto max-w-full">
            {matchesList?.data?.map(match => (
                console.log(match),
                <div key={match?._id} className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 cursor-pointer transition-colors group">
                    {/* <div className="flex items-center gap-1.5 max-w-58.75">
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
                    </div> */}
                    <div className="bg-[#B6003F] text-white px-2 sm:px-4 py-1 rounded-full">
                        <span>Say Hi👋</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Matches;


