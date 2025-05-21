import { Info, Lightbulb, Code2, User2, LayoutTemplate, Paintbrush, Component, Database, Key, Image, Blocks, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CTAButton from "@/components/cta-button";
import Features from "@/components/landing/features";
import { Icons } from "@/components/icons";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
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

      <Features headless />

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-md icon-gradient">
            <Code2 size={14} />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-heading tracking-tight">Our Technology Stack</h2>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          Stashly leverages cutting-edge technologies to deliver a secure, responsive, and intuitive image management experience:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border rounded-lg hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                <LayoutTemplate className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium">Frontend</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <LayoutTemplate className="h-4 w-4 text-blue-500" />
                </div>
                <span>Next.js for server-side rendering and routing</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Paintbrush className="h-4 w-4 text-cyan-500" />
                </div>
                <span>Tailwind CSS for utility-first styling</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Component className="h-4 w-4 text-gray-500" />
                </div>
                <span>Shadcn UI for accessible component design</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 border rounded-lg hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium">Backend</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Database className="h-4 w-4 text-green-500" />
                </div>
                <span>Drizzle ORM for type-safe database operations</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Key className="h-4 w-4 text-purple-500" />
                </div>
                <span>Clerk for user authentication and management</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Image className="h-4 w-4 text-teal-500" />
                </div>
                <span>ImageKit for image storage and delivery</span>
              </li>
            </ul>
          </div>
          
          <div className="p-5 border rounded-lg hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-card">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                <Blocks className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium">Infrastructure</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Blocks className="h-4 w-4 text-black dark:text-white" />
                </div>
                <span>Vercel for deployment and edge hosting</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Icons.Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span>GitHub for collaborative development and CI/CD</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="min-w-5 flex justify-center">
                  <Cloud className="h-4 w-4 text-blue-400" />
                </div>
                <span>Cloud infrastructure for reliability and scale</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-primary/10 p-2 rounded-md icon-gradient">
            <User2 size={14} />
          </div>
          <div>
            <h2 className="text-xl font-semibold font-heading tracking-tight">Contributors</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contributor 1 */}
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

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold font-heading mb-4">Ready to start stashing your images?</h2>
        <CTAButton />
      </div>
    </div>
  )
}