import * as React from "react";
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

export function WebinarUpload() {
  const [date, setDate] = React.useState(null);
  const [webinarName, setWebinarName] = React.useState("");
  const [presenter, setPresenter] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [maxParticipants, setMaxParticipants] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState(null); // For image upload

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to hold the webinar data
    const formData = new FormData();
    formData.append("name", webinarName);
    formData.append("conductor", presenter);
    formData.append("date", date ? date.toISOString() : "");
    formData.append("description", description);
    formData.append("maxParticipants", maxParticipants);
    formData.append("duration", duration);
    formData.append("category", category);
    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars`, {
        method: "POST",
        body: formData, // Send FormData
      });

      const data = await response.json();
      if (response.ok) {
        alert("Webinar uploaded successfully! Webinar ID: " + data.webinarId);
      } else {
        alert("Failed to upload webinar: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading webinar:", error);
      alert("Error uploading webinar");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary_color2 p-5 rounded-md text-black">
      <h2 className="text-2xl font-bold mb-4">Upload Upcoming Webinar</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="webinarName">Webinar Name</Label>
          <Input
            id="webinarName"
            placeholder="Enter webinar name"
            value={webinarName}
            onChange={(e) => setWebinarName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="presenter">Presenter</Label>
          <Input
            id="presenter"
            placeholder="Enter presenter name"
            value={presenter}
            onChange={(e) => setPresenter(e.target.value)}
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter webinar description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="maxParticipants">Max Participants</Label>
          <Input
            type="number"
            id="maxParticipants"
            placeholder="Enter max participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration (in minutes)</Label>
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter webinar category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="image">Upload Image</Label>
          <Input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])} // Store selected file
          />
        </div>
        <Button type="submit" className="w-full">Upload Webinar</Button>
      </form>
    </div>
  );
}
