'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ScrollArea } from "../../../components/ui/scroll-area"

const mockProjects = [
  {
    id: '1',
    projectName: 'AI-Powered Chatbot',
    teamLeader: 'John Doe',
    teamMembers: [
      { enrollmentNo: 'EN001', name: 'John Doe' },
      { enrollmentNo: 'EN002', name: 'Jane Smith' },
    ],
    projectDescription: 'An advanced chatbot using natural language processing to provide customer support.',
    technologies: 'Python, TensorFlow, React',
    pptUrl: 'https://example.com/chatbot-ppt.pptx',
    appliedDate: '2023-06-01',
    status: 'pending'
  },
  {
    id: '2',
    projectName: 'Smart Home IoT System',
    teamLeader: 'Alice Johnson',
    teamMembers: [
      { enrollmentNo: 'EN003', name: 'Alice Johnson' },
      { enrollmentNo: 'EN004', name: 'Bob Williams' },
    ],
    projectDescription: 'A comprehensive IoT system for home automation and energy management.',
    technologies: 'Arduino, Raspberry Pi, MQTT, React Native',
    pptUrl: 'https://example.com/smart-home-ppt.pptx',
    appliedDate: '2023-05-15',
    status: 'approved'
  },
  {
    id: '3',
    projectName: 'AI-Powered Chatbot',
    teamLeader: 'John Doe',
    teamMembers: [
      { enrollmentNo: 'EN001', name: 'John Doe' },
      { enrollmentNo: 'EN002', name: 'Jane Smith' },
    ],
    projectDescription: 'An advanced chatbot using natural language processing to provide customer support.',
    technologies: 'Python, TensorFlow, React',
    pptUrl: 'https://example.com/chatbot-ppt.pptx',
    appliedDate: '2021-06-01',
    status: 'pending'
  },
]

export function PeachedProjects() {
  const [projects, setProjects] = useState(mockProjects)
  const [activeTab, setActiveTab] = useState('applications')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 5

  const filteredProjects = projects
    .filter(project => activeTab === 'applications' ? project.status === 'pending' : project.status === 'approved')
    .filter(project => {
      // Convert both search term and project name to lowercase for case-insensitive search
      const searchLower = searchTerm.toLowerCase();
      return (
        project.projectName.toLowerCase().includes(searchLower) ||
        project.teamLeader.toLowerCase().includes(searchLower) ||
        project.teamMembers.some(member =>
          member.enrollmentNo.toLowerCase().includes(searchLower) || member.name.toLowerCase().includes(searchLower)
        )
      );
    })
    .sort((a, b) => 
      sortOrder === 'newest' 
        ? new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        : new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
    )

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleApprove = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: 'approved' } : project
    ))
  }

  const handleReject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchTerm, sortOrder])

  return (
    <div className="p-6 bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-black">Peached Projects</h2>
      
      <div className="flex space-x-2 mb-4">
        <Button
          variant={activeTab === 'applications' ? 'default' : 'outline'}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </Button>
        <Button
          variant={activeTab === 'approved' ? 'default' : 'outline'}
          onClick={() => setActiveTab('approved')}
        >
          Approved
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <Input
          placeholder="Search by project name, team leader, or student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6">
          {currentProjects.map((project) => (
            <Card key={project.id} className="bg-primary_color1 border-primary_color3">
              <CardHeader>
                <CardTitle>{project.projectName}</CardTitle>
                <CardDescription>Team Leader: {project.teamLeader}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Team Members:</h3>
                    <ul>
                      {project.teamMembers.map((member, index) => (
                        <li key={index}>{member.name} ({member.enrollmentNo})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technologies:</h3>
                    <p>{project.technologies}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Project Description:</h3>
                  <p className="text-sm">{project.projectDescription}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">PPT:</h3>
                  <a href={project.pptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Presentation
                  </a>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Applied Date:</h3>
                  <p>{new Date(project.appliedDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
              {activeTab === 'applications' && (
                <CardFooter className="flex justify-end space-x-2">
                  <Button onClick={() => handleReject(project.id)} variant="destructive">
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(project.id)}>
                    Approve
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
