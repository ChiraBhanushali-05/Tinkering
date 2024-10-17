"use client"

import { Button } from "../../components/ui/button"

// Define the shape of the data without TypeScript types.
export const columns = [
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
    cell: ({ row }) => {
      const payment = row.original;
  
      return (
        <Button variant="outline" onClick={() => openDocument(payment.url)}>View</Button>
      );
    },
    header: "Videos of the Bootcamp",
  },
]
