'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const cardTitles = [
  "Track 1:APP-O-THON",
  "Track 2:DESIGN-O-THON",
  "Track 3:DRONE-O-THON",
  "Track 4:ROB-O-THON",
  "Track 5:SMART-O-THON",
  "Track 6:AR/VR-THON",
  "Track 7:EV-THON",
  "Track 8:GAME-O-THON",
];

const Tracks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    // Set initial state if window is defined
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div className="mt-12 text-center text-black">
      <h2 className="text-3xl font-bold mt-2">Vadodara Hackathon 3.0</h2>
      <h2 className="text-2xl font-semibold mt-2">Tracks In Vadodara</h2>
      <h2 className="text-2xl font-semibold mt-2">Hackathon 3.0</h2>

      <div className={`grid ${isMobile ? 'hidden' : 'grid-cols-1 md:grid-cols-4'} gap-4 mt-8 justify-items-center`}>
        {cardTitles.map((title, index) => (
          <div key={index} className="relative w-48 h-64 rounded-lg overflow-hidden mb-4 shadow-md">
            <Image
              src={`/images/track${index + 1}.jpg`}
              alt={`Card ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              width={192} // Adjust as needed
              height={256} // Adjust as needed
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white text-left">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className={`flex ${isMobile ? 'block' : 'hidden'} overflow-x-auto mt-8`}>
        {cardTitles.map((title, index) => (
          <div key={index} className="relative w-48 h-64 flex-shrink-0 mr-4">
            <Image
              src={`/images/track${index + 1}.jpg`}
              alt={`Card ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              width={192} // Adjust as needed
              height={256} // Adjust as needed
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 text-white text-left">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
