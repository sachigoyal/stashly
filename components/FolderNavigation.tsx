"use client"

import { ArrowUp, Home } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FolderNavigationProps {
  folderPath: Array<{ id: string; name: string }>;
  navigateUp: () => void;
  navigateToPathFolder: (index: number) => void;
}

export default function FolderNavigation({ folderPath, navigateUp, navigateToPathFolder }: FolderNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 text-sm overflow-x-auto mb-4 py-1">
      <Button
        onClick={navigateUp}
        disabled={folderPath.length === 0}
        size="sm"
        variant="outline"
        className="h-7 w-7 p-0 rounded-sm"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </Button>
      <Button
        onClick={() => navigateToPathFolder(-1)}
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1 px-2 h-7 rounded-sm hover:bg-accent",
          folderPath.length === 0 
            ? "font-medium text-primary" 
            : "text-muted-foreground"
        )}
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Button>

      {folderPath.map((folder, index) => (
        <div key={folder.id} className="flex items-center">
          <span className="mx-0.5 text-muted-foreground/50">/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToPathFolder(index)}
            className={cn(
              "px-2 h-7 rounded-sm text-ellipsis overflow-hidden max-w-[140px] hover:bg-accent",
              index === folderPath.length - 1
                ? "font-medium text-primary" 
                : "text-muted-foreground"
            )}
            title={folder.name}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  )
}
