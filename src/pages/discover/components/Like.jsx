import { Crown } from 'lucide-react';
import PremiumLike from './like/PrimiumLike';
import Likedme from './like/Likedme';

const Like = () => {
    return (
        <div className="bg-white min-h-screen">
            <PremiumLike />
            <Likedme />
        </div>
    );
};

export default Like;