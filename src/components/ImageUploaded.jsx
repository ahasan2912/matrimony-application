import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const ImageUploaded = ({ setImageFiles }) => {
    const [images, setImages] = useState([]);
    const [dragIndex, setDragIndex] = useState(null);
    const fileInputRef = useRef(null);
    const imagesRef = useRef([]);

    const MAX_PHOTOS = 6;

    useEffect(() => {
        imagesRef.current = images;
        setImageFiles?.(images);
    }, [images, setImageFiles]);

    useEffect(() => {
        return () => {
            imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
        };
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const availableSlots = MAX_PHOTOS - images.length;
        const filesToUpload = files.slice(0, availableSlots);

        const newImages = filesToUpload.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            file,
        }));

        setImages((prev) => [...prev, ...newImages]);
        e.target.value = null;
    };

    const removeImage = (id) => {
        setImages((prev) => {
            const imageToRemove = prev.find((img) => img.id === id);

            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.url);
            }

            return prev.filter((img) => img.id !== id);
        });
    };

    const triggerUpload = () => {
        if (images.length < MAX_PHOTOS) {
            fileInputRef.current.click();
        }
    };

    const handleDrop = (dropIndex) => {
        if (dragIndex === null || dragIndex === dropIndex) return;

        const updatedImages = [...images];
        const draggedItem = updatedImages[dragIndex];

        updatedImages.splice(dragIndex, 1);
        updatedImages.splice(dropIndex, 0, draggedItem);

        setImages(updatedImages);
        setDragIndex(null);
    };
    return (
        <div className="">
            <div className="flex justify-between items-end mb-4" >
                <h3 className="font-semibold text-xl text-[#262626]">Upload your Photos</h3>
                <span className="text-rose-600 font-bold text-lg">{images.length}/{MAX_PHOTOS}</span>
            </div>
            <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        draggable
                        onDragStart={() => setDragIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index)}
                        className="relative aspect-4/5 rounded-xl overflow-hidden group border border-gray-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-rose-300 transition"
                    >
                        <img
                            src={img.url}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                            <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                Display
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>
                ))}
                {Array.from({ length: MAX_PHOTOS - images.length }).map((_, i) => (
                    <button
                        type="button"
                        key={`empty-${i}`}
                        onClick={triggerUpload}
                        className="flex flex-col items-center justify-center aspect-4/5 border-2 border-dashed border-gray-300 rounded-xl hover:border-rose-300 hover:bg-rose-50 transition-colors group">
                        <div className="bg-gray-100 p-3 rounded-full group-hover:bg-rose-100 transition-colors mb-2">
                            <Plus
                                className="text-gray-400 group-hover:text-rose-500"
                                size={24}
                            />
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-rose-500">
                            Upload Photos
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageUploaded;
