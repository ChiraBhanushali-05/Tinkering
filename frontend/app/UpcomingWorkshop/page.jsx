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
      const date = new Date(workshop.date);
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

// Function to fetch user data
async function getUserData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
      credentials: 'include', // Include credentials with the request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    console.log("Fetched User Data:", data.user); // Log the entire fetched user data
    return data.user; // Return the user object for further use
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {}; // Return an empty object if an error occurs
  }
}

export default function DemoPage() {
  const [data, setData] = useState([]); // State for holding fetched workshop data
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [userData, setUserData] = useState({
    userId: '', // Field for MongoDB user ID
    name: '',
    enrollmentNumber: '',
    whatsappNumber: ''
  });
  
  // New state to track if the user is registered for the selected workshop
  const [isRegistered, setIsRegistered] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    async function fetchUserData() {
      const fetchedUserData = await getUserData();
      if (fetchedUserData) {
        setUserData({
          userId: fetchedUserData.id || '', // Save MongoDB user ID
          name: fetchedUserData.name || '',
          enrollmentNumber: fetchedUserData.enrollmentNo || '',
          whatsappNumber: fetchedUserData.phoneNumber || ''
        });
      }
    }

    fetchData();
    fetchUserData(); // Fetch user data on component mount
  }, []);

  const handleBookClick = (row) => {
    const workshopId = row._id;

    // Check if the user is already registered for the selected workshop
    const userRegistered = row.registeredUsers.find(user => user.enrollmentNo === userData.enrollmentNumber);
    setIsRegistered(!!userRegistered); // Update the registration status
    setSelectedRow(row);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
    setIsRegistered(false); // Reset registration status when closing
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    const workshopId = selectedRow._id; // Assuming selectedRow contains workshop details
    const userId = userData.userId; // Use MongoDB user ID
    const enrollmentNo = userData.enrollmentNumber;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshops/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, workshopId, enrollmentNo }), // Pass userId in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to register for the workshop');
      }

      const data = await response.json();
      console.log(data.message); // You can display this message to the user

      // Close the popup after successful registration
      setIsPopupOpen(false);
      setIsRegistered(true); // Mark the user as registered
    } catch (error) {
      console.error('Error:', error);
      // You can display an error message to the user
    }
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
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  value={userData.name} // Automatically populated
                  required 
                  readOnly // Set as read-only to prevent changes
                />
              </div>
              <div>
                <Label className="text-black" htmlFor="enrollmentNumber">Enrollment Number</Label>
                <Input 
                  id="enrollmentNumber" 
                  placeholder="Enter your enrollment number" 
                  value={userData.enrollmentNumber} // Automatically populated
                  required 
                  readOnly // Set as read-only to prevent changes
                />
              </div>
              <div>
                <Label className="text-black" htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input 
                  id="whatsappNumber" 
                  placeholder="Enter your WhatsApp number" 
                  value={userData.whatsappNumber} // Automatically populated
                  required 
                  readOnly // Set as read-only to prevent changes
                />
              </div>
              <Button type="submit" className="w-full" disabled={isRegistered}>Book</Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
