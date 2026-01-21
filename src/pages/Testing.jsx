import React from 'react';
import { Crown } from 'lucide-react';

const Testing = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=100",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen font-sans">
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-red-900">People who liked you</h2>
          <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">25</span>
        </div>
        <p className="text-gray-500 text-sm mb-6">
          Unlock who's shown interest in you. Get exclusive access to see who likes you and make connections!
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-64 rounded-xl overflow-hidden border-2 border-yellow-400 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400"
              alt="Blurred profile"
              className="w-full h-full object-cover blur-md scale-110"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-3 rounded-full shadow-xl">
              <Crown className="text-white w-6 h-6 fill-current" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 space-y-2">
              <div className="h-4 w-2/3 bg-white/30 rounded blur-sm" />
              <div className="flex gap-2">
                <div className="h-3 w-1/3 bg-white/20 rounded blur-sm" />
                <div className="h-3 w-1/3 bg-white/20 rounded blur-sm" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex -space-x-3 mb-4">
              {avatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
                  alt="user"
                />
              ))}
            </div>
            <button className="text-rose-600 font-bold hover:underline">
              See all
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-red-900">People You Liked</h2>
          <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">25</span>
        </div>
        <p className="text-rose-400 text-sm font-medium mb-2">Likes remaining: 25</p>
        <p className="text-gray-500 text-sm">
          See the profiles you've shown interest in. Explore the people you've liked and make connections!
        </p>
      </section>

    </div>
  );
};

export default Testing;