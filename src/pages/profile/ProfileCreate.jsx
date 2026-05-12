import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import HeadingTitle from "../../components/home/HeadingTitle";
import loveIcon from '../../../public/images/svg/loveIcon.svg';
import { useDispatch } from "react-redux";
import { userInformation } from "../../features/user/userSlice";
import useUserLocation from "../../hooks/useUserLocation";
import { useGetAllConstantDataQuery } from "../../features/constantdata/constantApi";
import ProfileFormSkeleton from "../../components/loading-skeleton/ProfileFormSkeleton";
import { useNavigate } from "react-router-dom";

const emptyOptions = [];
const emptyConstantData = {};

const defaultFormValues = {
    profileType: "",
    fullName: "",
    dob: "",
    gender: "male",
    height: "",
    religion: "",
    sect: "",
    cast: "",
    address: "",
    status: "",
    children: "",
    occupation: "",
    highestEducation: "",
    moveAbroad: "",
};

const toOptionArray = (options) => {
    if (Array.isArray(options)) {
        return options;
    }

    if (options && typeof options === "object") {
        return Object.values(options);
    }

    return [];
};

const getOptionProperty = (option, keys) => {
    if (!option || typeof option !== "object") {
        return "";
    }

    const matchedKey = keys.find((key) => option[key] !== undefined && option[key] !== null && option[key] !== "");
    return matchedKey ? option[matchedKey] : "";
};

const getOptionValue = (option) => {
    if (option === null || option === undefined) {
        return "";
    }

    if (typeof option !== "object") {
        return String(option);
    }

    return String(
        getOptionProperty(option, [
            "value",
            "slug",
            "name",
            "title",
            "label",
            "religion",
            "sect",
            "caste",
            "relation",
            "relationship",
            "status",
            "childrenStatus",
            "children_status",
            "occupation",
            "education",
            "highestEducation",
            "highest_education",
            "_id",
            "id",
        ])
    );
};

const formatOptionLabel = (value) => {
    const label = String(value).replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

    return label.replace(/\b\w/g, (char) => char.toUpperCase());
};

const getOptionLabel = (option) => {
    if (option === null || option === undefined) {
        return "";
    }

    if (typeof option !== "object") {
        return formatOptionLabel(option);
    }

    return formatOptionLabel(
        getOptionProperty(option, [
            "label",
            "name",
            "title",
            "displayName",
            "religion",
            "sect",
            "caste",
            "relation",
            "relationship",
            "status",
            "childrenStatus",
            "children_status",
            "occupation",
            "education",
            "highestEducation",
            "highest_education",
            "value",
            "slug",
            "_id",
            "id",
        ])
    );
};

const getOptions = (options) => {
    return toOptionArray(options).filter((option) => getOptionValue(option));
};

const getFirstOptionValue = (options) => {
    return getOptionValue(options[0]);
};

const getOptionGroupKeys = (options) => {
    if (!options || Array.isArray(options) || typeof options !== "object") {
        return [];
    }

    return Object.keys(options).filter((key) => getOptions(options[key]).length);
};

