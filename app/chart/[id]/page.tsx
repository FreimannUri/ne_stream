import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { pool } from "../../../db";
import Application from "../application";

export const dynamic = "force-dynamic";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  async function fetchApplicationByID(id: string) {
    try {
      const data = await pool.query(`
        SELECT * FROM applications WHERE id = '${id}';
      `);

      return data.rows[0];
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch application.");
    }
  }

  let application;

  const params = await props.params;

  if (params.id == "-") {
    application = {
      id: "-",
    };
  } else {
    application = await fetchApplicationByID(params.id);
    if (!application) {
      notFound();
    }
  }

  return (
    <main className=" mt-48 max-w-md mx-auto px-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Applications", href: "/applications" },
          {
            label: "Edit Application",
            href: `/${params.id}`,
            active: true,
          },
        ]}
      />

      <Application {...application} />
    </main>
  );
}
