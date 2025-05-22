"use client"

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Brand from "@/components/brand";
import ModeToggle from "@/components/ModeToggle";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site.config";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
import { Menu, User2 } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronDown, Mail, User, LogOut, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar({ className, dashboard = false }: { className?: string, dashboard?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [width, setWidth] = useState(100);
  const navRef = useRef<HTMLDivElement>(null);
  const THRESHOLD = 40; // 40% of the full height of the screen

  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";
  const initials = fullName
    .split(" ")
    .map((name) => name?.[0] || "")
    .join("")
    .toUpperCase() || "U";
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses[0]?.emailAddress || "";
  const userRole = user?.publicMetadata.role as string | undefined;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }
    const fullHeight = document.documentElement.clientHeight;
    const threshold = fullHeight * THRESHOLD / 100;
    if (scrollY > threshold) {
      setWidth(50);
    } else {
      setWidth(100);
    }
  }, [scrollY, isMobile]);

  return (
    <motion.nav
      id="navbar"
      ref={navRef}
      className={cn("max-w-7xl mx-auto p-2 flex justify-between items-center bg-background/50 backdrop-blur-sm border rounded-lg transition-all transform-gpu duration-500 ease-out", className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, width: `${width}%` }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <Brand size="sm" className="pl-1" />
        </Link>
        <div className="hidden md:flex items-center gap-4">
          {navConfig.map((item) => (
            <Link href={item.href} key={item.label} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <Sheet>
            <SheetTitle className="sr-only">{siteConfig.name}</SheetTitle>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-3 pt-8">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.socials.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Icons.X className="size-3" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Icons.Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {dashboard && (
              <Button
                variant="outline"
                className={cn(
                  "gap-2 p-0 md:px-2.5 md:py-1.5 aspect-square sm:aspect-auto transition-opacity duration-150 ease-in",
                  !isLoaded && "opacity-0"
                )}
              >
                <Avatar className="h-5 w-5 flex-shrink-0">
                  <AvatarImage src={user?.imageUrl || undefined} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground hidden sm:inline">
                  {user?.firstName || "User"}
                  <ChevronDown className="h-4 w-4 ml-2 inline" />
                </span>
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2">
            <div className="flex flex-col items-center p-4 space-y-3">
              <Avatar className="h-16 w-16 ring-2 ring-primary/50 ring-offset-1 ring-offset-background shadow-md">
                {user?.imageUrl ? (
                  <AvatarImage
                    src={user.imageUrl}
                    alt={fullName || "User"}
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-lg font-bold">
                    {initials || <User2 className="size-16" />}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-xl font-semibold">{fullName || "User"}</h3>
              {email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
              )}
              {userRole && (
                <div className="flex justify-center mt-2">
                  <Badge
                    variant="outline"
                    className="bg-purple-500/10 text-purple-500 border-purple-500/50 px-3 py-1 rounded-xl"
                  >
                    {userRole}
                  </Badge>
                </div>
              )}
              <Separator className="my-1" />

              <div className="w-full space-y-3 py-3 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary/70" />
                    <span className="font-medium">Account Status</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-500/10 text-green-500 border-green-500/50 px-3 py-1 rounded-xl"
                  >
                    Active
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary/70" />
                    <span className="font-medium">Email Verification</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      user?.emailAddresses?.[0]?.verification?.status === "verified"
                        ? "bg-green-500/10 text-green-500 border-green-500/50 px-3 py-1 rounded-xl"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/50 px-3 py-1 rounded-xl"
                    }
                  >
                    {user?.emailAddresses?.[0]?.verification?.status === "verified"
                      ? "Verified"
                      : "Pending"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-primary/70" />
                    <span className="font-medium">Role</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-500 border-blue-500/50 px-3 py-1 rounded-xl"
                  >
                    {userRole || "User"}
                  </Badge>
                </div>
              </div>

              <Separator className="my-1" />
            </div>

            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/dashboard">
                <div className="flex flex-col">
                  <span>My Files</span>
                  <span className="text-xs text-muted-foreground">
                    Manage your files
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
              onClick={handleSignOut}
            >
              <div className="flex items-center gap-2 w-full">
                <LogOut size={16} />
                <div className="flex flex-col">
                  <span>Sign Out</span>
                  <span className="text-xs text-destructive/80">
                    Sign out of your account
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle size="icon" variant="ghost" className="size-9" />
      </div>
    </motion.nav>
  )
}

const MobileNav = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        {navConfig.map((item) => (
          <Link href={item.href} key={item.label} className="text-base text-muted-foreground hover:text-foreground transition-colors">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 py-4">
        <Button variant="ghost" size="icon" asChild>
          <a href={siteConfig.socials.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Icons.X className="w-4 h-4" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Icons.Github className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}

const navConfig = [
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Changelog",
    href: "/changelog"
  },
  {
    label: "Features",
    href: "/#features"
  },
  {
    label: "FAQs",
    href: "/#faqs"
  },
]