const ProfileCreate = () => {
    const dispatch = useDispatch();
    const location = useUserLocation();
    const { data: allConstantData, isLoading } = useGetAllConstantDataQuery();
    const defaultsWereSynced = useRef(false);
    const navigate = useNavigate();
    const [selectedSectGroup, setSelectedSectGroup] = useState("");
    const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
        defaultValues: defaultFormValues,
    });

    const {
        religions = emptyOptions,
        sects = emptyOptions,
        castes = emptyOptions,
        candidateCreatorRelations = emptyOptions,
        relationshipStatuses = emptyOptions,
        childrenStatuses = emptyOptions,
        occupations = emptyOptions,
        highestEducations = emptyOptions,
        moveAbroadStatuses = emptyOptions,
    } = allConstantData?.data || emptyConstantData;

    const religionOptions = useMemo(() => getOptions(religions), [religions]);
    const sectGroupOptions = useMemo(() => getOptionGroupKeys(sects), [sects]);
    const activeSectGroup = selectedSectGroup || sectGroupOptions[0] || "";
    const sectOptions = useMemo(() => {
        if (activeSectGroup) {
            return getOptions(sects?.[activeSectGroup]);
        }

        return getOptions(sects);
    }, [activeSectGroup, sects]);
    const casteOptions = useMemo(() => getOptions(castes), [castes]);
    const candidateRelationOptions = useMemo(() => getOptions(candidateCreatorRelations), [candidateCreatorRelations]);
    const relationshipStatusOptions = useMemo(() => getOptions(relationshipStatuses), [relationshipStatuses]);
    const childrenStatusOptions = useMemo(() => getOptions(childrenStatuses), [childrenStatuses]);
    const occupationOptions = useMemo(() => getOptions(occupations), [occupations]);
    const highestEducationOptions = useMemo(() => getOptions(highestEducations), [highestEducations]);
    const moveAbroadOptions = useMemo(() => getOptions(moveAbroadStatuses), [moveAbroadStatuses]);

    useEffect(() => {
        const hasServerOptions = [
            religionOptions,
            sectOptions,
            casteOptions,
            candidateRelationOptions,
            relationshipStatusOptions,
            childrenStatusOptions,
            occupationOptions,
            highestEducationOptions,
            moveAbroadOptions,
        ].some((options) => options.length);

        if (isLoading || defaultsWereSynced.current || !hasServerOptions) {
            return;
        }

        reset({
            ...defaultFormValues,
            religion: getFirstOptionValue(religionOptions),
            sect: getFirstOptionValue(sectOptions),
            cast: getFirstOptionValue(casteOptions),
            profileType: getFirstOptionValue(candidateRelationOptions),
            status: getFirstOptionValue(relationshipStatusOptions),
            children: getFirstOptionValue(childrenStatusOptions),
            occupation: getFirstOptionValue(occupationOptions),
            highestEducation: getFirstOptionValue(highestEducationOptions),
            moveAbroad: getFirstOptionValue(moveAbroadOptions),
        });
        defaultsWereSynced.current = true;
    }, [
        candidateRelationOptions,
        casteOptions,
        childrenStatusOptions,
        highestEducationOptions,
        isLoading,
        moveAbroadOptions,
        occupationOptions,
        relationshipStatusOptions,
        religionOptions,
        reset,
        activeSectGroup,
        sectOptions,
    ]);

    if (isLoading) {
        return <ProfileFormSkeleton />
    }

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
    const sectField = register("sect", requiredField("Please select your sect."));
    const renderOptions = (options) => {
        if (!options.length) {
            return <option value="">No options found</option>;
        }

        return options.map((option, index) => {
            const value = getOptionValue(option);

            return (
                <option key={`${value}-${index}`} value={value}>
                    {getOptionLabel(option)}
                </option>
            );
        });
    };
    const renderSectGroupOptions = (options) => {
        if (!options.length) {
            return <option value="">No options found</option>;
        }

        return options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ));
    };
    const handleSectGroupChange = (event) => {
        const nextSectGroup = event.target.value;
        const nextSectOptions = getOptions(sects?.[nextSectGroup]);
        const nextSectValue = getFirstOptionValue(nextSectOptions);

        setSelectedSectGroup(nextSectGroup);
        setValue("sect", nextSectValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

        if (nextSectValue) {
            clearErrors("sect");
        }
    };

    const onSubmit = (data) => {
        const userInfo = {
            name: data?.fullName,
            dateOfBirth: data?.dob,
            gender: data?.gender,
            height: Number(data?.height),
            religion: data?.religion,
            sect: data?.sect,
            caste: data?.cast,
            address: data?.address,
            relationship_status: data?.status,
            have_children: data?.children,
            relationToUser: data?.profileType,
            occupation: data?.occupation,
            highest_education: (data?.highestEducation),
            move_abroad: data?.moveAbroad,
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
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("gender")}
                                </div>
                                <div>
                                    <label className={labelStyle}>Height</label>
                                    <input
                                        type="number"
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
                                        {renderOptions(religionOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("religion")}
                                </div>
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className={labelStyle}>Select your Sect</label>
                                            <select
                                                value={activeSectGroup}
                                                onChange={handleSectGroupChange}
                                                className={inputStyle}>
                                                {renderSectGroupOptions(sectGroupOptions)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                        </div>
                                        <div className="relative">
                                            <label className={labelStyle}>Sect Type</label>
                                            <select
                                                {...sectField}
                                                onChange={(event) => {
                                                    sectField.onChange(event);
                                                    if (event.target.value) {
                                                        clearErrors("sect");
                                                    }
                                                }}
                                                {...errorProps("sect")}
                                                className={getInputStyle("sect")}>
                                                {renderOptions(sectOptions)}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                            {renderError("sect")}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Select your Cast</label>
                                    <select
                                        {...register("cast", requiredField("Please select your cast."))}
                                        {...errorProps("cast")}
                                        className={getInputStyle("cast")}>
                                        {renderOptions(casteOptions)}
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

                        <section className="mt-6">
                            <h2 className="text-xl font-bold text-red-900 mb-6">Relationship and Family Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className={labelStyle}>Select Relationship with candidate</label>
                                    <select
                                        {...register("profileType", requiredField("Please select your relationship with candidate."))}
                                        {...errorProps("profileType")}
                                        className={getInputStyle("profileType")}>
                                        {renderOptions(candidateRelationOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("profileType")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>What is your relationship status?</label>
                                    <select
                                        {...register("status", requiredField("Please select your relationship status."))}
                                        {...errorProps("status")}
                                        className={getInputStyle("status")}>
                                        {renderOptions(relationshipStatusOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("status")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Do you have children?</label>
                                    <select
                                        {...register("children", requiredField("Please select children status."))}
                                        {...errorProps("children")}
                                        className={getInputStyle("children")}>
                                        {renderOptions(childrenStatusOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("children")}
                                </div>
                            </div>
                        </section>

                        <section className="relative mt-6">
                            <img src={loveIcon} className="pointer-events-none absolute left-1/2 top-10 hidden h-11 w-11 -translate-x-1/2 opacity-50 md:block" />
                            <h2 className="text-xl font-bold text-red-900 mb-6">Career and Education</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className={labelStyle}>What is your occupation?</label>
                                    <select
                                        {...register("occupation", requiredField("Please select your occupation."))}
                                        {...errorProps("occupation")}
                                        className={getInputStyle("occupation")}>
                                        {renderOptions(occupationOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("occupation")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>What is your highest level of education?</label>
                                    <select
                                        {...register("highestEducation", requiredField("Please select your highest level of education."))}
                                        {...errorProps("highestEducation")}
                                        className={getInputStyle("highestEducation")}>
                                        {renderOptions(highestEducationOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("highestEducation")}
                                </div>
                                <div className="relative">
                                    <label className={labelStyle}>Open to moving abroad for marriage?</label>
                                    <select
                                        {...register("moveAbroad", requiredField("Please select your moving abroad preference."))}
                                        {...errorProps("moveAbroad")}
                                        className={getInputStyle("moveAbroad")}>
                                        {renderOptions(moveAbroadOptions)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
                                    {renderError("moveAbroad")}
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
