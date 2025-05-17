"use client";
import { User, Mail, LogOut, Loader2, User2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser, useClerk } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const email = user?.primaryEmailAddress?.emailAddress || "";
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join(" ")
    .toUpperCase();

  const userRole = user?.publicMetadata.role as string | undefined;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md border rounded-lg overflow-hidden">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md border rounded-lg overflow-hidden">
          <CardHeader className="flex justify-center items-center">
            <User size={20} />
            <h1 className="text-xl font-semibold">User Profile</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-4 space-y-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/50 ring-offset-1 ring-offset-background shadow-md hover:scale-105 transition-transform duration-300">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-lg font-bold">
                <User2 className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">Not Signed In</h3>
            <p className="text-muted-foreground">
              Please sign in to access your profile
            </p>
            <Button
              variant="default"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md border rounded-lg overflow-hidden">
        <CardHeader className="flex justify-center items-center">
          <User size={20} />
          <h1 className="text-xl font-semibold">User Profile</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4 pb-0 space-y-3">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-primary/50 ring-offset-1 ring-offset-background shadow-md hover:scale-105 transition-transform duration-300">
              {user?.imageUrl ? (
                <AvatarImage
                  src={user.imageUrl}
                  alt={user?.fullName || "User"}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-lg font-bold">
                  {initials || <User2 className="h-8 w-8" />}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <h3 className="text-xl font-semibold">{user?.fullName || "User"}</h3>
          {user?.emailAddresses && user.emailAddresses.length > 0 && (
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
                aria-label={`User role: ${userRole}`}
              >
                {userRole}
              </Badge>
            </div>
          )}
          <Separator className="my-1" />

          <div className="w-full space-y-3 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary/70" />
                <span className="font-medium">Account Status</span>
              </div>
              <Badge
                variant="outline"
                className={
                  isSignedIn
                    ? "bg-green-500/10 text-green-500 border-green-500/50 px-3 py-1 rounded-xl"
                    : "bg-red-500/10 text-red-500 border-red-500/50 px-3 py-1 rounded-xl"
                }
                aria-label={`Account status: ${
                  isSignedIn ? "Active" : "Inactive"
                }`}
              >
                {isSignedIn ? "Active" : "Inactive"}
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
                aria-label={`Email verification status: ${
                  user?.emailAddresses?.[0]?.verification?.status === "verified"
                    ? "Verified"
                    : "Pending"
                }`}
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
                User
              </Badge>
            </div>
          </div>

          <Separator />
        </CardContent>
        <CardFooter>
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
