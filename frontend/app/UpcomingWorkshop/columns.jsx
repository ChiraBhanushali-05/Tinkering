"use client"

import { Button } from "../../components/ui/button"

// No need to use TypeScript type annotations in JSX
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
        <Button variant="outline" onClick={() => openDocument(payment.url)}>Book</Button>
      );
    },
    header: "Book The BootCamp",
  },
]
