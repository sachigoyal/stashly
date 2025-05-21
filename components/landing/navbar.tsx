"use client"

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
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";


export default function HomeNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [width, setWidth] = useState(100);
  const navRef = useRef<HTMLDivElement>(null);

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
    if (scrollY > 100) {
      setWidth(50);
    } else {
      setWidth(100);
    }
  }, [scrollY, isMobile]);

  return (
    <nav id="navbar" ref={navRef} style={{ width: `${width}%` }} className={cn("max-w-7xl mx-auto p-2 flex justify-between items-center bg-background/50 backdrop-blur-sm border rounded-lg transition-all transform-gpu duration-500 ease-in-out")}>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Brand size="sm" className="pl-2" />
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
        <ModeToggle size="icon" variant="ghost" className="size-9" />
      </div>
    </nav>
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