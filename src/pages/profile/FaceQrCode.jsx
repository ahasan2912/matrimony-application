import images from '../../assets/image';
import HeadingTitle from '../../components/home/HeadingTitle';
import LoveBackground from '../../components/shared/LoveBackground';

const FaceQrCode = () => {
    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <LoveBackground top={20} bottom={20} />
                <div>
                    <h1 className="text-2xl font-bold text-[#58001C] mb-2">
                        Confirm it's you in this photo to help keep our community authentic.
                    </h1>
                    <p className="text-[#737373] text-base leading-relaxed mb-6">
                        For your security and to ensure the authenticity of your profile, please scan the QR code
                        with your mobile device. This process helps us verify your identity and keep our community safe.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-center">
                        <div className="flex flex-col sm:flex-row  gap-10 sm:col-span-2 ">
                            <img
                                src={images.qrUser}
                                className="rounded-xl w-full h-auto object-cover max-w-70"
                            />
                            <div className="space-y-4 max-w-117.5 w-full">
                                <p className="text-[#262626] text-lg">
                                    <span className="font-bold">Step 1:</span> Open the camera on your mobile phone or use a QR scanner app.
                                </p>
                                <p className="text-[#262626] text-lg">
                                    <span className="font-bold">Step 2:</span> Scan the QR code below using your phone.
                                </p>
                                <p className="text-[#262626] text-lg">
                                    <span className="font-bold">Step 3:</span> Follow the instructions on your phone to verify your identity.
                                </p>
                                <p className="text-[#262626] text-lg">
                                    <span className="font-bold">Step 4:</span> Once the scan is complete, confirm the verification on your web screen.
                                </p>
                            </div>
                        </div>
                        <div className="flex lg:justify-end sm:col-span-1 ">
                            <div className="bg-pink-50 p-6 rounded-xl relative">
                                <div className="bg-white p-2 rounded-lg shadow-inner">
                                    <img
                                        src={images.qrcode}
                                        alt="QR Code"
                                        className="w-44 h-44"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FaceQrCode;