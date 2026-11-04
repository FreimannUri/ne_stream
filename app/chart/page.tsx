import { appSchema, columns } from "./columns";
import { DataTable } from "./data-table";
import { pool } from "../../db";

export const dynamic = "force-dynamic";

async function getData(): Promise<appSchema[]> {
  try {
    const data = await pool.query(`SELECT * FROM applications`);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch applications.");
  }
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container px-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
