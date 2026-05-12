import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loveIcon from '../../../public/images/svg/loveIcon.svg';
import HeadingTitle from '../../components/home/HeadingTitle';
import ProfileFormSkeleton from '../../components/loading-skeleton/ProfileFormSkeleton';
import { useGetAllConstantDataQuery } from '../../features/constantdata/constantApi';
import { userInformation } from '../../features/user/userSlice';

const emptyOptions = [];
const emptyCategories = [];
const emptyConstantData = {};

const categoryStyles = [
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#F7A2A7] to-[#C97ABF]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#FDC49F] to-[#F68E90]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#DDAFE7] to-[#A2A2DF]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#DDAFE7] to-[#A2A2DF]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#ADC8B4] to-[#85B691]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#FDBA8B] to-[#FB9175]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#D48AF4] to-[#BCA2F9]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#B2C8ED] to-[#8EA4CA]' },
    { color: 'bg-[#F5F5F5]', headerColor: 'bg-gradient-to-r from-[#AEC9B5] to-[#84B590]' },
];

const toOptionArray = (options) => {
    if (Array.isArray(options)) {
        return options;
    }

    if (options && typeof options === 'object') {
        return Object.values(options);
    }

    return [];
};

const getOptionProperty = (option, keys) => {
    if (!option || typeof option !== 'object') {
        return '';
    }

    const matchedKey = keys.find((key) => option[key] !== undefined && option[key] !== null && option[key] !== '');
    return matchedKey ? option[matchedKey] : '';
};

const getOptionValue = (option) => {
    if (option === null || option === undefined) {
        return '';
    }

    if (typeof option !== 'object') {
        return String(option);
    }

    return String(getOptionProperty(option, ['value', 'slug', 'label', 'name', 'title', '_id', 'id']));
};

const formatFallbackLabel = (value) => (
    String(value)
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
);

const getOptionLabel = (option) => {
    if (option === null || option === undefined) {
        return '';
    }

    if (typeof option !== 'object') {
        return formatFallbackLabel(option);
    }

    const label = getOptionProperty(option, ['label', 'name', 'title', 'displayName', 'value', 'slug', '_id', 'id']);
    return option.label ? String(label) : formatFallbackLabel(label);
};

const getOptions = (options) => {
    return toOptionArray(options).filter((option) => getOptionValue(option));
};

const getCategoryLabel = (category) => {
    return getOptionLabel(category);
};

const getCategoryOptions = (category) => {
    if (!category || typeof category !== 'object') {
        return emptyOptions;
    }

    return getOptions(category.options ?? category.items ?? category.interests);
};

