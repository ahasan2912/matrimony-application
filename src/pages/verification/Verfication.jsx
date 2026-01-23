import { steps } from '../../data/data';
import VerificationCard from './VerificationCard';

const Verfication = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto w-full space-y-6 px-4 pt-10">
                {/* Header */}
                <header>
                    <h1 className="text-2xl font-bold text-[#58001C]">Verification</h1>
                    <p className="text-[#737373] text-base mt-1.5">
                        Verify your identity, education, and family details to enhance your profile's trust and visibility.
                    </p>
                </header>

                {/* Progress Bar */}
                <div className="space-y-2 max-w-lg">
                    <p className="font-semibold text-gray-700">Verification Progress: 25%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-4">
                    {steps.map((step) => (
                        <VerificationCard key={step.id} {...step} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Verfication;