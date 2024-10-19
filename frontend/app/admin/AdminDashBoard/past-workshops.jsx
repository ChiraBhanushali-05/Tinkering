'use client'

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

export function PastWorkshops
() {
  const [date, setDate] = useState(null)

  return (
    <div className="max-w-2xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Upload Past WorkShops</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="bootcampName">Workshop Name</Label>
          <Input id="bootcampName" placeholder="Enter bootcamp name" />
        </div>
        <div>
          <Label htmlFor="conductor">Conductor</Label>
          <Input id="conductor" placeholder="Enter conductor name" />
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
          <Textarea id="description" placeholder="Enter bootcamp description" />
        </div>
        <div>
          <Label htmlFor="video">Video URL</Label>
          <Input id="video" placeholder="Enter video URL" />
        </div>
        <Button type="submit">Upload Past WorkShop</Button>
      </form>
    </div>
  )
}