const TypeSelected = () => {
    const [selected, setSelected] = useState([]);
    const [prsnlInrstSelected, setPrsnlInrstSelected] = useState([]);
    const [smoking, setSmoking] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state?.user?.userInfo);
    const { data: allConstantData, isLoading } = useGetAllConstantDataQuery();

    const {
        smokeStatuses = emptyOptions,
        drinkStatuses = emptyOptions,
        interestCategories = emptyCategories,
        personalityTraits = emptyOptions,
    } = allConstantData?.data || emptyConstantData;

    const smokeOptions = useMemo(() => getOptions(smokeStatuses), [smokeStatuses]);
    const drinkOptions = useMemo(() => getOptions(drinkStatuses), [drinkStatuses]);
    const interestCategoryOptions = useMemo(() => (
        toOptionArray(interestCategories)
            .map((category) => ({
                label: getCategoryLabel(category),
                options: getCategoryOptions(category),
            }))
            .filter((category) => category.label && category.options.length)
    ), [interestCategories]);
    const personalityTraitOptions = useMemo(() => getOptions(personalityTraits), [personalityTraits]);

    const selectedSmoking = smoking;
    const selectedAlcohol = alcohol;

    if (isLoading) {
        return <ProfileFormSkeleton />
    }

    const renderSelectOptions = (options) => {
        if (!options.length) {
            return <option value="">No options found</option>;
        }

        return options.map((option) => {
            const value = getOptionValue(option);

            return (
                <option key={value} value={value}>
                    {getOptionLabel(option)}
                </option>
            );
        });
    };
    const clearValidationError = (fieldName) => {
        setValidationErrors((currentErrors) => {
            if (!currentErrors[fieldName]) {
                return currentErrors;
            }

            const updatedErrors = { ...currentErrors };
            delete updatedErrors[fieldName];
            return updatedErrors;
        });
    };

    const toggleInterest = (interest) => {
        const nextSelected = selected.includes(interest)
            ? selected.filter((item) => item !== interest)
            : selected.length < 15 ? [...selected, interest] : selected;

        setSelected(nextSelected);

        if (nextSelected.length >= 3) {
            clearValidationError('interests');
        }
    };

    const togglePersonalInterest = (personalInterest) => {
        const nextSelected = prsnlInrstSelected.includes(personalInterest)
            ? prsnlInrstSelected.filter((item) => item !== personalInterest)
            : prsnlInrstSelected.length < 5 ? [...prsnlInrstSelected, personalInterest] : prsnlInrstSelected;

        setPrsnlInrstSelected(nextSelected);

        if (nextSelected.length >= 2) {
            clearValidationError('personalityTraits');
        }
    };

    const validateSelections = () => {
        const nextErrors = {};

        if (!selectedSmoking) {
            nextErrors.smokeStatus = 'Please select your smoking status.';
        }

        if (!selectedAlcohol) {
            nextErrors.drinkStatus = 'Please select your drinking status.';
        }

        if (selected.length < 3) {
            nextErrors.interests = 'Please select at least 3 interests.';
        }

        if (prsnlInrstSelected.length < 2) {
            nextErrors.personalityTraits = 'Please select at least 2 personality traits.';
        }

        setValidationErrors(nextErrors);
        return !Object.keys(nextErrors).length;
    };

    const handleClickSelected = () => {
        if (!validateSelections()) {
            return;
        }

        dispatch(userInformation({
            ...userInfo,
            smoke_status: selectedSmoking,
            drink_status: selectedAlcohol,
            interests: selected,
            personality: prsnlInrstSelected,
        }));
        navigate('/profileupload');
    };

    return (
        <div className='min-h-screen bg-[#FFFFFF] px-6 pt-10 pb-20'>
            <div className='max-w-7xl mx-auto w-full rounded-3xl'>
                <HeadingTitle />
                <img src={loveIcon} className="hidden sm:block absolute top-20 left-10 text-pink-100 text-6xl" />
                <img src={loveIcon} className="hidden sm:block absolute bottom-20 right-20 text-pink-100 text-4xl" />

                {/* Smoking & Alcohol habits */}
                <div className="max-w-3xl bg-white">
                    <h2 className="text-2xl font-bold text-[#58001C] mb-5">Smoking & Alcohol habits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xl font-semibold text-[#262626]">
                                Do you smoke?
                            </label>
                            <div className="relative mt-3">
                                <select
                                    value={selectedSmoking}
                                    onChange={(event) => {
                                        setSmoking(event.target.value);
                                        if (event.target.value) {
                                            clearValidationError('smokeStatus');
                                        }
                                    }}
                                    className={`w-full p-3 bg-white border rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-[#B30042] text-gray-600 ${validationErrors.smokeStatus ? 'border-[#B30042]' : 'border-gray-400'}`}
                                >
                                    <option value="">Select smoking status</option>
                                    {renderSelectOptions(smokeOptions)}
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                            </div>
                            {validationErrors.smokeStatus && (
                                <p className="mt-1.5 ml-2 text-sm font-medium text-[#B30042]">{validationErrors.smokeStatus}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-xl font-semibold text-[#262626]">
                                Do you drink alcohol?
                            </label>
                            <div className="relative mt-3">
                                <select
                                    value={selectedAlcohol}
                                    onChange={(event) => {
                                        setAlcohol(event.target.value);
                                        if (event.target.value) {
                                            clearValidationError('drinkStatus');
                                        }
                                    }}
                                    className={`w-full p-3 bg-white border rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-[#B30042] text-gray-600 ${validationErrors.drinkStatus ? 'border-[#B30042]' : 'border-gray-400'}`}
                                >
                                    <option value="">Select drinking status</option>
                                    {renderSelectOptions(drinkOptions)}
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                            </div>
                            {validationErrors.drinkStatus && (
                                <p className="mt-1.5 ml-2 text-sm font-medium text-[#B30042]">{validationErrors.drinkStatus}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interests & Personality */}
                <div className='mt-10'>
                    <h1 className="text-2xl font-bold text-[#58001C] mb-3">Interests & Personality</h1>
                    <div>
                        <h1 className='text-xl font-semibold text-[#262626]'>What are your interests?</h1>
                        <p className='text-[#737373] text-base mt-1'>Pick <span className='text-[#262626] font-bold'>3 to 15 interests</span> that describe you best.</p>
                    </div>
                    {validationErrors.interests && (
                        <p className="mt-2 text-sm font-medium text-[#B30042]">{validationErrors.interests}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                        {interestCategoryOptions.map((cat, categoryIndex) => {
                            const categoryStyle = categoryStyles[categoryIndex % categoryStyles.length];

                            return (
                                <div key={cat.label} className={`${categoryStyle.color} rounded-xl overflow-hidden shadow-sm border border-gray-100`}>
                                    <div className={`${categoryStyle.headerColor} text-white text-lg text-center py-2 font-bold`}>
                                        {cat.label}
                                    </div>
                                    <div className="p-4 flex flex-wrap gap-2 justify-start">
                                        {cat.options.map((item) => {
                                            const value = getOptionValue(item);
                                            const isSelected = selected.includes(value);

                                            return (
                                                <button
                                                    type="button"
                                                    key={value}
                                                    onClick={() => toggleInterest(value)}
                                                    className={`px-3 py-1.5 rounded-full text-base font-medium transition-all duration-200 border
                                                    ${isSelected
                                                            ? 'bg-pink-300 border-pink-300 text-white shadow-inner scale-95'
                                                            : 'bg-white border-transparent text-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {getOptionLabel(item)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {!interestCategoryOptions.length && (
                        <p className="mt-4 rounded-lg bg-[#F5F5F5] px-4 py-3 text-gray-500">No interest options found.</p>
                    )}

                    {/* describe your personality */}
                    <div className='mt-10'>
                        <h1 className='text-xl font-semibold text-[#262626]'>How would you describe your personality?</h1>
                        <p className='text-[#737373] text-base mt-1'>Pick <span className='text-[#262626] font-bold'>2 to 5 traits</span> to express your personality.</p>
                        {validationErrors.personalityTraits && (
                            <p className="mt-2 text-sm font-medium text-[#B30042]">{validationErrors.personalityTraits}</p>
                        )}
                        <div className="mt-5">
                            <div className="bg-[#F5F5F5] rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                <div className="px-4 py-6 flex flex-wrap gap-2 justify-start">
                                    {personalityTraitOptions.map((item) => {
                                        const value = getOptionValue(item);
                                        const isSelected = prsnlInrstSelected.includes(value);

                                        return (
                                            <button
                                                type="button"
                                                key={value}
                                                onClick={() => togglePersonalInterest(value)}
                                                className={`px-3 py-1.5 rounded-full text-base font-medium transition-all duration-200 border
                                                ${isSelected
                                                        ? 'bg-[#FF225E] border-pink-300 text-white shadow-inner scale-95'
                                                        : 'bg-white border-transparent text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                {getOptionLabel(item)}
                                            </button>
                                        );
                                    })}
                                    {!personalityTraitOptions.length && (
                                        <p className="text-gray-500">No personality traits found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        onClick={handleClickSelected}
                        className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 sm:py-3.5 px-16 rounded-full transition-colors duration-200 shadow-lg w-full sm:w-auto">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypeSelected;
