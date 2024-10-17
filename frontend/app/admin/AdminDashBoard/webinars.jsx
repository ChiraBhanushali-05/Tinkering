import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { WebinarUpload } from './webinar-upload'
import { PastWebinars } from './past-webinar'
import { WebinarParticipants } from './webinar-participant'

export function Webinars() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return <WebinarUpload />
      case 'past':
        return <PastWebinars />
      case 'participants':
        return <WebinarParticipants />
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="space-y-4 bg-primary_color2 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 border-b pb-4">
        <Button
          className="w-full md:w-auto text-sm md:text-base"
          variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('upcoming')}
        >
          Upload Upcoming Webinars
        </Button>
        <Button
          className="w-full md:w-auto text-sm md:text-base"
          variant={activeTab === 'past' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('past')}
        >
          Upload Past Webinars
        </Button>
        <Button
          className="w-full md:w-auto text-sm md:text-base"
          variant={activeTab === 'participants' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('participants')}
        >
          Webinar Participants
        </Button>
      </div>
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  )
}
