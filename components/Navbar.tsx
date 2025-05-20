"use client";

import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { useClerk, useUser } from "@clerk/nextjs";
import { Layers, User, Mail, LogOut, Shield, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import ModeToggle from "./ModeToggle";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();

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

  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        <Link href="/" className="">
          <AnimatedShinyText className="flex text-xl md:text-2xl lg:text-4xl items-center font-semibold tracking-tight gap-2">
            <Layers className="size-6 md:size-8 lg:size-10" />
            Stashly
          </AnimatedShinyText>
        </Link>
        <div className="flex gap-5">
          <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
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
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
