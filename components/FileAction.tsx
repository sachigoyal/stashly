"use client"

import { files } from "@/lib/db/schema";
import { Star, Trash, X, ArrowUpFromLine, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InferSelectModel } from "drizzle-orm";

// Define the file type from the schema
type FileType = InferSelectModel<typeof files>;

interface FileActionsProps {
  file: FileType;
  onStar: (id: string) => void;
  onTrash: (id: string) => void;
  onDelete: (file: FileType) => void;
  onDownload: (file: FileType) => void;
}

export default function FileAction({ file, onStar, onTrash, onDelete, onDownload }: FileActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {/* Download button */}
      {!file.isTrash && !file.isFolder && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownload(file)}
          className="cursor-pointer shadow-sm hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
          aria-label="Download file"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      )}
      
      {/* Star button */}
      {!file.isTrash && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStar(file.id)}
          className={`cursor-pointer shadow-sm transition-colors ${
            file.isStarred 
              ? "border-yellow-200 hover:bg-yellow-50 dark:hover:bg-yellow-950/20" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          aria-label={file.isStarred ? "Unstar file" : "Star file"}
        >
          <Star
            className={`h-4 w-4 ${
              file.isStarred
                ? "text-yellow-400 fill-current"
                : "text-gray-400"
            }`}
          />
          <span className="hidden sm:inline">
            {file.isStarred ? "Unstar" : "Star"}
          </span>
        </Button>
      )}
      
      {/* Trash/Restore button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onTrash(file.id)}
        className={`cursor-pointer shadow-sm transition-colors ${
          file.isTrash
            ? "text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-950/20"
            : "text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
        }`}
        aria-label={file.isTrash ? "Restore file" : "Move file to trash"}
      >
        {file.isTrash ? (
          <ArrowUpFromLine className="h-4 w-4" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {file.isTrash ? "Restore" : "Delete"}
        </span>
      </Button>
      
      {/* Delete permanently button */}
      {file.isTrash && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(file)}
          className="cursor-pointer shadow-sm text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          aria-label="Permanently delete file"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Remove</span>
        </Button>
      )}
    </div>
  );
}