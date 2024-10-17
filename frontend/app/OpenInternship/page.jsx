'use client';

import { useState, useEffect } from 'react';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ChevronLeft, ChevronRight, MapPin, Calendar, DollarSign, X } from 'lucide-react';
import ExampleNavbarThree from '../../components/Navigation';

// Mock data for internships
const mockInternships = [
  { id: 1, company: "TechCorp", position: "Frontend Developer Intern", location: "Onsite", stipend: "₹15,000/month", duration: "3 months", postedDate: "2023-07-10", isPaid: true },
  { id: 2, company: "DesignHub", position: "UI/UX Design Intern", location: "Onsite", stipend: "₹10,000/month", duration: "6 months", postedDate: "2023-07-05", isPaid: true },
  { id: 3, company: "DataMinds", position: "Data Science Intern", location: "Onsite", stipend: "Unpaid", duration: "4 months", postedDate: "2023-07-09", isPaid: false },
  { id: 4, company: "CloudSys", position: "Cloud Computing Intern", location: "Onsite", stipend: "₹18,000/month", duration: "3 months", postedDate: "2023-07-07", isPaid: true },
  { id: 5, company: "AITech", position: "Machine Learning Intern", location: "Onsite", stipend: "Unpaid", duration: "6 months", postedDate: "2023-07-11", isPaid: false }
];

export default function OpenInternships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [durationFilter, setDurationFilter] = useState("all");
  const [paidFilter, setPaidFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredInternships, setFilteredInternships] = useState(mockInternships);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const internshipsPerPage = 5;

  useEffect(() => {
    let filtered = mockInternships.filter(internship => {
      const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            internship.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDuration = durationFilter === "all" ||
                              (durationFilter === "1-3" && parseInt(internship.duration) <= 3) ||
                              (durationFilter === "3-6" && parseInt(internship.duration) > 3 && parseInt(internship.duration) <= 6) ||
                              (durationFilter === "6+" && parseInt(internship.duration) > 6);

      const matchesPaid = paidFilter === "all" || 
                          (paidFilter === "paid" && internship.isPaid) ||
                          (paidFilter === "unpaid" && !internship.isPaid);

      return matchesSearch && matchesDuration && matchesPaid;
    });

    if (sortOrder === "recent") {
      filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [searchTerm, durationFilter, paidFilter, sortOrder]);

  // Get current internships
  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstInternship, indexOfLastInternship);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  const handleApplyNow = (internship) => {
    setSelectedInternship(internship);
    setShowApplyForm(true);
  };

  const ApplyForm = ({ onClose, internship }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [resume, setResume] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted", { name, email, phone, resume });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Apply for {internship.position}</h2>
            <Button variant="ghost" onClick={onClose}><X size={24} /></Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Id</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume/CV</label>
              <Input
                id="resume"
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
                required
                className="mt-1"
                accept=".pdf,.doc,.docx"
              />
            </div>
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1">
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg shadow-lg">
        <ExampleNavbarThree />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Open Internships</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search for internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="custom-card-content">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Duration</h3>
                      <Select value={durationFilter} onValueChange={setDurationFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="1-3">1-3 months</SelectItem>
                          <SelectItem value="3-6">3-6 months</SelectItem>
                          <SelectItem value="6+">6+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Paid/Unpaid</h3>
                      <Select value={paidFilter} onValueChange={setPaidFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Payment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Sort By</h3>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort Order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="recent">Most Recent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Internships List */}
            <div className="w-full md:w-3/4">
              {currentInternships.map((internship) => (
                <Card key={internship.id} className="mb-6">
                  <CardHeader>
                    <CardTitle>{internship.position}</CardTitle>
                  </CardHeader>
                  <CardContent className="custom-card-content">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">{internship.company}</span>
                      <span className="text-sm text-gray-600">{formatDate(internship.postedDate)}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Location:</span> {internship.location}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Stipend:</span> {internship.stipend}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Duration:</span> {internship.duration} months
                    </div>
                    <div>
                      <Button onClick={() => handleApplyNow(internship)}>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={24} />
                </Button>
                <span className="mx-4 text-lg">{currentPage}</span>
                <Button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredInternships.length / internshipsPerPage)}
                >
                  <ChevronRight size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Form */}
      {showApplyForm && selectedInternship && (
        <ApplyForm onClose={() => setShowApplyForm(false)} internship={selectedInternship} />
      )}
    </main>
  );
}
