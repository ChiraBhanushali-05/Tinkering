import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export function WebinarParticipants() {
  const [webinars, setWebinars] = useState([
    {
      id: "WEB001",
      name: "Introduction to React",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-07-20 14:00 PM",
      participants: [
        { id: "WEB001-P001", name: "John Doe", email: "john@example.com" },
        { id: "WEB001-P002", name: "Jane Smith", email: "jane@example.com" },
        { id: "WEB001-P003", name: "Alice Johnson", email: "alice@example.com" },
        { id: "WEB001-P004", name: "Ethan Hunt", email: "ethan@example.com" },
      ]
    },
    {
      id: "WEB002",
      name: "Advanced TypeScript",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-08-05 10:00 AM",
      participants: [
        { id: "WEB002-P001", name: "Bob Williams", email: "bob@example.com" },
        { id: "WEB002-P002", name: "Fiona Apple", email: "fiona@example.com" },
      ]
    },
    {
      id: "WEB003",
      name: "React Native Essentials",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-08-15 15:30 PM",
      participants: [
        { id: "WEB003-P001", name: "Charlie Brown", email: "charlie@example.com" },
      ]
    },
    {
      id: "WEB004",
      name: "Node.js Fundamentals",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-08-25 13:00 PM",
      participants: [
        { id: "WEB004-P001", name: "Diana Prince", email: "diana@example.com" },
        { id: "WEB004-P001", name: "Diana Prince", email: "diana@example.com" },
        
      ]
    },
  ]);

  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredParticipants = selectedWebinar
    ? selectedWebinar.participants.filter(participant =>
        participant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Webinar Participants</h1>
      {!selectedWebinar ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <Card key={webinar.id}>
              <CardHeader>
                <CardTitle>{webinar.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={webinar.image} alt={webinar.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <p className="text-sm text-gray-600">ID: {webinar.id}</p>
                <p className="text-sm text-gray-600">Date & Time: {webinar.dateTime}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedWebinar(webinar)}>View Participants</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedWebinar.name} - Participants</h2>
            <Button variant="outline" onClick={() => setSelectedWebinar(null)}>Back to Webinars</Button>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by Participant ID, Name, or Email"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.id}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
  );
}
