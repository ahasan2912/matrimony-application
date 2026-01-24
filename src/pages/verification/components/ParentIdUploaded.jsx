import React, { useRef, useState } from 'react';

const ParentIdUploaded = () => {
    const [idPreview, setIdPreview] = useState(null);
    const [idImageFile, setIdImageFile] = useState(null);
    const idFileInputRef = useRef(null);

    // idCardUploaded
    const handleIdFileChange = (event) => {
        const file = event.target.files[0];
        setIdImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };
    const idTriggerFileInput = () => {
        idFileInputRef.current.click();
    };

    const idCardUploaded = () => {
        console.log(idImageFile);
    }
    return (
        <div className='pt-2'>
            <h2 className="text-[#6b0d24] text-xl font-bold mb-1">Step 3: ID Card Verification</h2>
            <p className="text-[#737373] text-sm mb-8">
                Please upload a clear photo of your parent/guardian’s government-issued ID for verification.
            </p>
            <div className="flex flex-col items-center sm:items-start  sm:justify-start bg-white">
                <div
                    onClick={idTriggerFileInput}
                    className="relative w-lg h-80 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden">
                    {idPreview ? (
                        <img
                            src={idPreview}
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
                    ref={idFileInputRef}
                    onChange={handleIdFileChange}
                    accept="image/*"
                    className="hidden" />

                <div className="flex justify-start pt-4 sm:pt-8 max-w-75">
                    <button
                        type="submit"
                        onClick={idCardUploaded}
                        className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full">
                        Upload Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentIdUploaded;