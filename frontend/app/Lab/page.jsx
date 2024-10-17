'use client'

import React, { useState } from 'react';
import { ExampleNavbarThree } from "../../components/Navigation";
import LabCard from "../../components/LabCard";
import BookingForm from "../../components/BookingForm"; // Import the BookingForm component

function Page() {
  // Lab data array
  const labs = [
    {
      image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      name: "AI/ML Lab",
      availability: "10 Computers Available",
    },
    {
      image: "https://images.unsplash.com/photo-1532634896-ded5e6c4b3a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      name: "IoT Lab",
      availability: "8 Computers Available",
    },
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      name: "Robotics Lab",
      availability: "12 Computers Available",
    },
    {
      image: "https://images.unsplash.com/photo-1545249390-4a8c5c0a0e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGFifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      name: "VR/AR Lab",
      availability: "15 Computers Available",
    },
    {
      image: "https://images.unsplash.com/photo-1555435028-5b3da66c0f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFifGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      name: "Networking Lab",
      availability: "7 Computers Available",
    },
  ];

  // State to manage form visibility and selected lab
  const [selectedLab, setSelectedLab] = useState(null);

  // Function to handle booking button click
  const handleBook = (labName) => {
    setSelectedLab(labName);
  };

  // Function to close the form
  const handleCloseForm = () => {
    setSelectedLab(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1">
    <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg shadow-lg">
      <ExampleNavbarThree />
        <h2 className="text-4xl font-bold text-center text-black mb-12 mt-4">
          The Futuristic Labs
        </h2>
        {/* Wrapper for the lab cards to center them */}
        <div className="flex flex-col items-center space-y-4">
          {/* Rendering lab cards */}
          {labs.map((lab, index) => (
            <LabCard
              key={index}
              image={lab.image}
              name={lab.name}
              availability={lab.availability}
              onBook={() => handleBook(lab.name)}
            />
          ))}
        </div>
        {/* Render BookingForm if a lab is selected */}
        {selectedLab && (
          <BookingForm onClose={handleCloseForm} />
        )}
      </div>
    </main>
  );
}

export default Page;
