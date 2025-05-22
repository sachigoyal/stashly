"use client"

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { FileText, Plus } from "lucide-react"
import { Button } from "./ui/button";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import { useUser } from "@clerk/nextjs";

export default function DashboardContent() {
  const { user } = useUser();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);


  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    setIsUploadDialogOpen(false);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-foreground leading-tight font-heading">
            Hi,{" "}
            <span className="text-foreground font-bold">
              {user?.firstName || "there"}
            </span>
          </h2>
          <p className="text-muted-foreground mt-1 text-base">
            Your images are waiting for you.
          </p>
        </div>

        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
              <DialogDescription>
                Upload images to your personal storage
              </DialogDescription>
            </DialogHeader>
            <FileUploadForm
              onUploadSuccess={handleFileUploadSuccess}
              currentFolder={currentFolder}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="pb-0 pt-4 md:py-4 lg:py-6">
        <CardHeader className="px-2 md:px-4 lg:px-6">
          <CardTitle className="text-xl md:text-2xl lg:text-3xl">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Your Files</h2>
            </div>
          </CardTitle>
          <CardDescription>
            Upload, delete, and manage your files
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 md:px-4 lg:px-6">
          <FileList
            refreshTrigger={refreshTrigger}
            onFolderChange={handleFolderChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}