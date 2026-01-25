import React from 'react';

const Testing = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-pink-50 min-h-50">
      <div className="flex w-full max-w-md bg-white border-2 border-gray-400 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-4 bg-white border-r border-gray-400">
          <div className="w-8 h-6 overflow-hidden rounded-sm flex items-center justify-center">
            <img
              src="https://flagcdn.com/pk.svg"
              alt="Pakistan Flag"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-gray-900">+92</span>
        </div>
        <div className="flex-1 px-4 py-4">
          <input
            type="tel"
            placeholder="123 456 789"
            className="w-full text-2xl tracking-wide text-gray-500 bg-transparent outline-none placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Testing;