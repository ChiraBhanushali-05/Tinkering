import { columns } from "./columns" // No need to import Payment type in JSX
import { DataTable } from "./data-table"
import { ExampleNavbarThree } from "../../components/Navigation"

// No need to define the return type of the function in JSX
async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    {
      id: "728ed52f",
      srno: 101,
      date: '01/08/2024',
      name: "Machine Learning"
    },
    // Add more data if necessary...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center p-8 justify-between bg-primary_color1"> {/* Dark yellow background */}
      <div className="w-full max-w-screen-2xl bg-primary_color2 rounded-lg border border-primary_color3 shadow-lg"> {/* Added border and shadow */}
        <ExampleNavbarThree />
        <h2 className="text-4xl font-bold text-center text-black mb-12 mt-4">Past Workshops</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  )
}
