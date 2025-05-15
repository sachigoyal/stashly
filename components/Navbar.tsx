import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
    return(
        <div className="w-full">
            <div className="container mx-auto py-6 max-w-8xl">
            <div className="flex items-center justify-between">
                <Link href="/" className="">
                <AnimatedShinyText className="flex text-3xl font-semibold tracking-tight gap-1">
                    <Layers className="h-9 w-9 mt-1" />
                    Stashly
                </AnimatedShinyText>
                </Link>
                <div className="flex gap-5">
                    {/* for signed out */}
                    <SignedOut>
                        <Link href="/sign-in">
                         <Button className="cursor-pointer text-md py-5 px-7">SignIn</Button>
                        </Link>
                        <Link href="/sign-up">
                         <Button className="cursor-pointer text-md py-5 px-7">SignUp</Button>
                        </Link>
                    <div className="h- w-9">
                <ModeToggle />
                    </div>
                    </SignedOut>
                    {/* when user is signed in */}
                    <SignedIn>

                    </SignedIn>
                </div>
                </div>
            </div>
            </div>
    
    )
}