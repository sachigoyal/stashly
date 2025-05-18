"use client"
import FileTab from "@/components/FileTab";
import FileUploadForm from "@/components/FileUploadForm";
import FolderNavigation from "@/components/FolderNavigation";
import UserProfile from "@/components/UserProfile";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center gap-4">
        <h1 className="text-4xl font-bold">File Manager</h1>
        <FileUploadForm
          userId="user123"
          onUploadSuccess={() => console.log("File uploaded successfully")}
          currentFolder="/documents"
        />
      </div>
    </main>
  );
}
