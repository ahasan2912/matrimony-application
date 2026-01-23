import React from 'react';
import { CheckCircle, Hourglass, GraduationCap, Users, User, CreditCard } from 'lucide-react';
import { steps } from '../data/data';

const Testing = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto w-full space-y-6 px-4 pt-10">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-[#58001C]">Verification</h1>
          <p className="text-[#737373] text-base mt-1.5">
            Verify your identity, education, and family details to enhance your profile's trust and visibility.
          </p>
        </header>

        {/* Progress Bar */}
        <div className="space-y-2 max-w-lg">
          <p className="font-semibold text-gray-700">Verification Progress: 25%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="space-y-4">
          {steps.map((step) => (
            <VerificationCard key={step.id} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VerificationCard = ({ title, description, status, image, type }) => {
  return (
    <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center space-x-6 gap-2">
        {/* Icon Placeholder */}
        <div className="max-w-37.5 bg-white p-3 rounded-lg shadow-sm">
          <img className='w-full' src={image} alt="verification-card" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#B6003F]">{title}</h3>
          <p className="text-[#737373] text-base mt-1">{description}</p>
        </div>
      </div>

      <div className="flex items-center">
        {type === "completed" && (
          <span className="flex items-center text-rose-500 font-medium">
            Verified <CheckCircle className="ml-2 w-5 h-5" />
          </span>
        )}

        {type === "pending" && (
          <span className="flex items-center text-amber-500 font-medium">
            Pending <Hourglass className="ml-2 w-5 h-5 animate-pulse" />
          </span>
        )}

        {type === "action" && (
          <button className="bg-[#B6003F] w-fit hover:bg-rose-800 text-white px-6 py-2 rounded-full font-medium transition-colors cursor-pointer">
            {status}
          </button>
        )}
      </div>
    </div>
  );
};

export default Testing;