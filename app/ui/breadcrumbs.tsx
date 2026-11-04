import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
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
