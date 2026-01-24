import React, { useRef, useState } from 'react';

const ParentphotoUploaded = () => {
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    // uploadedphoto
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // uploadedphoto
    const uploadPhoto = () => {
        console.log(imageFile);
    }
    return (
        <div className='pt-2'>
            <h2 className="text-[#6b0d24] text-xl font-bold mb-1">Step 1: Photo Verification</h2>
            <p className="text-[#737373] text-sm mb-4">
                Don't worry! The photo is just for verification and won't be displayed on the profile
            </p>
            <div className="flex flex-col items-center sm:items-start  sm:justify-start bg-white">
                <div
                    onClick={triggerFileInput}
                    className="relative w-64 h-80 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                <span className="text-gray-400 text-3xl font-light">+</span>
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Upload Photos</span>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden" />

                <div className="flex justify-start pt-4 sm:pt-8 max-w-75">
                    <button
                        type="submit"
                        onClick={uploadPhoto}
                        className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full">
                        Upload Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentphotoUploaded;