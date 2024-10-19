'use client'

import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import {  WorkshopParticipants } from './workshop-participants'
import { WorkshopUpload } from './workshop-upload'
import { PastWorkshops } from './past-workshops'

export function Workshop() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return <WorkshopUpload />
      case 'past':
        return <PastWorkshops />
      case 'participants':
        return <WorkshopParticipants />
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
          Upload Upcoming WorkShops
        </Button>
        <Button
          className={`w-full sm:w-auto m-2 sm:m-0 ${activeTab === 'past' ? 'font-bold' : ''}`}
          variant={activeTab === 'past' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('past')}
        >
          Upload Past WorkShops
        </Button>
        <Button
          className={`w-full sm:w-auto m-2 sm:m-0 ${activeTab === 'participants' ? 'font-bold' : ''}`}
          variant={activeTab === 'participants' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('participants')}
        >
        WorkShop Participants
        </Button>
      </div>

      {/* Content Section */}
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  )
}
