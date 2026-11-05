import { notFound } from "next/navigation";
import { pool } from "../../../db";
import Application from "../form";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="  mb-6 block">
      {/* <ol className={`${lusitana.className} text-xl md:text-2xl`}> */}
      <div className={`${lusitana.className} flex text-xl md:text-2xl`}>
        {breadcrumbs.map((breadcrumb, index) => (
          // <li
          //   key={breadcrumb.href}
          //   aria-current={breadcrumb.active}
          //   className={`${breadcrumb.active ? '' : 'text-muted-foreground'}`}
          // >
          <div
            key={index}
            className={`${breadcrumb.active ? "" : "text-muted-foreground"}`}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>

            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </div>
          // </li>
        ))}
      </div>
      {/* </ol> */}
    </nav>
  );
}

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
