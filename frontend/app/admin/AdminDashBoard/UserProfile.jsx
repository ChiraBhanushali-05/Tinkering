// UserProfile.jsx
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Role:</span>
          <span>{user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Bootcamp Bookings:</span>
          <span>{user.bootcampBookings.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Internship Applications:</span>
          <span>{user.internshipApplications.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Lab Bookings:</span>
          <span>{user.labBookings.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Projects Pitched:</span>
          <span>{user.projectPitches.length}</span>
        </div>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default UserProfile;
