import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/app/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import { Header } from "@/app/components/header";
import { cookies } from "next/headers";
import Template from "./ui/template";

export const metadata: Metadata = {
  // title: {
  //   template: '%s | Iurii Korotkov',
  //   default: 'Iurii Korotkov',
  // },
  description:
    "Next.js project deployed on Oracle Cloud Infrastructure with Ubuntu LTS instance, Nginx web server and Certbot certificate.",
  metadataBase: new URL("https://www.freimann.lv/"),

  keywords: [
    "Iurii",
    "Korotkov",
    "Latvia",
    "Riga",
    "developer",
    "mobile",
    "web",
  ],
  authors: [{ name: "Iurii Korotkov" }],
  publisher: "Iurii Korotkov",
  // alternates: { canonical: '/' },
  robots: "all",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            {/* <Header /> */}

            <main className="w-screen">
              <SidebarTrigger className="m-4" />

              <Template>{children}</Template>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
