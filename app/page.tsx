"use client"
import { useState } from "react";
import FileAction from "@/components/FileAction";
import FileActionButton from "@/components/FileActionButton";
import FileEmptyState from "@/components/FileEmptyState";
import FileList from "@/components/FileList";
import FileLoadingState from "@/components/FileLoadingState";
import FileTab from "@/components/FileTab";
import FileUploadForm from "@/components/FileUploadForm"; 
import FolderNavigation from "@/components/FolderNavigation";
import Navbar from "@/components/Navbar";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import UserProfile from "@/components/UserProfile";
import { Trash, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileIcon from "@/components/FileIcon";



export default function Home() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-6 px-4">
      <Navbar />
      <div className="mt-6">
         <FileList 
          userId="user123" 
          refreshTrigger={Date.now()} 
          onFolderChange={(folderId) => console.log("Folder changed:", folderId)} 
        /> 
        
       <div className="mt-8 space-y-4 border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Modal Examples</h2>
          <div className="flex gap-4 flex-wrap">
            <Button 
              variant="destructive" 
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Open Delete Modal
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setIsWarningModalOpen(true)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Open Warning Modal
            </Button>
          </div>
        </div> 
      
        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="Delete File"
          description="Are you sure you want to delete this file? This action cannot be undone."
          icon={Trash}
          iconColor="text-destructive"
          confirmText="Delete"
          cancelText="Cancel"
          confirmColor="danger"
          onConfirm={() => console.log("File deleted")}
          isDangerous={true}
          warningMessage="This file will be permanently deleted and cannot be recovered."
        />
        
        {/* Warning Modal */}
        <ConfirmationModal
          isOpen={isWarningModalOpen}
          onOpenChange={setIsWarningModalOpen}
          title="Warning"
          description="This action might have consequences. Are you sure you want to proceed?"
          icon={AlertTriangle}
          iconColor="text-yellow-500"
          confirmText="Proceed"
          cancelText="Cancel"
          confirmColor="warning"
          onConfirm={() => console.log("Warning acknowledged")}
          isDangerous={false}
        />

        <FileIcon
          file={{
            id: "example-id",
            name: "https://www.nickrains.com/wp-content/uploads/2014/07/MainPic.jpg",
            type: "image/jpeg",
            path: "/",
            size: 123456,
            fileUrl: "/path/to/example.jpg",
            thumbnailUrl: "/path/to/thumbnail.jpg",
            userId: "user123",
            parentId: null,
            isFolder: false,
            isStarred: false,
            isTrash: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
        />
      </div>
    </div>
  );
}
