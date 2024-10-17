import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { X } from 'lucide-react'

function BookingForm({ onClose }) {
  const defaultTeamMembers = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams']
  const [teamSize, setTeamSize] = useState(defaultTeamMembers.length)
  const [step, setStep] = useState(1)
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers)

  const incrementSize = () => {
    setTeamSize((prevSize) => prevSize + 1)
    setTeamMembers((prevMembers) => [...prevMembers, ''])
  }

  const decrementSize = () => {
    if (teamSize > 1) {
      setTeamSize((prevSize) => prevSize - 1)
      setTeamMembers((prevMembers) => prevMembers.slice(0, -1))
    }
  }

  const handleTeamMemberChange = (index, value) => {
    setTeamMembers((prevMembers) => {
      const newMembers = [...prevMembers]
      newMembers[index] = value
      return newMembers
    })
  }

  const removeTeamMember = (index) => {
    if (teamSize > 1) {
      setTeamSize((prevSize) => prevSize - 1)
      setTeamMembers((prevMembers) => prevMembers.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book a Lab</h2>
        {step === 1 ? (
          <form>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-yellow-950">Project ID</Label>
                <Input
                  id="projectId"
                  className="bg-primary_color2"
                  placeholder="Enter Project ID"
                />
              </div>
              <div>
                <Label htmlFor="leaderName" className="text-yellow-950">Project Leader Name</Label>
                <Input
                  id="leaderName"
                  className="bg-primary_color2"
                  placeholder="Enter Project Leader Name"
                />
              </div>
              <div>
                <Label htmlFor="projectName" className="text-yellow-950">Project Name</Label>
                <Input
                  id="projectName"
                  className="bg-primary_color2"
                  placeholder="Enter Project Name"
                />
              </div>
              
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setStep(2)}>Next</Button>
              <Button variant="destructive" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-grow justify-start text-left"
                    onClick={() => removeTeamMember(index)}
                  >
                    {member || `Team Member ${index + 1}`}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTeamMember(index)}
                    disabled={teamSize === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {teamSize < 10 && (
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={incrementSize}
              >
                Add Team Member
              </Button>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button type="submit">Submit</Button>
              <Button variant="destructive" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingForm