"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { files } from "@/lib/db/schema";
import { File, Star, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { InferSelectModel } from "drizzle-orm";

// Define the file type from the schema
type FileType = InferSelectModel<typeof files>;

interface FileTabProps {
  activeTab: string;
  files: FileType[];
  onTabChange: (tab: string) => void;
  starredCount: number;
  trashCount: number;
}

export default function FileTab({
  activeTab,
  files,
  onTabChange,
  starredCount,
  trashCount,
}: FileTabProps) {
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(key) => onTabChange(key)}
      className="w-full"
    >
      <TabsList className="w-full flex">
        <TabsTrigger value="all" className="flex-1 cursor-pointer">
          <File className="h-4 w-4" />
          <span>All Files</span>
          <Badge
            variant="secondary"
            className="ml-auto bg-secondary text-secondary-foreground text-xs"
            aria-label={`${files.filter((file) => !file.isTrash).length} files`}
          >
            {files.filter((file) => !file.isTrash).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="starred" className="flex-1 cursor-pointer">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>Starred</span>
          <Badge
            variant="secondary"
            className="ml-auto bg-secondary text-secondary-foreground text-xs"
            aria-label={`${starredCount} starred files`}
          >
            {starredCount}
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="trash" className="flex-1 cursor-pointer">
          <Trash className="h-4 w-4 text-destructive" />
          <span>Trash</span>
          <Badge
            variant="secondary"
            className="ml-auto bg-secondary text-secondary-foreground text-xs"
            aria-label={`${trashCount} files in trash`}
          >
            {trashCount}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
