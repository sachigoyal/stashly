import { Code2, LayoutTemplate, Paintbrush, Component, Database, Key, Image, Blocks, Cloud, Zap, GitBranch, Shield, Server, Cpu, ScrollText, ArrowRight } from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CTAButton from "@/components/cta-button";

export default function TechStack({ headless = false }: { headless?: boolean }) {
  return (
    <section id="tech-stack" className={cn("w-full max-w-7xl mx-auto")}>
      {!headless && (
        <div className="space-y-6 text-center mb-12">
          <div className="mx-auto bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center icon-gradient">
            <Code2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading tracking-tighter">Powered by Modern Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stashly leverages cutting-edge technologies to deliver a secure, responsive, and intuitive image management experience
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="border bg-card/50 overflow-hidden shadow-md rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md group-hover:scale-110 transition-transform duration-300">
              <LayoutTemplate className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Frontend Excellence</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Built with a modern frontend stack that prioritizes performance, accessibility, and developer experience.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <LayoutTemplate className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Next.js</p>
                <p className="text-sm text-muted-foreground">React framework with server-side rendering, static site generation, and optimized routing</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Paintbrush className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="font-medium">Tailwind CSS</p>
                <p className="text-sm text-muted-foreground">Utility-first CSS framework for rapid UI development with minimal CSS</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Component className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Shadcn UI</p>
                <p className="text-sm text-muted-foreground">Beautifully designed components built with Radix UI and Tailwind CSS</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium">TypeScript</p>
                <p className="text-sm text-muted-foreground">Strongly typed programming language that builds on JavaScript</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <ScrollText className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">React Hook Form</p>
                <p className="text-sm text-muted-foreground">Performant, flexible and extensible forms with easy-to-use validation</p>
              </div>
            </li>
          </ul>
          <div className="mt-6 text-right">
            <Button variant="link" size="sm" asChild className="gap-1">
              <Link href="https://nextjs.org" target="_blank">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="border bg-card/50 overflow-hidden shadow-md rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md group-hover:scale-110 transition-transform duration-300">
              <Database className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold">Powerful Backend</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Robust backend infrastructure with reliable data storage, authentication, and image processing capabilities.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Database className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Drizzle ORM</p>
                <p className="text-sm text-muted-foreground">TypeScript ORM with a focus on type safety, performance and developer experience</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Key className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">Clerk</p>
                <p className="text-sm text-muted-foreground">Complete authentication and user management solution with social logins</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Image className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <p className="font-medium">ImageKit</p>
                <p className="text-sm text-muted-foreground">Image optimization, transformation, and delivery service with CDN support</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Server className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <p className="font-medium">Serverless Functions</p>
                <p className="text-sm text-muted-foreground">Edge and serverless functions for efficient API endpoints</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium">Security First</p>
                <p className="text-sm text-muted-foreground">Secure by design with end-to-end encryption and data privacy</p>
              </div>
            </li>
          </ul>
          <div className="mt-6 text-right">
            <Button variant="link" size="sm" asChild className="gap-1">
              <Link href="https://orm.drizzle.team" target="_blank">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="border bg-card/50 overflow-hidden shadow-md rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-md group-hover:scale-110 transition-transform duration-300">
              <Blocks className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Scalable Infrastructure</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Built on reliable cloud infrastructure designed for global scale and exceptional performance.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Blocks className="h-5 w-5 text-black dark:text-white" />
              </div>
              <div>
                <p className="font-medium">Vercel</p>
                <p className="text-sm text-muted-foreground">Frontend cloud platform for static sites and Jamstack deployments with global CDN</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Icons.Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted-foreground">Source control and CI/CD workflows for automated testing and deployment</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Cloud className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Edge Network</p>
                <p className="text-sm text-muted-foreground">Global edge network for low-latency content delivery worldwide</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <GitBranch className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium">GitOps Workflow</p>
                <p className="text-sm text-muted-foreground">Infrastructure as code with automated deployments from git repositories</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="min-w-6 mt-1">
                <Cpu className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Compute Optimization</p>
                <p className="text-sm text-muted-foreground">Intelligent resource allocation for optimal performance and cost efficiency</p>
              </div>
            </li>
          </ul>
          <div className="mt-6 text-right">
            <Button variant="link" size="sm" asChild className="gap-1">
              <Link href="https://vercel.com" target="_blank">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="p-6 border bg-card/50 rounded-lg shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Why Our Tech Stack Matters</h3>
          <p className="text-muted-foreground mb-6">
            Our carefully selected technologies work together seamlessly to provide you with an image storage solution that&apos;s fast, reliable, and secure.
            From the responsive user interface to the scalable backend services, every component has been optimized for the best possible experience.
          </p>
          <CTAButton title="Start Using Stashly Today" />
        </div>
      </div>
    </section>
  );
} 