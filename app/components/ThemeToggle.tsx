"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@wrksz/themes/client";
import { Button } from "@/app/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [locale, setLocale] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) setLocale(cookieLocale);
    else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`;
    router.refresh();
  };

  return (
    <div className="flex w-full pl-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100
          transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
          transition-all dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
