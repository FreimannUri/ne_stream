import { Home, Table2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chart",
    url: "/chart",
    icon: Table2,
  },
];

export function Header() {
  return (
    <header className="flex h-16 items-center bg-secondary">
      {items.map((item, key) => (
        <a key={key} href={item.url} className="flex px-10">
          <item.icon />

          <span>{item.title}</span>
        </a>
      ))}

      <ThemeToggle />
    </header>
  );
}
