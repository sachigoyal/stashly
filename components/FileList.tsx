"use client";

import { useEffect, useState, useMemo } from "react";
import { files } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import axios from "axios";
import { toast } from "sonner";
import { File, Folder, Star, Trash, X, ExternalLink } from "lucide-react";
import FileLoadingState from "./FileLoadingState";
import FileTab from "./FileTab";
import FolderNavigation from "./FolderNavigation";
import FileActionButton from "./FileActionButton";
import { Separator } from "./ui/separator";
import FileEmptyState from "./FileEmptyState";
import ConfirmationModal from "./ui/ConfirmationModal";
import { formatDistanceToNow, format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card";
import FileAction from "./FileAction";
import FileIcon from "./FileIcon";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

// Define the file type from the schema
type FileType = InferSelectModel<typeof files>;

interface FileListProps {
  refreshTrigger?: number;
  onFolderChange?: (folderId: string | null) => void;
}

export default function FileList({
  refreshTrigger,
  onFolderChange,
}: FileListProps) {
  const { user, isLoaded } = useUser();
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [emptyTrashModalOpen, setEmptyTrashModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      let url = `/api/files?userId=${user?.id}`;
      if (currentFolder) {
        url += `&parentId=${currentFolder}`;
      }

      const response = await axios.get(url);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Error Loading Files", {
        description: "We couldn't load your files. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchFiles();
    }
  }, [refreshTrigger, currentFolder, isLoaded]);

  // Filter files based on active tab
  const filteredFiles = useMemo(() => {
    switch (activeTab) {
      case "starred":
        return files.filter((file) => file.isStarred && !file.isTrash);
      case "trash":
        return files.filter((file) => file.isTrash);
      case "all":
      default:
        return files.filter((file) => !file.isTrash);
    }
  }, [files, activeTab]);

  // Count files in trash
  const trashCount = useMemo(() => {
    return files.filter((file) => file.isTrash).length;
  }, [files]);

  // Count starred files
  const starredCount = useMemo(() => {
    return files.filter((file) => file.isStarred && !file.isTrash).length;
  }, [files]);

  const handleStarFile = async (fileId: string) => {
    try {
      await axios.patch(`/api/files/${fileId}/star`);

      // Update local state
      setFiles(
        files.map((file) =>
          file.id === fileId ? { ...file, isStarred: !file.isStarred } : file
        )
      ); // Show toast
      const file = files.find((f) => f.id === fileId);
      toast.success(
        file?.isStarred ? "Removed from Starred" : "Added to Starred",
        {
          description: `"${file?.name}" has been ${file?.isStarred ? "removed from" : "added to"
            } your starred files`,
        }
      );
    } catch (error) {
      console.error("Error starring file:", error);
      toast.error("Action Failed", {
        description: "We couldn't update the star status. Please try again.",
      });
    }
  };
  const handleTrashFile = async (fileId: string) => {
    try {
      const response = await axios.patch(`/api/files/${fileId}/trash`);
      const responseData = response.data;

      // Update local state
      setFiles(
        files.map((file) =>
          file.id === fileId ? { ...file, isTrash: !file.isTrash } : file
        )
      );

      // Show toast
      const file = files.find((f) => f.id === fileId);
      toast.success(
        responseData.isTrash ? "Moved to Trash" : "Restored from Trash",
        {
          description: `"${file?.name}" has been ${responseData.isTrash ? "moved to trash" : "restored"
            }`,
        }
      );
    } catch (error) {
      console.error("Error trashing file:", error);
      toast.error("Action Failed", {
        description: "We couldn't update the file status. Please try again.",
      });
    }
  };
  const handleDeleteFile = async (fileId: string) => {
    try {
      // Store file info before deletion for the toast message
      const fileToDelete = files.find((f) => f.id === fileId);
      const fileName = fileToDelete?.name || "File";

      // Send delete request
      const response = await axios.delete(`/api/files/${fileId}/delete`);

      if (response.data.success) {
        // Remove file from local state
        setFiles(files.filter((file) => file.id !== fileId));

        // Show success toast
        toast.success("File Permanently Deleted", {
          description: `"${fileName}" has been permanently removed`,
        });
        setDeleteModalOpen(false);
      } else {
        throw new Error(response.data.error || "Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Deletion Failed", {
        description: "We couldn't delete the file. Please try again later.",
      });
    }
  };

  const handleEmptyTrash = async () => {
    try {
      await axios.delete(`/api/files/empty-trash`);

      // Remove all trashed files from local state
      setFiles(files.filter((file) => !file.isTrash));

      // Show toast
      toast.success("Trash Emptied", {
        description: `All ${trashCount} items have been permanently deleted`,
      });

      // Close modal
      setEmptyTrashModalOpen(false);
    } catch (error) {
      console.error("Error emptying trash:", error);
      toast.error("Action Failed", {
        description: "We couldn't empty the trash. Please try again later.",
      });
    }
  };
  const handleDownloadFile = async (file: FileType) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Preparing Download", {
        description: `Getting "${file.name}" ready for download...`,
      });

      // For images, we can use the ImageKit URL directly with optimized settings
      if (file.type.startsWith("image/")) {
        // Create a download-optimized URL with ImageKit
        // Using high quality and original dimensions for downloads
        const downloadUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-100,orig-true/${file.path}`;

        // Fetch the image first to ensure it's available
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error(`Failed to download image: ${response.statusText}`);
        }

        // Get the blob data
        const blob = await response.blob();

        // Create a download link
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file.name;
        document.body.appendChild(link);

        // Dismiss loading toast and show success toast
        toast.dismiss(loadingToastId);
        toast.success("Download Ready", {
          description: `"${file.name}" is ready to download.`,
        });

        // Trigger download
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } else {
        // For other file types, use the fileUrl directly
        const response = await fetch(file.fileUrl);
        if (!response.ok) {
          throw new Error(`Failed to download file: ${response.statusText}`);
        }

        // Get the blob data
        const blob = await response.blob();

        // Create a download link
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = file.name;
        document.body.appendChild(link);

        // Dismiss loading toast and show success toast
        toast.dismiss(loadingToastId);
        toast.success("Download Ready", {
          description: `"${file.name}" is ready to download.`,
        });

        // Trigger download
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Download Failed", {
        description: "We couldn't download the file. Please try again later.",
      });
    }
  };

  const openImageViewer = (file: FileType) => {
    if (file.type.startsWith("image/")) {
      // Create an optimized URL with ImageKit transformations for viewing
      // Using higher quality and responsive sizing for better viewing experience
      const optimizedUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-90,w-1600,h-1200,fo-auto/${file.path}`;
      window.open(optimizedUrl, "_blank");
    }
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    setFolderPath([...folderPath, { id: folderId, name: folderName }]);
    if (onFolderChange) {
      onFolderChange(folderId);
    }
  };

  const navigateUp = () => {
    if (folderPath.length > 0) {
      const newPath = [...folderPath];
      newPath.pop();
      setFolderPath(newPath);
      const newFolderId =
        newPath.length > 0 ? newPath[newPath.length - 1].id : null;
      setCurrentFolder(newFolderId);

      if (onFolderChange) {
        onFolderChange(newFolderId);
      }
    }
  };

  // Navigate to specific folder in path
  const navigateToPathFolder = (index: number) => {
    if (index < 0) {
      setCurrentFolder(null);
      setFolderPath([]);

      // Notify parent component about folder change
      if (onFolderChange) {
        onFolderChange(null);
      }
    } else {
      const newPath = folderPath.slice(0, index + 1);
      setFolderPath(newPath);
      const newFolderId = newPath[newPath.length - 1].id;
      setCurrentFolder(newFolderId);

      // Notify parent component about folder change
      if (onFolderChange) {
        onFolderChange(newFolderId);
      }
    }
  };

  const handleItemClick = (file: FileType) => {
    if (file.isFolder) {
      navigateToFolder(file.id, file.name);
    } else if (file.type.startsWith("image/")) {
      openImageViewer(file);
    }
  };

  if (loading) {
    return <FileLoadingState />;
  }
  return (
    <div className="space-y-6 bg-background/30 rounded-xl shadow-sm p-2 md:p-4 border-x-0 md:border-x border">
      <FileTab
        activeTab={activeTab}
        onTabChange={setActiveTab}
        files={files}
        starredCount={starredCount}
        trashCount={trashCount}
      />

      {activeTab === "all" && (
        <div className="mt-4">
          <FolderNavigation
            folderPath={folderPath}
            navigateUp={navigateUp}
            navigateToPathFolder={navigateToPathFolder}
          />
        </div>
      )}

      <div className="mt-4">
        <FileActionButton
          activeTab={activeTab}
          trashCount={trashCount}
          folderPath={folderPath}
          onRefresh={fetchFiles}
          onEmptyTrash={() => setEmptyTrashModalOpen(true)}
        />
      </div>
      <Separator className="my-4" />
      {filteredFiles.length === 0 ? (
        <FileEmptyState activeTab={activeTab} />
      ) : (
        <Card className="border bg-card/50 overflow-hidden shadow-sm rounded-lg py-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden sm:table-cell">Added</TableHead>
                  <TableHead className="w-60 md:w-[300px] lg:w-[350px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className={cn(
                      "hover:bg-muted/50 transition-colors",
                      {
                        "cursor-pointer": file.isFolder || file.type.startsWith("image/")
                      }
                    )}
                    onClick={() => handleItemClick(file)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileIcon file={file} />
                        <div>
                          <div className="font-medium flex items-center gap-2 text-foreground">
                            <span className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                              {file.name}
                            </span>{file.isStarred && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Star
                                      className="h-4 w-4 text-yellow-400"
                                      fill="currentColor"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>Starred</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {file.isFolder && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Folder className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>Folder</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {file.type.startsWith("image/") && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>Click to view image</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            {formatDistanceToNow(new Date(file.createdAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="text-xs text-muted-foreground">
                        {file.isFolder ? "Folder" : file.type}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-foreground">
                        {file.isFolder
                          ? "-"
                          : file.size < 1024
                            ? `${file.size} B`
                            : file.size < 1024 * 1024
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div>
                        <div className="text-foreground">
                          {formatDistanceToNow(new Date(file.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {format(new Date(file.createdAt), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <FileAction
                        file={file}
                        onStar={handleStarFile}
                        onTrash={handleTrashFile}
                        onDelete={(file) => {
                          setSelectedFile(file);
                          setDeleteModalOpen(true);
                        }}
                        onDownload={handleDownloadFile}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Confirm Permanent Deletion"
        description={`Are you sure you want to permanently delete this file?`}
        icon={X}
        iconColor="text-danger"
        confirmText="Delete Permanently"
        confirmColor="danger"
        onConfirm={() => {
          if (selectedFile) {
            handleDeleteFile(selectedFile.id);
          }
        }}
        isDangerous={true}
        warningMessage={`You are about to permanently delete "${selectedFile?.name}". This file will be permanently removed from your account and cannot be recovered.`}
      />

      <ConfirmationModal
        isOpen={emptyTrashModalOpen}
        onOpenChange={setEmptyTrashModalOpen}
        title="Empty Trash"
        description={`Are you sure you want to empty the trash?`}
        icon={Trash}
        iconColor="text-danger"
        confirmText="Empty Trash"
        confirmColor="danger"
        onConfirm={handleEmptyTrash}
        isDangerous={true}
        warningMessage={`You are about to permanently delete all ${trashCount} items in your trash. These files will be permanently removed from your account and cannot be recovered.`}
      />
    </div>
  );
}
