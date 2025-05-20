import { Button } from "./ui/button";

import React, { useState } from "react";
import {
  FolderPlus,
  FilePlus,
  FileUp,
  X,
  Upload,
  ArrowRight,
  Folder,
} from "lucide-react";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import axios from "axios";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";

interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder = null,
}: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Only keeping the state we need for folder modal functionality
  const [folderModalOpen, setFolderModalOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    if (currentFolder) {
      formData.append("parentId", currentFolder);
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      toast.success("Upload Successful", {
        description: `${file.name} has been uploaded successfully.`,
      });


      clearFile();
      setUploading(false);

     
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
      setUploading(false);

      toast.error("Upload Failed", {
        description: "We couldn't upload your file. Please try again.",
      });
    }
  };



   const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Invalid Folder Name", {
        description: "Please enter a valid folder name.",
      });
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/folder/create", {
        name: folderName.trim(),
        userId: userId,
        parentId: currentFolder,
      });

      toast.success("Folder Created", {
        description: `Folder "${folderName}" has been created successfully.`,
      });
      setFolderName("");
      setFolderModalOpen(false);

      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Folder Creation Failed", {
        description: "We couldn't create the folder. Please try again.",
      });
    } finally {
      setCreatingFolder(false);
    }
}

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          className="flex-1 cursor-pointer items-center justify-center gap-2 py-2"
          onClick={() => setFolderModalOpen(true)}
        >
          <FolderPlus className="h-4 w-4" />
          <span>New Folder</span>
        </Button>
        {/* TODO: Implement folder modal */}
        <Button
          className="flex-1 cursor-pointer items-center justify-center gap-2 py-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <FilePlus className="h-4 w-4" />
          <span>Add Image</span>
        </Button>
      </div>

      {/* File Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          flex flex-col items-center justify-center min-h-[150px]
          transition-all duration-200 ease-in-out
          ${
            error
              ? "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
              : file
              ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
              : isDragActive
              ? "border-blue-500 bg-blue-100/70 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              : "border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          }
        `}
      >
        {!file ? (
          <div className="flex flex-col items-center w-full">
            <FileUp className="h-12 w-12 mb-2 text-primary/70" />
            <p className="text-foreground">
              Drag and drop your image here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary cursor-pointer font-medium inline bg-transparent border-0 p-0 m-0"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Images up to 5MB
            </p>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        ) : (
          <p className="font-medium">{file.name}</p>
        )}
        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>

      {file && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <FileUp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium truncate max-w-[180px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {file.size < 1024
                    ? `${file.size} B`
                    : file.size < 1024 * 1024
                    ? `${(file.size / 1024).toFixed(1)} KB`
                    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="text-muted-foreground p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {error && (
            <span className="text-sm text-red-500 dark:text-red-400">
              {error}
            </span>
          )}

          {uploading && (
            <div className="space-y-1">
              <Progress value={progress} className="max-w-full" />
              <p className="text-xs text-center">{progress}%</p>
            </div>
          )}

          <Button
            variant="default"
            onClick={handleUpload}
            disabled={!!error || uploading || !file}
            className="w-full"
          >
            {uploading ? (
              <span>Uploading... {progress}%</span>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                <span>Upload Image</span>
                {!uploading && <ArrowRight className="h-4 w-4 ml-2" />}
              </>
            )}{" "}
          </Button>
        </div>
      )}
      {/* Upload tips */}
      <div className="bg-gray-50/90 dark:bg-gray-900/90 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="p-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-800/80">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500 dark:text-blue-400"
          >
            <path
              d="M12 8v4m0 4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Upload Guidelines
          </h4>
        </div>{" "}
        <div className="p-3">
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500 dark:text-green-400"
              >
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Images are private and only visible to you</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500 dark:text-green-400"
              >
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Supported formats: JPG, PNG, GIF, WebP</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500 dark:text-green-400"
              >
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Maximum file size: 5MB</span>
            </li>
          </ul>
        </div>
      </div>            {/* Create Folder Modal */}
            <Dialog open={folderModalOpen} onOpenChange={setFolderModalOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <div className="flex flex-col items-center justify-center text-center ">
                    <Folder className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="text-lg font-semibold">New Folder</h3>
                  </div>
                </DialogHeader>
                
                <div className="space-y-5 px-4 pb-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Enter a name for your folder
                  </p>
                  <Input
                    type="text"
                    placeholder="My Images"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>                <DialogFooter className="flex justify-end gap-3 px-4">
                  <Button
                    variant="outline"
                    onClick={() => setFolderModalOpen(false)}
                    className="px-6 py-2 rounded-md"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleCreateFolder}
                    disabled={!folderName.trim() || creatingFolder}
                    className="px-6 py-2 rounded-md cursor-pointer"
                  >
                    {creatingFolder ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Create
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    </div>
  );
}
