import { ChevronDown, Map, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import HeadingTitle from "../../components/home/HeadingTitle";
import loveIcon from '../../../public/images/svg/loveIcon.svg';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userInformation } from "../../features/user/userSlice";
import useUserLocation from "../../hooks/useUserLocation";
import { relationToUserLabels } from "../../constants/relationToUserLabels";

const ProfileCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useUserLocation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            profileType: relationToUserLabels[0],
            fullName: "",
            dob: "",
            gender: "male",
            height: "",
            religion: "Islam",
            sect: "Sunni",
            cast: "Phatan",
            address: "",
            status: "divorced",
            children: "yes",
        },
    });

    const inputStyle = "w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700";
    const labelStyle = "block text-xl text-[#262626] font-semibold mb-2 ml-1";
    const errorStyle = "mt-1.5 ml-2 text-sm font-medium text-[#B30042]";
    const getInputStyle = (fieldName) => `${inputStyle} ${errors[fieldName] ? "border-[#B30042] focus:border-[#B30042] focus:ring-red-100" : ""}`;
    const renderError = (fieldName) => (
        errors[fieldName] ? <p id={`${fieldName}-error`} className={errorStyle}>{errors[fieldName].message}</p> : null
    );
    const errorProps = (fieldName) => ({
        "aria-invalid": errors[fieldName] ? "true" : "false",
        "aria-describedby": errors[fieldName] ? `${fieldName}-error` : undefined,
    });
    const requiredField = (message) => ({ required: message });
    
    const onSubmit = (data) => {
        const userInfo = {
            name: data?.fullName,
            dateOfBirth: data?.dob,
            gender: data?.gender,
            height: data?.height,
            religion: data?.religion,
            sect: data?.sect,
            caste: data?.cast,
            address: data?.address,
            relationship_status: data?.status,
            have_children: data?.children,
            relationToUser: data?.profileType,
            coordinates: [
                location?.longitude,
                location?.latitude,
            ]
        }
        dispatch(userInformation(userInfo));
        navigate('/typeselected');
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6 pt-10 pb-20">
            <div className="max-w-7xl w-full rounded-3xl">
                <HeadingTitle />

                <img src={loveIcon} className="hidden sm:block absolute top-10 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    {/* for candidate */}
                    <div>
                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelStyle}>What is your name?</label>
                                    <input
                                        type="text"
                                        {...register("fullName", requiredField("Please enter your full name."))}
                                        {...errorProps("fullName")}
                                        placeholder="Enter your full name"
                                        className={getInputStyle("fullName")} />
                                    {renderError("fullName")}
                                </div>
                                <div className="date">
                                    <label className={labelStyle}>Date of Birth</label>
                                    <input
                                        type="date"
                                        {...register("dob", requiredField("Please select your date of birth."))}
                                        {...errorProps("dob")}
                                        className={getInputStyle("dob")} />
                                    {renderError("dob")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>What is your Gender?</label>
                                    <select
                                        {...register("gender", requiredField("Please select your gender."))}
                                        {...errorProps("gender")}
                                        className={getInputStyle("gender")}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("gender")}
                                </div>
                                <div>
                                    <label className={labelStyle}>Height</label>
                                    <input
                                        {...register("height", requiredField("Please enter your height."))}
                                        {...errorProps("height")}
                                        placeholder="4'0'' (122 cm)"
                                        className={getInputStyle("height")} />
                                    {renderError("height")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>What is your Religion?</label>
                                    <select
                                        {...register("religion", requiredField("Please select your religion."))}
                                        {...errorProps("religion")}
                                        className={getInputStyle("religion")}>
                                        <option value="Islam">Islam</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("religion")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Select your Sect</label>
                                    <select
                                        {...register("sect", requiredField("Please select your sect."))}
                                        {...errorProps("sect")}
                                        className={getInputStyle("sect")}>
                                        <option value="Sunni">Sunni</option>
                                        <option value="Siya">Siya</option>
                                        <option value="Ahmadiyya">Ahmadiyya</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("sect")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Select your Cast</label>
                                    <select
                                        {...register("cast", requiredField("Please select your cast."))}
                                        {...errorProps("cast")}
                                        className={getInputStyle("cast")}>
                                        <option value="Phatan">Phatan</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("cast")}
                                </div>
                                <div>
                                    <label className={labelStyle}>Your Location</label>
                                    <div className="flex items-center relative">
                                        <input
                                            type="text"
                                            {...register("address", requiredField("Please enter your address."))}
                                            {...errorProps("address")}
                                            placeholder="Lahore, Punjab, Pakistan"
                                            className={getInputStyle("address")} />
                                        <MapPin className="absolute right-2 text-gray-400 pointer-events-none" size={20} />
                                    </div>
                                    {renderError("address")}
                                </div>
                            </div>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-xl font-bold text-red-900 mb-6">Relationship and Family Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className={labelStyle}>Select Relationship with candidate</label>
                                    <select
                                        {...register("profileType", requiredField("Please select your relationship with candidate."))}
                                        {...errorProps("profileType")}
                                        className={getInputStyle("profileType")}>
                                        {relationToUserLabels.map((relation) => (
                                            <option key={relation} value={relation}>
                                                {relation}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("profileType")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>What is your relationship status?</label>
                                    <select {...register("status", requiredField("Please select your relationship status."))} {...errorProps("status")} className={getInputStyle("status")}>
                                        <option value="divorced">Divorced</option>
                                        <option value="single">Single</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("status")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Do you have children?</label>
                                    <select {...register("children", requiredField("Please select children status."))} {...errorProps("children")} className={getInputStyle("children")}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("children")}
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileCreate;
