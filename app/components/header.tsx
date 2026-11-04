import { Languages, MessagesSquare, Table2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Table2,
  },
  {
    title: "Chart",
    url: "/chart",
    icon: Table2,
  },
];

export function Header() {
  return (
    <header className="flex h-16 bg-secondary">
      {items.map((item, key) => (
        <a key={key} href={item.url} className="flex px-10">
          <item.icon />

          <span>{item.title}</span>
        </a>
      ))}

      <a
        href="https://freedns.afraid.org"
        target="_blank"
        className="text-primary hover:underline text-sm"
      >
        Free DNS
      </a>

      <ModeToggle />
    </header>
  );
}
