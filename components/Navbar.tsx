"use client";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}
interface NavbarProps {
  user?: SerializedUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");
  return (
    <div className="w-full shadow-md bg-background border-b">
      <div className="container mx-auto py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="">
            <AnimatedShinyText className="flex text-3xl font-semibold tracking-tight gap-1">
              <Layers className="h-9 w-9 mt-1" />
              Stashly
            </AnimatedShinyText>
          </Link>
          <div className="flex gap-5">
            {/* for signed out */}{" "}
            <SignedOut>
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="default"
                    className="font-lg cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-lg cursor-pointer"
                  >
                    Sign Up
                  </Button>
                </Link>
                <ModeToggle />
              </div>
            </SignedOut>
            {/* when user is signed in */}
            <SignedIn>
              <div className="flex items-center gap-5">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1 cursor-pointer p-5"
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={user?.imageUrl || undefined} />
                        <AvatarFallback>{userDetails.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground hidden sm:inline">
                        {userDetails.displayName}
                        <ChevronDown className="h-4 w-4 ml-2 inline" />
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard?tab=profile")}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span>Profile</span>
                        <span className="text-xs text-muted-foreground">
                          {userDetails.email || "View your profile"}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span>My Files</span>
                        <span className="text-xs text-muted-foreground">
                          Manage your files
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <div className="flex flex-col">
                        <span>Sign Out</span>
                        <span className="text-xs text-destructive/80">
                          Sign out of your account
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
