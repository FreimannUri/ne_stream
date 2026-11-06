"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@wrksz/themes/client";
import { Button } from "@/app/ui/button";
import { Menu } from "@base-ui/react/menu";
import { useRouter } from "next/navigation";

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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
      <Menu.Root>
        <Menu.Trigger
          render={
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          }
        />

        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={8} className="z-50">
            <Menu.Popup
              className="min-w-[8rem] overflow-hidden rounded-md border border-neutral-200
                         bg-white p-1 text-neutral-900 shadow-md
                         dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
            >
              <Menu.RadioGroup
                value={theme ?? "system"}
                onValueChange={(value) => setTheme(value)}
              >
                {THEMES.map(({ value, label }) => (
                  <Menu.RadioItem
                    key={value}
                    value={value}
                    className="flex cursor-default select-none items-center rounded-sm
                               px-2 py-1.5 text-sm outline-none
                               data-[highlighted]:bg-neutral-100
                               dark:data-[highlighted]:bg-neutral-800"
                  >
                    {label}
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
