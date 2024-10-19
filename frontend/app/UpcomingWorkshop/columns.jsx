"use client"

import { Button } from "../../components/ui/button"

// No need to use TypeScript type annotations in JSX
// columns.jsx

export const getColumns = (handleBookClick) => [
  {
    accessorKey: "srno",
    header: "SrNo",
  },
  {
    accessorKey: "name",
    header: "Name of the BootCamp",
  },
  {
    accessorKey: "date",
    header: "Date of the Bootcamp",
  },
  {
    id: "actions",
    header: "Book The BootCamp",
    cell: ({ row }) => {
      return (
        <Button onClick={() => handleBookClick(row.original)}>Book</Button>
      );
    },
  },
];

