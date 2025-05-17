"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File as FileType } from "@/lib/db/schema";
import { File, Star, Trash } from "lucide-react";
import { Badge } from "./ui/badge";

interface FileTabProps {
  activeTab: string;
  files: (typeof FileType)[];
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
            className="w-full p-1"
        >
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="flex items-center gap-2 cursor-pointer">
                    <File className="h-4 w-4" />
                    <span>File</span>
                    <Badge
                        className="ml-auto"
                        aria-label={`${
                            files.filter((file: any) => !file.isTrash).length
                        } files`}
                    >
                        {files.filter((file: any) => !file.isTrash).length}
                    </Badge>
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex items-center gap-2 cursor-pointer">
                    <Star className="h-4 w-4" />
                    <span>Starred</span>
                    <Badge
                        className="ml-auto"
                        aria-label={`${starredCount} starred files`}
                    >
                        {starredCount}
                    </Badge>
                </TabsTrigger>
                <TabsTrigger value="trash" className="flex items-center gap-2 cursor-pointer">
                    <Trash className="h-4 w-4" />
                    <span>Trash</span>
                    <Badge
                        className="ml-auto"
                        aria-label={`${trashCount} files in trash`}
                    >
                        {trashCount}
                    </Badge>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
