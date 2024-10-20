"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import ExampleNavbarThree from "../../components/Navigation";
import Image from 'next/image';

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
    await onSubmit();
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
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Enrollment Number</label>
            <input
              type="text"
              value={user?.enrollmentNo || ''}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
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
  const isRegistered = user?.registeredWebinars?.some((w) => w.webinarId === webinar._id);
  const isButtonDisabled = user?.registeredWebinars?.length > 0 ? isRegistered : false;

  return (
    <Card className="max-w-xs w-full flex flex-col rounded-lg overflow-hidden">
      <div className="w-full h-48 relative">
        <Image
          src={imageSrc}
          alt="Webinar thumbnail"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <CardContent className="p-3 space-y-2 flex-grow">
        <h2 className="text-lg font-bold text-brown">{title}</h2>
        <p className="text-sm font-semibold text-secondary">Presenter: {presenter}</p>
        <p className="text-xs text-gray-600">Date: {new Date(date).toLocaleDateString()}</p>
        <p className="text-sm">{description}</p>
        <Button
          onClick={() => onRegister(webinar._id)}
          disabled={isButtonDisabled}
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
  const [selectedWebinarId, setSelectedWebinarId] = useState(null);

  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars`);
      const data = await response.json();
      setWebinars(data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  const fetchUserSession = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user session');
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user session:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchWebinars();
    fetchUserSession();
  }, []);

  const handleRegister = (webinarId) => {
    setSelectedWebinarId(webinarId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async () => {
    console.log('Webinar ID:', selectedWebinarId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webinarId: selectedWebinarId,
        enrollmentNo: user.enrollmentNo,
        userId: user._id,
        userName: user.name,
        email: user.email,
      }),
    });

    if (response.ok) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    } else {
      const errorData = await response.json();
      console.error('Registration failed:', errorData.message);
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
                user={user}
                webinar={webinar}
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
          webinarId={selectedWebinarId}
        />
      )}
      {showToast && <Toast message="Registered Successfully" />}
    </main>
  );
}
