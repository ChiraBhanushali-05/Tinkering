import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component
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
  const [webinars, setWebinars] = useState([]);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars/with-participants`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWebinars(data); // Set the fetched webinars
      } catch (error) {
        console.error('Failed to fetch webinars:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchWebinars();
  }, []);

  // Filter participants based on the selected webinar and search term
  const filteredParticipants = selectedWebinar
    ? selectedWebinar.participants.filter(participant =>
        participant.enrollmentNo.toString().includes(searchTerm.toLowerCase()) || // ID is an integer, convert to string for comparison
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <div className="text-center">Loading webinars...</div>; // Loading message
  }

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Webinar Participants</h1>
      {!selectedWebinar ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <Card key={webinar._id}>
              <CardHeader>
                <CardTitle>{webinar.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Replace img with Image */}
                <Image 
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${webinar.image}`} 
                  alt={webinar.name} 
                  width={640} // Set a specific width
                  height={160} // Set a specific height
                  className="w-full h-40 object-cover rounded-md mb-4" 
                />
                <p className="text-sm text-gray-600">ID: {webinar._id}</p>
                <p className="text-sm text-gray-600">Date & Time: {webinar.dateTime}</p> {/* Assuming dateTime exists in response */}
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
                <TableHead>Enrollment No</TableHead> {/* Changed to Enrollment No */}
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedParticipants.map((participant) => (
                <TableRow key={participant.enrollmentNo}> {/* Use enrollmentNo as the key */}
                  <TableCell>{participant.enrollmentNo}</TableCell> {/* Display enrollmentNo */}
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

export default WebinarParticipants;
