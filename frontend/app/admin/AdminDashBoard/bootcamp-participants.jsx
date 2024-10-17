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

export function BootcampParticipants() {
  const [bootcamps, setBootcamps] = useState([
    {
      id: "BC001",
      name: "Web Development Fundamentals",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-07-15 09:00 AM",
      participants: [
        { id: "BC001-P001", name: "John Doe", email: "john@example.com" },
        { id: "BC001-P002", name: "Jane Smith", email: "jane@example.com" },
        { id: "BC001-P003", name: "Alice Johnson", email: "alice@example.com" },
      ]
    },
    {
      id: "BC002",
      name: "Mobile App Development",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-08-01 10:00 AM",
      participants: [
        { id: "BC002-P001", name: "Bob Williams", email: "bob@example.com" },
        { id: "BC002-P002", name: "Charlie Brown", email: "charlie@example.com" },
      ]
    },
    {
      id: "BC003",
      name: "Data Science Essentials",
      image: "/placeholder.svg?height=100&width=200",
      dateTime: "2023-08-15 09:30 AM",
      participants: [
        { id: "BC003-P001", name: "Diana Prince", email: "diana@example.com" },
        { id: "BC003-P002", name: "Ethan Hunt", email: "ethan@example.com" },
        { id: "BC003-P003", name: "Fiona Gallagher", email: "fiona@example.com" },
      ]
    },
  ]);

  const [selectedBootcamp, setSelectedBootcamp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredParticipants = selectedBootcamp
    ? selectedBootcamp.participants.filter(participant =>
        participant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Bootcamp Participants</h1>
      {!selectedBootcamp ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bootcamps.map((bootcamp) => (
            <Card key={bootcamp.id}>
              <CardHeader>
                <CardTitle>{bootcamp.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={bootcamp.image} alt={bootcamp.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <p className="text-sm text-gray-600">ID: {bootcamp.id}</p>
                <p className="text-sm text-gray-600">Date & Time: {bootcamp.dateTime}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedBootcamp(bootcamp)}>View Participants</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedBootcamp.name} - Participants</h2>
            <Button variant="outline" onClick={() => setSelectedBootcamp(null)}>Back to Bootcamps</Button>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by Participant ID or Name"
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
