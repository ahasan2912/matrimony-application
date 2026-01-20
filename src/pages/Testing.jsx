import React from 'react';

const Testing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-7xl w-full bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#58001C] mb-2">
          Confirm it's you in this photo to help keep our community authentic.
        </h1>
        <p className="text-[#737373] text-base leading-relaxed mb-6">
          For your security and to ensure the authenticity of your profile, please scan the QR code 
          with your mobile device. This process helps us verify your identity and keep our community safe.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop" 
              alt="User verification"
              className="rounded-xl w-full h-auto object-cover max-w-70"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <div className="space-y-4">
              <p className="text-gray-800 text-sm md:text-base">
                <span className="font-bold">Step 1:</span> Open the camera on your mobile phone or use a QR scanner app.
              </p>
              <p className="text-gray-800 text-sm md:text-base">
                <span className="font-bold">Step 2:</span> Scan the QR code below using your phone.
              </p>
              <p className="text-gray-800 text-sm md:text-base">
                <span className="font-bold">Step 3:</span> Follow the instructions on your phone to verify your identity.
              </p>
              <p className="text-gray-800 text-sm md:text-base">
                <span className="font-bold">Step 4:</span> Once the scan is complete, confirm the verification on your web screen.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="bg-pink-50 p-6 rounded-3xl relative">
              <div className="absolute -top-3 -right-3 text-pink-100 text-4xl">♥</div>
              <div className="bg-white p-2 rounded-lg shadow-inner">
                 <img 
                   src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VerificationLink" 
                   alt="QR Code"
                   className="w-32 h-32 md:w-40 md:h-40"
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;