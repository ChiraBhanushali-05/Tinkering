// Hackathon.jsx
import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const Hackathon = () => {
  return (
    <div className="mt-8 text-black">
      <h2 className="text-2xl font-bold text-center mt-8">Vadodara Hackathon 3.0</h2>
      <div className="flex flex-col md:flex-row justify-center items-start mt-8 mx-auto bg-primary_color3 rounded-xl p-4 max-w-[80%] gap-4 shadow-md">
        <div className="flex-shrink-0 rounded-2xl overflow-hidden w-full md:w-[200px] order-1 md:order-none">
          <Image
            src="/images/hackathon1.jpg"
            alt="Vadodara Hackathon 3.0 Image"
            layout="responsive"
            width={200}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left text-base leading-8 mb-4 order-2 md:order-none">
          <h3>
            Vadodara Hackathon 3.0 is a dynamic event that brings together
            students, developers, and tech enthusiasts to solve real-world
            challenges. Participants will showcase their creativity and
            technical skills across 8 different tracks. The hackathon offers
            opportunities for networking, skill development, and recognition,
            with workshops and sessions led by industry professionals. Join us
            to innovate, connect, and compete for exciting prizes!
          </h3>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex justify-center mt-8">
        <BreadcrumbOne />
      </div>
      <div className="flex justify-center mt-4">
        <BreadcrumbTwo />
      </div>
    </div>
  );
};

export default Hackathon;

export function BreadcrumbOne() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center ml-4 space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1"
          >
            8 Tracks
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            <a
              href="#"
              className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1"
            >
              50+ Industry Patterns
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            <span className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1">
              200+ Problem Statement
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export function BreadcrumbTwo() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1"
          >
            48+ Hours
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            <a
              href="#"
              className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1"
            >
              50+ Jury/Mentor
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            <span className="ml-1 text-xs md:text-sm font-medium text-gray-800 hover:underline border-b border-gray-400 pb-0.5 md:pb-1">
              500+ Team Registered
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
