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
  const [link, setLink] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const webinarData = {
      webinarName,
      presenter,
      date,
      description,
      link,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/webinars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webinarData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        // Reset form fields if needed
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
          <Label htmlFor="link">Webinar Link</Label>
          <Input
            id="link"
            placeholder="Enter webinar link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <Button type="submit">Upload Webinar</Button>
      </form>
    </div>
  );
}
