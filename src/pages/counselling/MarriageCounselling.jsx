import React, { useState } from 'react';
import FreeCounselling from './FreeCounselling';
import MarriageConsaltant from './MarriageConsaltant';
const MarriageCounselling = () => {
    const [ugrade, setUgrade] = useState(false);


    return (
        <div className="max-w-7xl mx-auto px-4 text-gray-800 my-10">
            {
                ugrade ?
                    <FreeCounselling
                        setUgrade={setUgrade} /> : <MarriageConsaltant />
            }
        </div>
    )
};

export default MarriageCounselling;