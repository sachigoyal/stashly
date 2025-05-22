import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTAButton({ size = "lg", title = "Get Started", className }: { size?: "lg" | "sm", title?: string, className?: string }) {
  return (
    <Button size={size} className={cn("cta-button hover:scale-105 duration-200 transition-transform transform-gpu ease-in-out gap-2 group/cta", className)} asChild>
      <Link href="/dashboard">
        {title}
        <ArrowRight size={16} className="group-hover/cta:translate-x-1 duration-200 transition-transform transform-gpu ease-in-out" />
      </Link>
    </Button>
  )
}