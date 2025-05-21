import CTAButton from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <AnnouncementBar />
        <div className="mt-5 text-3xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight flex flex-col items-center justify-center">
          <h1>Your Go-to Image Storage</h1>
          <h1 className="blue-gradient">Simple, Secure, and Fast</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Store and share your images with ease
          <br />
          No more cluttered hard drives or slow uploads
        </p>
        <div id="cta" className="flex items-center justify-center gap-5 mt-2">
          <CTAButton />
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


const AnnouncementBar = () => {
  return (
    <Link
      href="/dashboard"
      className="nav-gradient border-blue-400/50 border-[0.7px] border-b-[0.2px] rounded-full flex justify-between p-1 text-xs items-center gap-2 shine shine-hover hover:scale-105 duration-100 transition-transform transform-gpu ease-in-out cursor-pointer group"
    >
      <div className="px-[0.35rem] py-[0.125rem] bg-themePrimary rounded-xl">
        <Layers size={14} />
      </div>
      <p>Stash your images</p>
      <ArrowRight
        size={14}
        className="-translate-x-1 group-hover:-translate-x-[2px] duration-200 delay-75 transition-transform transform-gpu ease-in-out"
      />
    </Link>
  );
}