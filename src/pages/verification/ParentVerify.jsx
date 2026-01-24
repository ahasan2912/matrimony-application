import { Scan } from 'lucide-react';
import ParentphotoUploaded from './components/ParentphotoUploaded';
import ParentIdUploaded from './components/ParentIdUploaded';

const ParentVerify = () => {
    // face-scan
    // const scanUpload = () => {
    //     console.log(imageFile);
    // }

    // idCardUploaded
    return (
        <div className='max-w-7xl mx-auto w-full space-y-6 px-4 pt-4 sm:pt-10 pb-10'>
            <div>
                <h1 className='text-2xl text-[#58001C] font-semibold'>Parent verification</h1>
                <p className='text-[#737373] text-base'>To complete your profile, your parent/guardian needs to go through the verification process.</p>
            </div>
            {/* Step 1: Photo Verification */}
            <ParentphotoUploaded />

            {/* Step 2: Face Verification */}
            <div className='pt-2'>
                <h2 className="text-[#6b0d24] text-xl font-bold mb-1">Step 2: Face Verification</h2>
                <p className="text-[#737373] text-sm mb-8">
                    Don’t worry! The photo is just for verification and won’t be displayed on the profile
                </p>
                <div className="max-w-lg  w-full flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-xl">
                        <div className="text-gray-600">
                            <Scan size={48} strokeWidth={1.5} />
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base leading-tight">
                            Your parent/guardian needs to verify their identity by completing a facial scan
                        </p>
                    </div>
                    <div className="flex justify-start pt-4 sm:pt-8 max-w-60">
                        <button
                            type="submit"
                            // onClick={scanUpload}
                            className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full">
                            Scan Face
                        </button>
                    </div>
                </div>
            </div>

            {/* Step 3: ID Card Verification */}
            <ParentIdUploaded />
        </div>
    );
};

export default ParentVerify;