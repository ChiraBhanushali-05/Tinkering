import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export function LabInterns({ labId }) {
  const router = useRouter();
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const dummyInterns = Array.from({ length: 50 }, (_, i) => ({
      id: `INT${(i + 1).toString().padStart(3, '0')}`,
      name: `Intern ${i + 1}`,
      project: `Project ${i + 1}`,
      pc: `PC-${(i + 1).toString().padStart(3, '0')}`,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    }));
    setInterns(dummyInterns);
    setFilteredInterns(dummyInterns);
  }, []);

  useEffect(() => {
    const results = interns.filter(intern =>
      intern.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterns(results);
    setCurrentPage(1);
  }, [searchTerm, interns]);

  const totalPages = Math.ceil(filteredInterns.length / ITEMS_PER_PAGE);
  const paginatedInterns = filteredInterns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lab {labId} Interns</h1>
        <Button onClick={() => router.back()}>Back to Labs</Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search interns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>PC</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInterns.map(intern => (
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
      <Pagination>
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        />
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        />
      </Pagination>
    </div>
  );
}
