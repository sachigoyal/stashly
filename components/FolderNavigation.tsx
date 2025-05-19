"use client"

import { ArrowUp, Home } from "lucide-react";
import { Button } from "./ui/button";

interface FolderNavigationProps {
  folderPath: Array<{ id: string; name: string }>;
  navigateUp: () => void;
  navigateToPathFolder: (index: number) => void;
}   

export default function FolderNavigation({ folderPath, navigateUp, navigateToPathFolder }: FolderNavigationProps) {    return (
        <div className="flex flex-wrap items-center gap-1 text-sm overflow-x-auto mb-4 py-1">
            <Button 
                onClick={navigateUp}
                disabled={folderPath.length === 0}
                size="sm"
                variant="outline"
                className="cursor-pointer p-1.5 h-8 w-8 rounded-md border-gray-200 dark:border-gray-700 shadow-sm"
            >
                <ArrowUp className="h-3.5 w-3.5" />
            </Button>
              <Button 
                onClick={() => navigateToPathFolder(-1)}
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1.5 px-2 py-1 h-8 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${folderPath.length === 0 ? "font-medium text-primary" : "text-gray-700 dark:text-gray-300"}`}
            >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
            </Button>
            
            {folderPath.map((folder, index) => (
                <div key={folder.id} className="flex items-center">
                    <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToPathFolder(index)}
                        className={`px-2 py-1 h-8 rounded-md cursor-pointer text-ellipsis overflow-hidden max-w-[140px] hover:bg-gray-100 dark:hover:bg-gray-800 ${index === folderPath.length - 1 
                            ? "font-medium text-primary" 
                            : "text-gray-700 dark:text-gray-300"}`}
                        title={folder.name}
                    >
                        {folder.name}
                    </Button>
                </div>
            ))}
        </div>
    )
}
