import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTAButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <Button size={size} className="cta-button hover:scale-105 duration-200 transition-transform transform-gpu ease-in-out gap-2 group/cta" asChild>
      <Link href="/dashboard">
        Get Started
        <ArrowRight size={16} className="group-hover/cta:translate-x-1 duration-200 transition-transform transform-gpu ease-in-out" />
      </Link>
    </Button>
  )
}