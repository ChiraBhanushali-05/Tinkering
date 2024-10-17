import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../components/ui/table"
  import { Button } from "../../../components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../../components/ui/dropdown-menu"
  
  export function Applicants() {
    const applicants = [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", resume: "john_doe_resume.pdf" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", resume: "jane_smith_resume.pdf" },
      // Add more applicants as needed
    ]
  
    return (
      <div className="bg-primary_color2 rounded-lg text-black p-6">
        <h1 className="text-2xl font-bold mb-6">Internship Applicants</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phone}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => window.open(`/resumes/${applicant.resume}`, '_blank')}>
                    View Resume
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Action</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => console.log(`Approve ${applicant.name}`)}>
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log(`Reject ${applicant.name}`)}>
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }