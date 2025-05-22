import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site.config";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import Brand from "@/components/brand";
import CTAButton from "../cta-button";

export default function Footer() {
  return (
    <section id="footer" className="w-full max-w-7xl mx-auto py-12 md:py-16">
      <Card className="border bg-card/50 overflow-hidden shadow-sm rounded-lg p-6">
        <div className="flex justify-between flex-wrap gap-5">
          <div className="space-y-8 lg:space-y-5 md:w-auto w-full flex flex-col md:items-start">
            <Brand size="sm" />
            <div className="flex md:flex-col md:gap-5 gap-3">
              <div className="flex items-center gap-3">
                <CTAButton size="sm" />
                <Button variant="outline" size="sm">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <a href={siteConfig.socials.x} target="_blank">
                  <Icons.X className="hover:scale-105 duration-75 transition-all ease-in-out bg-muted p-2 rounded size-8 text-muted-foreground" />
                </a>
                <a href={siteConfig.socials.github} target="_blank">
                  <Icons.Github className="hover:scale-105 duration-75 transition-all ease-in-out bg-muted p-2 rounded size-8 text-muted-foreground" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-12 md:w-auto w-full">
            <div className="space-y-3 text-muted-foreground flex flex-col md:items-end">
              <h1 className="text-primary">Features</h1>
              <Link
                href="/#features"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                Upload Images
              </Link>
              <Link
                href="/#features"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                Organization
              </Link>
              <Link
                href="/#features"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                Recovery
              </Link>
            </div>
            <div className="space-y-3 text-muted-foreground flex flex-col md:items-end">
              <h1 className="text-primary">Resources</h1>
              <Link
                href="/#faqs"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                About
              </Link>
              <Link
                href="/changelog"
                className="text-sm hover:text-secondary-foreground duration-75 transition-colors"
              >
                Changelog
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-5" />
        <div className="flex md:justify-between flex-wrap justify-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href={siteConfig.origin} className="hover:underline">
              {siteConfig.name}
            </Link>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span>
              A personal image storage solution built with 💖
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
}