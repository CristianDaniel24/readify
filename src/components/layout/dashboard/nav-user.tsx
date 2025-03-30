"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IPerson } from "@/types/person-interface";
import { cookieUtils } from "@/app/utils/cookies.utils";
import UserAvatar from "@/components/ui/user-avatar";
import { authService } from "@/services/auth-service";
import { useRouter } from "next/navigation";

function getInitialTheme(theme: string) {
  return theme === "dark" ? "light" : "dark";
}

export function NavUser() {
  const theme = useTheme();
  const router = useRouter();
  const { isMobile } = useSidebar();
  const [currTheme, setCurrTheme] = useState<string>(
    getInitialTheme(theme.theme ?? "dark")
  );

  const [user, setUser] = useState<IPerson>({} as IPerson);

  const handleTheme = () => {
    setCurrTheme(() => (currTheme === "dark" ? "light" : "dark"));
    theme.setTheme(currTheme);
  };

  const handleLogout = () => {
    authService.logOut();
    router.refresh();
  };

  useEffect(() => {
    const cookie = cookieUtils.getCookieValue("session");
    const person = cookie ? (JSON.parse(cookie) as IPerson) : ({} as IPerson);
    setUser(person);
  }, [user.id]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar src={user.avatar} alt={user.name}></UserAvatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar src={user.avatar} alt={user.name}></UserAvatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTheme}>
                {currTheme === "dark" ? (
                  <>
                    <Moon /> Dark Mode
                  </>
                ) : (
                  <>
                    <Sun /> Light Mode
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
