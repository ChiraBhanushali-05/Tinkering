'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import ExampleNavbarThree from '../../components/Navigation'

export default function PeachProjectForm() {
  const [numParticipants, setNumParticipants] = useState(1)
  const [teamMembers, setTeamMembers] = useState([{ enrollmentNo: '', name: '' }])

  const handleParticipantChange = (e) => {
    const count = parseInt(e.target.value)
    setNumParticipants(count)
    setTeamMembers(Array(count).fill({ enrollmentNo: '', name: '' }))
  }

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1"> {/* Dark yellow background */}
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg"> {/* Added border and shadow */}
        <ExampleNavbarThree />
        {/* Add margin-top to create more space between navbar and card */}
        <Card className="w-full max-w-4xl mx-auto mt-8 bg-primary_color2 border border-primary_color3 shadow-md"> {/* Added border and shadow */}
          <CardHeader>
            <CardTitle className="text-lg">Peach Project Submission</CardTitle> {/* Increased text size */}
            <CardDescription className="text-base">Enter the details of your peach project</CardDescription> {/* Adjusted text size */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
              <div className="space-y-3">
                <Label htmlFor="projectName" className="text-base">Project Name</Label> {/* Adjusted text size */}
                <Input id="projectName" placeholder="Enter project name" required className="w-full" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="teamLeader" className="text-base">Project Team Leader</Label> {/* Adjusted text size */}
                <Input id="teamLeader" placeholder="Enter team leader's name" required className="w-full" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="numParticipants" className="text-base">Number of Participants</Label> {/* Adjusted text size */}
                <Input 
                  id="numParticipants" 
                  type="number" 
                  min="1" 
                  value={numParticipants} 
                  onChange={handleParticipantChange}
                  required 
                  className="w-full" 
                />
              </div>

              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-3 border p-6 rounded-md bg-primary_color2 border-primary_color3"> {/* Added border */}
                  <h3 className="font-semibold text-lg">Team Member {index + 1}</h3> {/* Adjusted text size */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`enrollmentNo-${index}`} className="text-base">Enrollment No</Label> {/* Adjusted text size */}
                      <Input 
                        id={`enrollmentNo-${index}`}
                        value={member.enrollmentNo}
                        onChange={(e) => handleTeamMemberChange(index, 'enrollmentNo', e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`name-${index}`} className="text-base">Name</Label> {/* Adjusted text size */}
                      <Input 
                        id={`name-${index}`}
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <Label htmlFor="projectDescription" className="text-base">Project Description</Label> {/* Adjusted text size */}
                <Textarea id="projectDescription" placeholder="Describe your project" required className="w-full" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="technologies" className="text-base">Technologies Used</Label> {/* Adjusted text size */}
                <Input id="technologies" placeholder="e.g., React, Node.js, MongoDB" required className="w-full" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="pptUpload" className="text-base">Upload PPT</Label> {/* Adjusted text size */}
                <Input id="pptUpload" type="file" accept=".ppt,.pptx" required className="w-full" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary_color2">Submit Project</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
