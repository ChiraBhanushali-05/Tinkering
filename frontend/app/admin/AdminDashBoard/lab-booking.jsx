'use client'

import { useState } from 'react'
import Image from 'next/image' // Import Image component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination"

const ITEMS_PER_PAGE = 5

export function LabBookings() {
  const [labs, setLabs] = useState([
    {
      id: "LAB001",
      name: "AI/ML Lab",
      image: "/placeholder.svg?height=100&width=200",
      description: "Equipped with advanced machine learning tools and AI research equipment.",
      bookings: [
        { id: 1, projectId: "PROJ001", teamName: "Alpha Team", teamLeader: "Alice Johnson", startDate: "2023-07-01", endDate: "2023-07-07" },
        { id: 4, projectId: "PROJ004", teamName: "Delta Team", teamLeader: "Diana Prince", startDate: "2023-07-22", endDate: "2023-07-28" },
        { id: 7, projectId: "PROJ007", teamName: "Eta Team", teamLeader: "George Lucas", startDate: "2023-08-12", endDate: "2023-08-18" },
      ]
    },
    {
      id: "LAB002",
      name: "Apple Lab",
      image: "/placeholder.svg?height=100&width=200",
      description: "High-performance workstations with the latest software development tools.",
      bookings: [
        { id: 2, projectId: "PROJ002", teamName: "Beta Team", teamLeader: "Bob Smith", startDate: "2023-07-08", endDate: "2023-07-14" },
        { id: 5, projectId: "PROJ005", teamName: "Epsilon Team", teamLeader: "Ethan Hunt", startDate: "2023-07-29", endDate: "2023-08-04" },
        { id: 8, projectId: "PROJ008", teamName: "Theta Team", teamLeader: "Hannah Montana", startDate: "2023-08-19", endDate: "2023-08-25" },
      ]
    },
    {
      id: "LAB003",
      name: "IoT Lab",
      image: "/placeholder.svg?height=100&width=200",
      description: "Equipped with sensors, microcontrollers, and other IoT devices.",
      bookings: [
        { id: 3, projectId: "PROJ003", teamName: "Gamma Team", teamLeader: "Charlie Brown", startDate: "2023-07-15", endDate: "2023-07-21" },
        { id: 6, projectId: "PROJ006", teamName: "Zeta Team", teamLeader: "Fiona Apple", startDate: "2023-08-05", endDate: "2023-08-11" },
      ]
    },
    {
      id: "LAB004",
      name: "Cybersecurity Lab",
      image: "/placeholder.svg?height=100&width=200",
      description: "State-of-the-art equipment for cybersecurity research and testing.",
      bookings: []
    },
    {
      id: "LAB005",
      name: "AR/VR Lab",
      image: "/placeholder.svg?height=100&width=200",
      description: "Advanced equipment for augmented reality and virtual reality development.",
      bookings: []
    },
  ])

  const [selectedLab, setSelectedLab] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBookings = selectedLab
    ? selectedLab.bookings.filter(booking =>
        booking.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.teamLeader.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Lab Bookings</h1>
      {!selectedLab ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <Card key={lab.id}>
              <CardHeader>
                <CardTitle>{lab.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image 
                  src={lab.image} 
                  alt={lab.name} 
                  width={200} 
                  height={100} 
                  className="w-full h-40 object-cover rounded-md mb-4" 
                />
                <p className="text-sm text-gray-600">ID: {lab.id}</p>
                <p className="text-sm text-gray-600">{lab.description}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedLab(lab)}>View Bookings</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedLab.name} - Bookings</h2>
            <Button variant="outline" onClick={() => setSelectedLab(null)}>Back to Labs</Button>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by Project ID, Team Name, or Team Leader"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project ID</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Team Leader</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.projectId}</TableCell>
                  <TableCell>{booking.teamName}</TableCell>
                  <TableCell>{booking.teamLeader}</TableCell>
                  <TableCell>{booking.startDate}</TableCell>
                  <TableCell>{booking.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredBookings.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No bookings found matching your search.
            </div>
          )}
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  )
}
