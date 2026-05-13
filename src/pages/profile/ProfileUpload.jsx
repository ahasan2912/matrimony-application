import { useCallback, useEffect, useState } from 'react';
import loveIcon from '../../../public/images/svg/loveIcon.svg';
import HeadingTitle from '../../components/home/HeadingTitle';
import ImageUploaded from '../../components/ImageUploaded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateCandidateDataMutation } from '../../features/candidates/candidates';
import { userInfoRemove } from '../../features/user/userSlice';
import { persistor } from '../../app/store';

const ProfileUpload = () => {
    const userInfo = useSelector((state) => state?.user?.userInfo);
    const dispatch = useDispatch();
    const maxLength = 250;
    const minBioLength = 20;
    const [bioText, setBioText] = useState(() => (
        userInfo?.bio ? String(userInfo.bio).slice(0, maxLength) : ""
    ));
    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [createCandidateData, { isLoading, error, isSuccess }] = useCreateCandidateDataMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile created successfully!");
            navigate('/faceqrcode');
        }
        if (error) {
            const message = error?.data?.message || "Profile created failed!";
            toast.error(message);
        }
    }, [navigate, isSuccess, error,]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleAboutBio = (e) => {
        if (e.target.value.length <= maxLength) {
            setBioText(e.target.value);

            if (e.target.value.trim().length >= minBioLength) {
                setErrors((currentErrors) => ({ ...currentErrors, bio: "" }));
            }
        }
    };

    const handleImageFilesChange = useCallback((files) => {
        setImageFiles(files);

        if (files.length > 0) {
            setErrors((currentErrors) => {
                if (!currentErrors.images) {
                    return currentErrors;
                }

                return { ...currentErrors, images: "" };
            });
        }
    }, []);

    const handlephotoandBio = async () => {
        if (imageFiles.length <= 0) {
            setErrors((currentErrors) => ({ ...currentErrors, images: "Please upload at least one image." }));
            return;
        }

        if (bioText.trim().length < minBioLength) {
            const message = `Bio must be at least ${minBioLength} characters.`;

            setErrors((currentErrors) => ({ ...currentErrors, bio: message }));
            return;
        }

        const candidateData = {
            ...userInfo,
            bio: bioText,
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(candidateData));

        imageFiles.forEach((image) => {
            formData.append("files", image.file ?? image);
        });
        await createCandidateData(formData);

        // remove userinfo local storage
        dispatch(userInfoRemove());
        await persistor.flush();
        await persistor.purge();

    }

    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <img src={loveIcon} className="hidden sm:block absolute top-32 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />
                {/* ideal partner */}
                <div className="max-w-5xl mx-auto">
                    <div className='mt-12'>
                        {/* <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#58001C] mb-3">Share more about you</h2>
                            <p className="text-[#737373] text-base leading-relaxed mb-6">Tell us about yourself and upload your best photos to help others get to know you better!</p>
                        </div> */}
                        <ImageUploaded setImageFiles={handleImageFilesChange} />
                        {errors.images && (
                            <p className="mt-2 text-sm font-medium text-[#B30042]">{errors.images}</p>
                        )}
                    </div>
                    <div className=" bg-white mt-5">
                        <label className="text-2xl font-bold text-[#58001C] mb-3">
                            Bio
                        </label>
                        <div className="w-full relative border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-rose-200 focus-within:border-rose-400 transition-colors mt-5">
                            <textarea
                                className="w-full h-32 resize-none outline-none text-gray-700 placeholder-gray-400"
                                placeholder="Share who you are, what you love, and what makes you unique."
                                required
                                value={bioText}
                                onChange={handleAboutBio}
                            />
                            <div className="absolute bottom-3 right-3 text-gray-400 font-medium">
                                {bioText.length}/{maxLength}
                            </div>
                        </div>
                        {errors.bio && (
                            <p className="mt-2 text-sm font-medium text-[#B30042]">{errors.bio}</p>
                        )}
                    </div>

                </div>
            </div>
            <div className="flex justify-center pt-6 lg:col-span-2">
                <button
                    onClick={handlephotoandBio}
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                    {isLoading ? (
                        <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                    ) : (
                        <span className="font-medium text-lg text-[#FFFFFF]">Continue</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProfileUpload;
