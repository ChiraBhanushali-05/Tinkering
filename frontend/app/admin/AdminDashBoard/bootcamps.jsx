'use client'

import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { BootcampUpload } from './bootcamp-upload'
import { PastBootcamps } from './past-bootcamps'
import { BootcampParticipants } from './bootcamp-participants'

export function Bootcamps() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return <BootcampUpload />
      case 'past':
        return <PastBootcamps />
      case 'participants':
        return <BootcampParticipants />
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="space-y-4 bg-primary_color2 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-start space-y-2 sm:space-y-0 sm:space-x-2 border-b pb-4">
        <Button
          className={`w-full sm:w-auto m-2 sm:m-0 ${activeTab === 'upcoming' ? 'font-bold' : ''}`}
          variant={activeTab === 'upcoming' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('upcoming')}
        >
          Upload Upcoming Bootcamps
        </Button>
        <Button
          className={`w-full sm:w-auto m-2 sm:m-0 ${activeTab === 'past' ? 'font-bold' : ''}`}
          variant={activeTab === 'past' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('past')}
        >
          Upload Past Bootcamps
        </Button>
        <Button
          className={`w-full sm:w-auto m-2 sm:m-0 ${activeTab === 'participants' ? 'font-bold' : ''}`}
          variant={activeTab === 'participants' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('participants')}
        >
          Bootcamp Participants
        </Button>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  )
}
