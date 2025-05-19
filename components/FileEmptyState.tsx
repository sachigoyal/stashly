"use client"

import { File } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface FileEmptyStateProps {
  activeTab: string;
}

export default function FileEmptyState({ activeTab }: FileEmptyStateProps) {
  return (
    <Card className="border border-muted bg-secondary/30">
      <CardContent className="flex flex-col items-center text-center py-16">
        <div className="mb-6 p-4 rounded-full bg-secondary">
          <File className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-3">
          {activeTab === "all" && "No files available"}
          {activeTab === "starred" && "No starred files"}
          {activeTab === "trash" && "Trash is empty"}
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
          {activeTab === "all" &&
            "Upload your first file to get started with your personal cloud storage"}
          {activeTab === "starred" &&
            "Mark important files with a star to find them quickly when you need them"}
          {activeTab === "trash" &&
            "Files you delete will appear here for 30 days before being permanently removed"}
        </p>      </CardContent>
    </Card>
  );
}