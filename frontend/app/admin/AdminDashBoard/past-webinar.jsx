import React, { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Calendar } from "../../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../../../lib/utils"

export function PastWebinars() {
  const [date, setDate] = useState(null)

  return (
    <div className="max-w-2xl mx-auto bg-primary_color2 p-5 rounded-md text-black ">
      <h2 className="text-2xl font-bold mb-4">Upload Past Webinar</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="webinarName">Webinar Name</Label>
          <Input id="webinarName" placeholder="Enter webinar name" />
        </div>
        <div>
          <Label htmlFor="presenter">Presenter</Label>
          <Input id="presenter" placeholder="Enter presenter name" />
        </div>
        <div>
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter webinar description" />
        </div>
        <div>
          <Label htmlFor="recordingLink">Recording Link</Label>
          <Input id="recordingLink" placeholder="Enter recording link" />
        </div>
        <Button type="submit">Upload Past Webinar</Button>
      </form>
    </div>
  )
}
