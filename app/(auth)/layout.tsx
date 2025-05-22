import { PictureInPicture, Star, Trash2, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import Brand from "@/components/brand";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex justify-between h-screen">
      <div className="w-0 hidden lg:block lg:w-1/2 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/20 z-0" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-10 md:p-12 lg:p-16">
          <div className="mb-10 text-center">
            <Link href="/" className="flex items-center justify-center">
              <Brand className="text-4xl" />
            </Link>
            <p className="text-muted-foreground mt-2 max-w-sm text-base">
              Your personal image storage solution - secure, simple, and organized.
            </p>
          </div>
          
          <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg w-full max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-full p-5 hover:bg-muted/50 transition-all duration-150 group/item border-dashed cursor-default",
                    {
                      "border-b": index < features.length - 1,
                      "sm:border-b-0": index >= features.length - 2,
                      "sm:border-b": index < features.length - 2,
                    },
                    {
                      "sm:border-r": index % 2 === 0 && index !== features.length - 1,
                    }
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn(
                      "p-2 rounded-md transition-all transform-gpu duration-150 ease-out delay-100",
                      feature.bgColor,
                      "group-hover/item:scale-110"
                    )}>
                      {feature.icon}
                    </div>
                    <h3 className="text-primary font-medium text-sm">{feature.category}</h3>
                  </div>
                  <h2 className="text-base font-semibold font-heading tracking-tight mb-2">{feature.name}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-xs text-muted-foreground/70 text-center">
            &copy; {new Date().getFullYear()} Stashly. All rights reserved.
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        {children}
      </div>
    </main>
  );
}

const features = [
  {
    icon: <Cloud className="size-3 text-primary" />,
    category: "Storage",
    name: "Secure Storage",
    description: "Upload and store your cherished images in a secure and organized personal space.",
    bgColor: "bg-blue-100 dark:bg-blue-950/40",
  },
  {
    icon: <PictureInPicture className="size-3 text-primary" />,
    category: "View",
    name: "Seamless Viewing",
    description: "Preview your images instantly with our optimized viewer for a smooth experience.",
    bgColor: "bg-purple-100 dark:bg-purple-950/40",
  },
  {
    icon: <Star className="size-3 text-primary" />,
    category: "Organize",
    name: "Star Important Images",
    description: "Mark favorite images with stars for quick access to your most valued memories.",
    bgColor: "bg-amber-100 dark:bg-amber-950/40",
  },
  {
    icon: <Trash2 className="size-3 text-primary" />,
    category: "Recovery",
    name: "Trash Protection",
    description: "Deleted images go to trash first with easy restoration to prevent accidental loss.",
    bgColor: "bg-red-100 dark:bg-red-950/40",
  },
];