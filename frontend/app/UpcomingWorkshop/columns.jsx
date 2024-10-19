"use client"

import { Button } from "../../components/ui/button"

// No need to use TypeScript type annotations in JSX
// columns.jsx

// columns.jsx
export const getColumns = (handleBookClick) => [
  {
    accessorKey: "srno", // This will be generated dynamically in the `getData` function
    header: "Sr No", // The column header for Sr No
    cell: ({ row }) => row.index + 1, // Display the index + 1 to generate Sr No (1, 2, 3,...)
  },
  {
    accessorKey: "title", // This will map to the `title` field from the API response
    header: "Title of the Bootcamp", // The column header for the title
  },
  {
    accessorKey: "date", // Ensure you map to the correctly formatted date
    header: "Date of the Bootcamp",
  },
  {
    id: "actions",
    header: "Book the Bootcamp",
    cell: ({ row }) => {
      return (
        <Button onClick={() => handleBookClick(row.original)}>Book</Button>
      );
    },
  },
];
