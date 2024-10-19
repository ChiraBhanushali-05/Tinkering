"use client"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import ExampleNavbarThree from "../../components/Navigation";

function WebinarCard({ title, presenter, date, description, imageSrc, onRegister }) {
  return (
    <Card className="max-w-xs w-full flex flex-col rounded-lg overflow-hidden">
      <div className="w-full h-48">
        <img
          src={imageSrc}
          alt="Webinar thumbnail"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-3 space-y-2 flex-grow">
        <h2 className="text-lg font-bold text-brown">{title}</h2>
        <p className="text-sm font-semibold text-secondary">Presenter: {presenter}</p>
        <p className="text-xs text-gray-600">Date: {new Date(date).toLocaleDateString()}</p>
        <p className="text-sm">{description}</p>
        <Button onClick={onRegister} className="w-full bg-black hover:bg-gray-600 text-white text-sm py-2">
          Register
        </Button>
      </CardContent>
    </Card>
  );
}




export default function WebinarCards() {
  const [webinars, setWebinars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedWebinarId, setSelectedWebinarId] = useState(null); // To store the selected webinar ID

  // Fetch webinars from the API
  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars`);
      const data = await response.json();
      setWebinars(data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  // Fetch user session data
  const fetchUserSession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
        credentials: 'include',
      });
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user session:', error);
    }
  };

  useEffect(() => {
    fetchWebinars();
    fetchUserSession(); // Fetch user session data on mount
  }, []);

  // Handle registration button click
  const handleRegister = (webinarId) => {
    setSelectedWebinarId(webinarId); // Store the selected webinar ID
    setShowForm(true);
  };

  // Handle closing the registration form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Handle form submission and show toast notification
  const handleFormSubmit = async (whatsapp) => {
    // Print the selected webinar ID to the console
    console.log('Webinar ID:', selectedWebinarId);

    // Send data to the API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarId: selectedWebinarId,
        enrollmentNo: user.enrollmentNo, // Pass the enrollment number
        userId: user._id, // Send the user's ID
        userName: user.name, // Send the user's name
        email: user.email, // Send the user's email
        phoneNumber: whatsapp, // Send the WhatsApp number
      }),
    });

    if (response.ok) {
      // Show success toast
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000); // Hide the toast after 4 seconds
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData.message);
      // You can also show an error toast here if needed
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1">
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg">
        <ExampleNavbarThree />
        <h1 className="text-2xl font-bold text-center text-black py-6">
          Upcoming Webinars & Expert Session
        </h1>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
            {webinars.map((webinar) => (
              <WebinarCard
                key={webinar._id}
                title={webinar.webinarName}
                presenter={webinar.conductor}
                date={webinar.date}
                description={webinar.description}
                // Use the image path from MongoDB here
                imageSrc={`${process.env.NEXT_PUBLIC_API_URL}/${webinar.image}`} // Assuming `webinar.image` contains the relative path
                onRegister={() => handleRegister(webinar._id)} // Pass the webinar ID
              />
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <RegistrationForm
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          user={user}
          webinarId={selectedWebinarId} // Pass the selected webinar ID
        />
      )}
      {showToast && <Toast message="Registered Successfully" />}
    </main>
  );
}
