"use client"
import FileTab from "@/components/FileTab";
import FolderNavigation from "@/components/FolderNavigation";
import UserProfile from "@/components/UserProfile";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center gap-4">
        <h1 className="text-4xl font-bold">File Manager</h1>
        <FolderNavigation />
        <FileTab
          activeTab="all"
          files={[]}
          onTabChange={() => {}}
          starredCount={0}
          trashCount={0}
        />
        <UserProfile />
      </div>
    </main>
  );
}
