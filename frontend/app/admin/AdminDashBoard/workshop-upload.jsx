"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";

export function WorkshopUpload() {
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");
  const [conductor, setConductor] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workshopData = {
      title,
      conductor,
      date,
      registrationDeadline,
      capacity: Number(capacity),
      description,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshops/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workshopData),
      });

      if (response.ok) {
        // Handle successful upload (e.g., reset form or show success message)
        console.log("Workshop uploaded successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error uploading workshop:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Upload Upcoming Workshops</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="workshopName">Workshop Name</Label>
          <Input
            id="workshopName"
            placeholder="Enter workshop name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="conductor">Conductor</Label>
          <Input
            id="conductor"
            placeholder="Enter conductor name"
            value={conductor}
            onChange={(e) => setConductor(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
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
          <Label htmlFor="registrationDeadline">Registration Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !registrationDeadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {registrationDeadline ? format(registrationDeadline, "PPP") : <span>Pick a deadline</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={registrationDeadline}
                onSelect={setRegistrationDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            placeholder="Enter maximum capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter workshop description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Upload Workshop</Button>
      </form>
    </div>
  );
}
  