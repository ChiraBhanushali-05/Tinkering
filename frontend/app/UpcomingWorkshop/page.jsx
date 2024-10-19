"use client";

import React, { useState, useEffect } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { ExampleNavbarThree } from "../../components/Navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { X } from "lucide-react";

// Function to fetch workshop data
async function getData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshops`);
    if (!response.ok) {
      throw new Error("Failed to fetch workshops");
    }

    const workshops = await response.json();
    const formattedWorkshops = workshops.map((workshop) => {
      const date = new Date(workshop.date); // Assuming `workshop.date` contains the timestamp
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

      return {
        ...workshop,
        date: formattedDate,
      };
    });

    return formattedWorkshops;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState([]); // State for holding fetched workshop data
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  const handleBookClick = (row) => {
    setSelectedRow(row);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted for", selectedRow);
    setIsPopupOpen(false);
  };

  const columnsWithAction = getColumns(handleBookClick);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1">
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg">
        <ExampleNavbarThree />
        <h2 className="text-4xl font-bold text-center text-black mb-12 mt-4">
          Upcoming Workshops
        </h2>
        <DataTable columns={columnsWithAction} data={data} />
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Book Workshop</h2>
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div>
                <Label className="text-black" htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div>
                <Label className="text-black" htmlFor="enrollmentNumber">Enrollment Number</Label>
                <Input id="enrollmentNumber" placeholder="Enter your enrollment number" required />
              </div>
              <div>
                <Label className="text-black" htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input id="whatsappNumber" placeholder="Enter your WhatsApp number" required />
              </div>
              <Button type="submit" className="w-full">Book</Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
