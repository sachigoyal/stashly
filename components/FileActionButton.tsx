"use client"

import { RefreshCcw, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface FileActionButtonProps {
      activeTab: string;
  trashCount: number;
  folderPath: Array<{ id: string; name: string }>;
  onRefresh: () => void;
  onEmptyTrash: () => void;
}

export default function FileActionButton({activeTab, trashCount, folderPath, onRefresh, onEmptyTrash}: FileActionButtonProps) {
    return(
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold truncate max-w-[70%]">
                {activeTab === "all" &&
                    (folderPath.length > 0
                        ? folderPath[folderPath.length - 1].name
                        : "All Files")}
                {activeTab === "starred" && "Starred Files"}
                {activeTab === "trash" && "Trash"}
            </h2>
              <div className="flex gap-2 sm:gap-3">
                <Button 
                    onClick={onRefresh}
                    className="cursor-pointer items-center justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600/90 dark:hover:bg-blue-700 rounded-md shadow-sm"
                >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    <span>Refresh</span>
                </Button>
                
                {activeTab === "trash" && trashCount > 0 && (
                    <Button 
                        onClick={onEmptyTrash}
                        className="cursor-pointer items-center justify-center py-2 bg-red-600 hover:bg-red-700 text-white dark:bg-red-600/90 dark:hover:bg-red-700 rounded-md shadow-sm"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Empty Trash</span>
                    </Button>
                )}
            </div>
        </div>
    )
}