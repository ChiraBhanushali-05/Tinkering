'use client'
import React, { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { ExampleNavbarThree } from "../../components/Navigation";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning "
    },
    // ...
  ];
}

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1">
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg">
        <ExampleNavbarThree />
        <h2 className="text-4xl font-bold text-center text-black mb-12 mt-4">
          Upcoming Workshops
        </h2>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
