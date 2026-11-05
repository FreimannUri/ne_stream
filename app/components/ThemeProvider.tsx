"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "@wrksz/themes/next";
import { useState, useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
