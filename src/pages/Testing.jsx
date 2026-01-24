import { useForm } from 'react-hook-form';
import { Pencil, MapPin, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const Testing = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: 'Ahsan Habib',
      location: 'Lahore, Punjab, Pakistan',
      dob: '20/12/2000',
      height: '121cm',
    }
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-4xl p-6 bg-white font-sans">
      <h2 className="text-xl font-bold text-red-900 mb-6">Personal Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-gray-800">
            Name <Pencil size={14} className="text-gray-400" />
          </label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-50 focus:outline-none"
          />
        </div>

        {/* Location Field */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-gray-800">
            Location <Pencil size={14} className="text-gray-400" />
          </label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("location")}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
        </div>

        {/* Date of Birth Field */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-gray-800">
            Date of birth <Pencil size={14} className="text-gray-400" />
          </label>
          <div className="relative">
            <input
              type='date'
              {...register("dob")}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
        </div>
        {/* Height */}
        <div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-gray-800">
              Height <Pencil size={14} className="text-gray-400" />
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("height", { required: true })}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none" placeholder="122" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 pt-4">
          <button type="submit" className="bg-red-900 text-white px-10 py-3 rounded-full font-semibold hover:bg-red-800 transition-all shadow-md">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Testing;