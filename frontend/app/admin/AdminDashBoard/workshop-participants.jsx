import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
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

export function WorkshopParticipants() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshops/with-participants`);
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, []);

  // Get participants from the selected workshop
  const allParticipants = selectedWorkshop?.participants
    ? Array.isArray(selectedWorkshop.participants)
      ? selectedWorkshop.participants
      : [selectedWorkshop.participants] // Wrap single participant in an array
    : [];


  const totalPages = Math.ceil(allParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = allParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Workshop Participants</h1>
      {!selectedWorkshop ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <Card key={workshop._id}>
              <CardHeader>
                <CardTitle>{workshop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Conductor: {workshop.conductor}</p>
                <p className="text-sm text-gray-600">Date: {new Date(workshop.date).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Registration Deadline: {new Date(workshop.registrationDeadline).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Participants Count: {workshop.participants?.length || 0}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedWorkshop(workshop)}>View Participants</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedWorkshop.title} - Participants</h2>
            <Button variant="outline" onClick={() => setSelectedWorkshop(null)}>Back to Workshops</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enrollment No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedParticipants.map((participant) => {
                return (
                  <TableRow key={participant.enrollmentNo}>
                    <TableCell>{participant.enrollmentNo}</TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                  </TableRow>
                );
              })}
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
