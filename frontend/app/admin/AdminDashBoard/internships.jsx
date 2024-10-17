import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { ManageInternships } from './manage-internships'
import { Applicants } from './applicants'
import { InternAssignments } from './intern-assignment'

export function Internships() {
  const [activeTab, setActiveTab] = useState('manage')

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-b">
        <Button
          variant={activeTab === 'manage' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('manage')}
        >
          Manage Internships
        </Button>
        <Button
          variant={activeTab === 'applicants' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('applicants')}
        >
          Applicants
        </Button>
        <Button
          variant={activeTab === 'assignments' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('assignments')}
        >
          Intern Assignments
        </Button>
      </div>
      {activeTab === 'manage' && <ManageInternships />}
      {activeTab === 'applicants' && <Applicants />}
      {activeTab === 'assignments' && <InternAssignments />}
    </div>
  )
}