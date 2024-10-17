import React, { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { Calendar } from "../../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../../../lib/utils"

export function ManageInternships() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  return (
    <div className="bg-primary_color2 rounded-lg text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Internships</h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" placeholder="Enter company name" />
        </div>
        <div>
          <Label htmlFor="internshipTitle">Internship Title</Label>
          <Input id="internshipTitle" placeholder="Enter internship title" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Enter location" />
        </div>
        <div>
          <Label htmlFor="internshipType">Internship Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select internship type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullTime">Full-time</SelectItem>
              <SelectItem value="partTime">Part-time</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="stipend">Stipend</Label>
          <Input id="stipend" type="number" placeholder="Enter stipend amount" />
        </div>
        <div>
          <Label htmlFor="applyBy">Apply By</Label>
          <Input id="applyBy" type="date" />
        </div>
        <div>
          <Label htmlFor="availablePositions">Available Positions</Label>
          <Input id="availablePositions" type="number" placeholder="Enter number of positions" />
        </div>
        <div>
          <Label htmlFor="skills">Skills Required</Label>
          <Input id="skills" placeholder="Enter required skills (comma-separated)" />
        </div>
        <div>
          <Label htmlFor="description">Internship Description</Label>
          <Textarea id="description" placeholder="Enter internship description" />
        </div>
        <div>
          <Label htmlFor="perks">Perks</Label>
          <Input id="perks" placeholder="Enter perks (comma-separated)" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="isActive" />
          <Label htmlFor="isActive">Active Listing</Label>
        </div>
        <Button type="submit">Add Internship</Button>
      </form>
    </div>
  )
}