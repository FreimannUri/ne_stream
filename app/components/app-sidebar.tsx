import { Home, Languages, MessagesSquare, Table2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/app/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import React from "react";
import Clock from "./clock";

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

export function AppSidebar() {
  // const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="items-end">
        <ModeToggle />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="">
        <SidebarGroup>
          {/* <SidebarGroupLabel></SidebarGroupLabel> */}

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-2">
                  {/* <SidebarMenuButton asChild isActive={pathname === item.url}> */}
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />

                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <Clock />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup></SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="flex-row justify-end items-center">
        {/* <Auth /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
