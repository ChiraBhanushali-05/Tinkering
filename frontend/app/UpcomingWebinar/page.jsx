// WebinarCards.jsx
'use client'
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

function RegistrationForm({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Trigger the toast and close the form
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
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

function Toast({ message }) {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="toast">
        <div className="alert alert-info bg-blue-500 text-white px-4 py-2 rounded-lg">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default function WebinarCards() {
  const [webinars, setWebinars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars`);
      const data = await response.json();
      setWebinars(data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  const handleRegister = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000); // Hide the toast after 4 seconds
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
                presenter={webinar.presenter}
                date={webinar.date}
                description={webinar.description}
                imageSrc="/images/pic1.png" // Replace this with a proper image link if available
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      </div>

      {showForm && <RegistrationForm onClose={handleCloseForm} onSubmit={handleFormSubmit} />}
      {showToast && <Toast message="Registered Successfully" />}
    </main>
  );
}
