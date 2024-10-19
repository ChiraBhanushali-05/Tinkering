"use client"
import { useEffect, useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import ExampleNavbarThree from "../../components/Navigation";
function Toast({ message }) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
      {message}
    </div>
  );
}
function RegistrationForm({ onClose, onSubmit, user, webinarId }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API to register the user for the webinar
    await onSubmit(); // No need to pass the WhatsApp number
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Register for Webinar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={user?.name || ''}
              className="w-full p-2 border border-gray-300 rounded"
              disabled // Make the field non-editable
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full p-2 border border-gray-300 rounded"
              disabled // Make the field non-editable
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Enrollment Number</label>
            <input
              type="text"
              value={user?.enrollmentNo || ''} // Display the enrollment number
              className="w-full p-2 border border-gray-300 rounded"
              disabled // Make the field non-editable
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-black text-white px-4 py-2 rounded">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function WebinarCard({ title, presenter, date, description, imageSrc, onRegister, user, webinar }) {
  // Check if the user has registered for the webinar
  const isRegistered = user?.registeredWebinars?.some((w) => w.webinarId === webinar._id);

  // Determine if the button should be disabled
  const isButtonDisabled = user?.registeredWebinars?.length > 0 ? isRegistered : false;

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
        <Button
          onClick={() => onRegister(webinar._id)}
          disabled={isButtonDisabled} // Disable the button based on the modified logic
          className={`w-full ${isButtonDisabled ? 'bg-gray-400' : 'bg-black hover:bg-gray-600'} text-white text-sm py-2`}
        >
          {isButtonDisabled ? 'Registered' : 'Register'}
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
 // Fetch user session data
const fetchUserSession = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
      credentials: 'include',
    });
    
    // Check if the response is okay (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch user session');
    }

    const data = await response.json();
    setUser(data.user); // This will now include registeredWebinars
  } catch (error) {
    console.error('Error fetching user session:', error);
    setUser(null); // Optionally reset user if fetching fails
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
  const handleFormSubmit = async () => {
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
        // No phoneNumber field needed anymore
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
                imageSrc={`${process.env.NEXT_PUBLIC_API_URL}/${webinar.image}`}
                onRegister={() => handleRegister(webinar._id)}
                user={user} // Pass the user object here
                webinar={webinar} // Pass the webinar object to check registration
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
