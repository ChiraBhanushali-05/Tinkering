'use client'

import { useState, useEffect } from 'react'
import { BellIcon, MenuIcon } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Sidebar } from './sidebar'
import { Workshop } from './workshop'
import { Webinars } from './webinars'
import { Internships } from './internships'
import { LabBookings } from './lab-booking'
import { PeachedProjects } from './peached-projects'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('workshop')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSidebarOpen(window.innerWidth >= 768)
    }

    const fetchUserSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
          credentials: "include",
        });
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
          // Redirect if the role is not "admin"
          if (data.user.role !== "admin") {
            window.location.href = "http://localhost:3000"; // Redirect to localhost:3000 if not admin
          }
        } else {
          window.location.href = "http://localhost:3000"; // Redirect to localhost:3000 if no user is logged in
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        window.location.href = "http://localhost:3000"; // Redirect to localhost:3000 on error
      } finally {
        setTimeout(() => {
          setLoading(false); // Simulate longer loading time
        }, 3000); // Adjust this value for the desired loading time (3000 ms = 3 seconds)
      }
    };

    fetchUserSession(); // Fetch user session on component mount

    checkMobile();
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case 'workshop':
        return <Workshop />
      case 'webinars':
        return <Webinars />
      case 'internships':
        return <Internships />
      case 'labBookings':
        return <LabBookings />
      case 'peachedProjects':
        return <PeachedProjects />
      default:
        return <div>Select a section</div>
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Display loading message
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveSection={setActiveSection}
        isMobile={isMobile}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}`}>
        <header className="flex justify-between items-center p-4 bg-primary_color1 border-b">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            <h1 className="text-xl text-black font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="mr-2 md:w-[300px]"
            />
            <Button variant="ghost" size="icon">
              <BellIcon className="h-6 w-6 text-black" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
  