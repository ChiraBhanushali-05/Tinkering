"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import MultiDropdowns from "./Dropdown";
import { motion } from "framer-motion";
import BlurIn from "../components/magicui/blur-in";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import SheetDemo from "../components/SheetDemo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Button } from "../components/ui/button";

const institutes = ["Institute A", "Institute B", "Institute C"];
const departments = ["Department X", "Department Y", "Department Z"];

export function ExampleNavbarThree() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu drawer state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile sheet state
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [user, setUser] = useState(null); // Holds the logged-in user
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [userRole, setUserRole] = useState(""); // Holds the user's role

  // Fetch user session status from the backend
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setUserRole(data.user.role || "No role assigned"); // Set role if found, otherwise default
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    fetchUserSession();
  }, []); // Runs once on component mount

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle profile function
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Track screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  const handleInstituteChange = (e) => {
    setSelectedInstitute(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Function to save selected institute and department
  const saveInstituteAndDepartment = async () => {
    if (!selectedInstitute || !selectedDepartment) {
      alert("Please select both an institute and a department.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institute: selectedInstitute,
          department: selectedDepartment,
        }),
      });

      if (response.ok) {
        alert("Details saved successfully!");
        // Optionally, you can reset the selected options
        setSelectedInstitute("");
        setSelectedDepartment("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving details:", error);
      alert("Failed to save details. Please try again.");
    }
  };

  return (
    <>
      <div className="relative w-full bg-primary_color2 rounded-lg">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex w-full items-center justify-between">
              <div className="inline-flex items-center space-x-2">
                <BlurIn word="Tinkering Hub" className="font-bold text-black dark:text-white" />
                <span className="w-40">
                  <img src="/images/logo1.png" alt="Tinkering Hub Logo" />
                </span>
              </div>

              {/* Search Input and Buttons for Large Screens */}
              <div className="flex grow justify-end mr-2 hidden lg:flex">
                <input
                  className="flex h-10 w-[180px] text-black rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600"
                  type="text"
                  placeholder="Search"
                />
                <button className="bg-black text-white rounded-lg w-32 ml-3">Search</button>
              </div>

              {/* Auth Button or Profile Icon */}
              <div className="hidden lg:block">
                {user ? (
                  <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                        onClick={toggleProfile} // Trigger the profile sheet
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image || "/placeholder-avatar.jpg"} alt="User" />
                          <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-[425px]">
                      <SheetHeader>
                        <SheetTitle>{user.name || "User Profile"}</SheetTitle>
                        <SheetDescription>Manage your account settings</SheetDescription>
                      </SheetHeader>
                      <div className="flex flex-col gap-4 py-4">
                        <p className="text-lg">Name: {user.name}</p>
                        <p className="text-lg">Role: {userRole}</p> {/* Display the user's role */}

                        {/* Institute Dropdown */}
                        <label htmlFor="institute" className="text-lg">Select Institute:</label>
                        <select
                          id="institute"
                          value={selectedInstitute}
                          onChange={handleInstituteChange}
                          className="rounded-md bg-gray-100 p-2"
                        >
                          <option value="">Select Institute</option>
                          {institutes.map((institute, index) => (
                            <option key={index} value={institute}>
                              {institute}
                            </option>
                          ))}
                        </select>

                        {/* Department Dropdown */}
                        <label htmlFor="department" className="text-lg">Select Department:</label>
                        <select
                          id="department"
                          value={selectedDepartment}
                          onChange={handleDepartmentChange}
                          className="rounded-md bg-gray-100 p-2"
                        >
                          <option value="">Select Department</option>
                          {departments.map((department, index) => (
                            <option key={index} value={department}>
                              {department}
                            </option>
                          ))}
                        </select>

                        <Button
                          onClick={saveInstituteAndDepartment} // Call the save function
                          className="bg-blue-600 text-white"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`;
                          }}
                          className="bg-red-600 text-white"
                        >
                          Logout
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <button
                    onClick={() =>
                      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
                    }
                    className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10"
                  >
                    Login with Google
                  </button>
                )}
              </div>

              {/* Menu Button for Small Screens */}
              <div className="flex lg:hidden">
                <button onClick={toggleMenu} className="rounded-lg bg-black p-2 text-white hover:bg-gray-700">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            {!isSmallScreen && <MultiDropdowns />}
          </div>
        </motion.div>
      </div>

      {/* Sheet Demo Drawer for Small Screens */}
      <SheetDemo isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
}

export default ExampleNavbarThree;
