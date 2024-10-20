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
import Image from 'next/image'; // Importing Image from next/image

const ITEMS_PER_PAGE = 5;

export function InternAssignments() {
  const [labs, setLabs] = useState([
    {
      id: 1,
      name: "Web Development Lab",
      image: "/placeholder.svg",
      interns: [
        { id: "WD001", name: "John Doe", project: "E-commerce Site", pc: "PC-001", startDate: "2023-06-01", endDate: "2023-08-31" },
        { id: "WD002", name: "Jane Smith", project: "Blog Platform", pc: "PC-002", startDate: "2023-06-15", endDate: "2023-09-15" },
      ]
    },
    {
      id: 2,
      name: "Mobile App Lab",
      image: "/placeholder.svg",
      interns: [
        { id: "MA001", name: "Alice Johnson", project: "Fitness App", pc: "PC-003", startDate: "2023-07-01", endDate: "2023-09-30" },
        { id: "MA002", name: "Bob Williams", project: "Social Media App", pc: "PC-004", startDate: "2023-07-15", endDate: "2023-10-15" },
      ]
    },
    {
      id: 3,
      name: "AI Research Lab",
      image: "/placeholder.svg",
      interns: [
        { id: "AI001", name: "Charlie Brown", project: "Natural Language Processing", pc: "PC-005", startDate: "2023-08-01", endDate: "2023-11-30" },
      ]
    },
    {
      id: 4,
      name: "IoT Lab",
      image: "/placeholder.svg",
      interns: [
        { id: "IOT001", name: "Diana Prince", project: "Smart Home System", pc: "PC-006", startDate: "2023-08-15", endDate: "2023-11-15" },
      ]
    },
    {
      id: 5,
      name: "Data Science Lab",
      image: "/placeholder.svg",
      interns: [
        { id: "DS001", name: "Ethan Hunt", project: "Predictive Analytics", pc: "PC-007", startDate: "2023-09-01", endDate: "2023-12-31" },
      ]
    },
  ]);

  const [selectedLab, setSelectedLab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInterns = selectedLab
    ? selectedLab.interns.filter(intern =>
        intern.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredInterns.length / ITEMS_PER_PAGE);
  const paginatedInterns = filteredInterns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Intern Assignments</h1>
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
                  width={400} 
                  height={200} 
                  className="w-full h-40 object-cover rounded-md mb-4" 
                />
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedLab(lab)}>View Interns</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedLab.name} - Interns</h2>
            <Button variant="outline" onClick={() => setSelectedLab(null)}>Back to Labs</Button>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by Intern ID or Name"
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
                <TableHead>Intern ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>PC</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>{intern.id}</TableCell>
                  <TableCell>{intern.name}</TableCell>
                  <TableCell>{intern.project}</TableCell>
                  <TableCell>{intern.pc}</TableCell>
                  <TableCell>{intern.startDate}</TableCell>
                  <TableCell>{intern.endDate}</TableCell>
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
