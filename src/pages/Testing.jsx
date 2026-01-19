import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

const Testing = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-maroon-600 outline-none appearance-none bg-white text-gray-700";
  const labelStyle = "block text-gray-800 font-semibold mb-2 ml-1";

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-red-900 mb-2">
            Create Your Profile and Start Finding Your Perfect Match
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Fill in the details below to create your personalized profile. This will help us recommend matches tailored to your preferences and values.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* Section: Profile Type */}
          <section>
            <h2 className="text-xl font-bold text-red-900 mb-6">Who is this profile for?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">I am the Candidate</p>
                  <p className="text-xs text-gray-500">I manage all aspects of this profile, including matches and conversations.</p>
                </div>
                <input type="radio" {...register("profileType")} value="candidate" className="mt-1 w-5 h-5 accent-red-700" />
              </label>
              <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-50 flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">I am the Guardian</p>
                  <p className="text-xs text-gray-500">I manage this profile on behalf of my child, overseeing interactions.</p>
                </div>
                <input type="radio" {...register("profileType")} value="guardian" className="mt-1 w-5 h-5 accent-red-700" />
              </label>
            </div>
          </section>

          {/* Section: Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-red-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>What is your name?</label>
                <input {...register("fullName")} placeholder="your name" className={inputStyle} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Date of Birth</label>
                <input type="date" {...register("dob")} className={inputStyle} />
              </div>
              <div className="relative">
                <label className={labelStyle}>What is your Gender?</label>
                <select {...register("gender")} className={inputStyle}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
              </div>
              <div>
                <label className={labelStyle}>Height</label>
                <input {...register("height")} placeholder="4'0'' (122 cm)" className={inputStyle} />
              </div>
            </div>
          </section>

          {/* Section: Relationship & Family */}
          <section>
            <h2 className="text-xl font-bold text-red-900 mb-6">Relationship and Family Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelStyle}>What is your relationship status?</label>
                <select {...register("status")} className={inputStyle}>
                  <option value="divorced">Divorced</option>
                  <option value="single">Single</option>
                  <option value="widowed">Widowed</option>
                </select>
                <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
              </div>
              <div className="relative">
                <label className={labelStyle}>Do you have children?</label>
                <select {...register("children")} className={inputStyle}>
                  <option value="yes">Yes, I have children</option>
                  <option value="no">No</option>
                </select>
                <ChevronDown className="absolute right-4 top-11 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              className="bg-[#b3003b] hover:bg-[#8e002f] text-white font-bold py-3 px-16 rounded-full transition-colors duration-200 shadow-lg"
            >
              Continue
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Testing;