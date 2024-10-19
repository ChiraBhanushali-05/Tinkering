"use client"
// ProtectedRoute.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user session (could be from an API or local state)
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/session', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          // If no user is logged in, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        navigate('/login'); // Redirect if an error occurs
      }
    };
    fetchUser();
  }, [navigate]);

  // Redirect if user doesn't have the required role
  if (user && user.role !== requiredRole) {
    return navigate('/'); // Redirect to the homepage or any other route
  }

  // If the user is authenticated and has the correct role, render the component
  return children;
};

export default ProtectedRoute;
