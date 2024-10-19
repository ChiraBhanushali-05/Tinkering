  "use client";

  import { motion } from "framer-motion";
  import { Menu } from "lucide-react";
  import { useEffect, useState } from "react";
  import Link from "next/link";
  import BlurIn from "../components/magicui/blur-in";
  import SheetDemo from "../components/SheetDemo";
  import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
  import { Button } from "../components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../components/ui/drawer";
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
  import MultiDropdowns from "./Dropdown";

  const institutes = ["Institute A", "Institute B", "Institute C"];
  const departments = ["Department X", "Department Y", "Department Z"];

  export function ExampleNavbarThree() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedInstitute, setSelectedInstitute] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [userRole, setUserRole] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isProfileCompleted, setIsProfileCompleted] = useState(false); // New state variable

    useEffect(() => {
      const fetchUserSession = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
            {
              credentials: "include",
            }
          );
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setUserRole(data.user.role || "No role assigned");
    
            // Check if the user's profile is completed
            const isCompleted = data.user.institute && data.user.department && data.user.phoneNumber;
            setIsProfileCompleted(isCompleted);
            
            // Set state with user details
            setSelectedInstitute(data.user.institute || "");
            setSelectedDepartment(data.user.department || "");
            setPhoneNumber(data.user.phoneNumber || "");
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user session:", error);
        }
      };
    
      fetchUserSession();
    }, []);
    
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    useEffect(() => {
      const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getInitials = (email) => {
      if (!email) return "U";
      return email.charAt(0).toUpperCase();
    };

    const saveUserPreferences = async () => {
      if (!selectedInstitute || !selectedDepartment) {
        alert("Please select both an institute and a department.");
        return;
      }
    
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              institute: selectedInstitute,
              department: selectedDepartment,
              phoneNumber,
            }),
          }
        );

        if (response.ok) {
          alert("Details saved successfully!");
          // Update profile completion status
          setIsProfileCompleted(true); // Mark profile as completed
          setIsProfileOpen(false);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error saving details:", error);
        alert("Failed to save details. Please try again.");
      }
    };
    
    const handleGoogleLogin = () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    };
    const handleLogout = () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`;
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
                  <Link href="/">
                    <BlurIn word="Tinkering Hub" className="font-bold text-black dark:text-white" />
                  </Link>
                  <span className="w-40">
                    <img src="/images/logo1.png" alt="Tinkering Hub Logo" />
                  </span>
                </div>
                <div className="flex grow justify-end mr-2 hidden lg:flex">
                  
                  {!user && (
                    <button
                      onClick={() =>
                        (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`)
                      }
                      className="ml-4 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10"
                    >
                      Login with Google
                    </button>
                  )}
                </div>
    
                {/* Avatar visible on all screen sizes */}
                {user && (
                  <Drawer
                    open={isProfileOpen}
                    onOpenChange={setIsProfileOpen}
                    side="right"
                  >
                    <DrawerTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-12 w-12 rounded-full"
                        onClick={toggleProfile}
                      >
                        <Avatar className="h-12 w-12 bg-black">
                          <AvatarImage
                            src={user.image || "/placeholder-avatar.jpg"}
                            alt={user.name}
                          />
                          <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="h-full w-[400px] shadow-lg rounded-r-lg bg-primary_color2">
                      <div className="flex flex-col h-full overflow-y-auto">
                        <DrawerHeader className="text-left">
                          <DrawerTitle className="text-black">User Profile</DrawerTitle>
                          <DrawerDescription className="text-black">
                            Manage your account settings
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex-grow p-4 space-y-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-24 w-24">
                              <AvatarImage
                                src={user.image || "/placeholder-avatar.jpg"}
                                alt={user.name}
                              />
                              <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Label className="text-lg text-black font-semibold">
                                {user.name}
                              </Label>
                              <p className="text-sm text-muted-foreground text-black">
                                {userRole}
                              </p>
                            </div>
                          </div>

                          {/* Conditionally render details based on profile completion */}
                          <div className="space-y-4">
                            {!isProfileCompleted ? (
                              <>
                                {/* Show form fields if profile is incomplete */}
                                <div className="space-y-2">
                                  <Label htmlFor="institute" className="text-black">
                                    Institute
                                  </Label>
                                  <Select
                                    onValueChange={setSelectedInstitute}
                                    value={selectedInstitute}
                                  >
                                    <SelectTrigger id="institute">
                                      <SelectValue placeholder="Select Institute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {institutes.map((institute, index) => (
                                        <SelectItem key={index} value={institute}>
                                          {institute}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="department" className="text-black">
                                    Department
                                  </Label>
                                  <Select
                                    onValueChange={setSelectedDepartment}
                                    value={selectedDepartment}
                                  >
                                    <SelectTrigger id="department">
                                      <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {departments.map((department, index) => (
                                        <SelectItem key={index} value={department}>
                                          {department}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="phone" className="text-black">
                                    Phone Number
                                  </Label>
                                  <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                {/* Show details if profile is complete */}
                                <div className="space-y-2">
                                  <Label className="text-black">Institute</Label>
                                  <p className="text-lg font-semibold">{selectedInstitute}</p>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-black">Department</Label>
                                  <p className="text-lg font-semibold">{selectedDepartment}</p>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-black">Phone Number</Label>
                                  <p className="text-lg font-semibold">{phoneNumber}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <DrawerFooter>
                          {/* Conditionally render the Save Changes button only if profile is incomplete */}
                          {!isProfileCompleted && (
                            <Button onClick={saveUserPreferences}>Save Changes</Button>
                          )}
                          <Button variant="outline" onClick={handleLogout}>
                            Logout
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>

                  </Drawer>
                )}
    

                {/* Menu Button for Small Screens */}
                <div className="flex lg:hidden">
                  <button
                    onClick={toggleMenu}
                    className="rounded-lg bg-black p-2 text-white hover:bg-gray-700"
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
    
              {!isSmallScreen && <MultiDropdowns />}
            </div>
          </motion.div>
        </div>
    
        <SheetDemo isOpen={isMenuOpen} onClose={toggleMenu} onGoogleLogin={handleGoogleLogin} />
      </>
    );
    
  }

  export default ExampleNavbarThree;