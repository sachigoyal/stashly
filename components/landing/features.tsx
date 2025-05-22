import { PictureInPicture, FolderSearch, Star, Trash2, Download, Layers, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Features({ headless = false }: { headless?: boolean }) {
  return (
    <section id="features" className={cn("w-full max-w-7xl mx-auto")}>
      {!headless && (
        <div className="space-y-4 text-center mb-8">
        <div className="mx-auto bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center icon-gradient">
          <Layers className="h-6 w-6 z-10" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-heading tracking-tighter">Powerful Features</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Everything you need for a seamless image management experience</p>
        </div>
      )}

      <div className="border bg-card/50 overflow-hidden shadow-sm rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "relative w-full p-6 hover:bg-muted/50 transition-all duration-150 group/item border-dashed cursor-default",
                {
                  "border-b": index < features.length - 1,
                  "md:border-b-0": index >= features.length - 2,
                  "md:border-b": index < features.length - 2,
                  "lg:border-b-0": index >= features.length - 3,
                  "lg:border-b": index < features.length - 3,
                },
                {
                  "md:border-r": index % 2 === 0 && index !== features.length - 1,
                  "lg:border-r": index % 3 !== 2 && index !== features.length - 1,
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
                <h3 className="text-primary font-medium">{feature.category}</h3>
              </div>
              <h1 className="text-xl font-semibold font-heading tracking-tight mb-2">{feature.name}</h1>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <Cloud className="size-3 text-primary" />,
    category: "Storage",
    name: "Secure Image Storage",
    description: "Upload and store your cherished images in a secure and organized personal storage space.",
    bgColor: "bg-blue-100 dark:bg-blue-950/40",
  },
  {
    icon: <PictureInPicture className="size-3 text-primary" />,
    category: "View",
    name: "Seamless Image Viewing",
    description: "Preview your images instantly with our optimized viewer for a smooth browsing experience.",
    bgColor: "bg-purple-100 dark:bg-purple-950/40",
  },
  {
    icon: <Star className="size-3 text-primary" />,
    category: "Organize",
    name: "Star Important Images",
    description: "Mark favorite images with stars for quick access and create a collection of your most valued memories.",
    bgColor: "bg-amber-100 dark:bg-amber-950/40",
  },
  {
    icon: <Trash2 className="size-3 text-primary" />,
    category: "Recovery",
    name: "Trash Protection",
    description: "Deleted images go to trash first with easy restoration, protecting you from accidental deletions.",
    bgColor: "bg-red-100 dark:bg-red-950/40",
  },
  {
    icon: <Download className="size-3 text-primary" />,
    category: "Access",
    name: "Easy Downloads",
    description: "Download your images with a single click whenever you need access to your stored content.",
    bgColor: "bg-green-100 dark:bg-green-950/40",
  },
  {
    icon: <FolderSearch className="size-3 text-primary" />,
    category: "Management",
    name: "Folder Organization",
    description: "Create and navigate through folders to keep your image collection perfectly organized and structured.",
    bgColor: "bg-teal-100 dark:bg-teal-950/40",
  },
];