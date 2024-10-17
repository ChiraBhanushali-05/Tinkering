'use client'

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

function LabCard({ image, name, availability, onBook }) {
  return (
    <div className="flex flex-col items-center w-full max-w-lg rounded-md border shadow-md md:flex-row my-4">
      <div className="h-full w-full md:w-[300px]"> {/* Adjusted image width */}
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="flex-1 p-4 md:pl-6"> {/* Added padding-left to create more space */}
        <h1 className="inline-flex items-center text-lg font-semibold">
          {name} <ArrowUpRight className="ml-2 h-4 w-4" />
        </h1>
        <p className="mt-2 text-sm text-gray-600">{availability}</p>
        <button
          onClick={onBook}
          className="mt-4 px-4 py-2 bg-yellow-950 text-white text-xs rounded hover:bg-yellow-900"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default LabCard;
