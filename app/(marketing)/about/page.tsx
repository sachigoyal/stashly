import { Info, Lightbulb, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Features from "@/components/landing/features";
import { Icons } from "@/components/icons";
import TechStack from "@/components/landing/tech-stack";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-16">
      <div className="text-center mb-12">
        <div className="mx-auto bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center icon-gradient">
          <Info className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-xl md:text-2xl lg:text-3xl font-bold font-heading">About Stashly</h1>
        <p className="mt-2 max-w-md mx-auto text-muted-foreground">
          Your personal image storage solution built with simplicity and security in mind.
        </p>
      </div>

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-primary/10 p-2 rounded-md icon-gradient">
            <Lightbulb size={14} />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-heading tracking-tight">Our Mission</h2>
          </div>
        </div>
        <p className="text-muted-foreground">
          Stashly was created to solve a common problem: managing personal images in an intuitive, secure, and efficient way.
          Our mission is to provide a clutter-free environment where you can store, organize, and access your images without
          the complexity of traditional cloud storage or the limitations of device storage.
        </p>
        <p className="text-muted-foreground mt-4">
          We believe that storing personal memories and important visual assets shouldn&apos;t be complicated or risky.
          That&apos;s why we&apos;ve built Stashly with simplicity and security as our guiding principles, ensuring your images
          are always accessible to you and only you.
        </p>
      </div>

      <div className="mt-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-heading tracking-tight mb-5">Features</h1>
      <Features headless />
      </div>

      <div className="mt-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-heading tracking-tight mb-5">Tech Stack</h1>
        <TechStack headless />
      </div>

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6 mt-12">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-primary/10 p-2 rounded-md icon-gradient">
            <User2 size={14} />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-heading tracking-tight">Contributors</h2>
          </div>
        </div>
          <p className="text-muted-foreground mb-6">
            Stashly is a collaborative effort between the following individuals who have contributed to its development.
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg flex justify-between items-center p-4">
            <a href="https://sachii.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/contributor">
              <img
                src="https://github.com/sachigoyal.png"
                alt="Sachi Goyal"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium group-hover/contributor:underline">Sachi Goyal</h3>
                <p className="text-sm text-muted-foreground">Developer</p>
              </div>
            </a>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://github.com/sachigoyal" target="_blank" rel="noopener noreferrer">
                  <Icons.Github className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://x.com/sachigoyal27" target="_blank" rel="noopener noreferrer">
                  <Icons.X className="size-3" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Contributor 2 */}
          <div className="border rounded-lg flex justify-between items-center p-4">
            <a href="https://rdsx.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/contributor">
              <img
                src="https://github.com/rudrodip.png"
                alt="Rudro"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium group-hover/contributor:underline">Rudro</h3>
                <p className="text-sm text-muted-foreground">Developer</p>
              </div>
            </a>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://github.com/rudrodip" target="_blank" rel="noopener noreferrer">
                  <Icons.Github className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://x.com/rds_agi" target="_blank" rel="noopener noreferrer">
                  <Icons.X className="size-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}