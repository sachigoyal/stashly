"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Card, CardHeader, CardContent } from "./ui/card";
import { FileUp, FileText, User } from "lucide-react"
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import UserProfile from "./UserProfile";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({ userId, userName }: DashboardContentProps) {
  const searchparams = useSearchParams();
  const tabParam = searchparams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

return (    <div className="w-full max-w-screen-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-foreground leading-tight">
          Hi,{" "}
          <span className="text-primary font-bold">
            {userName?.length > 10
              ? `${userName?.substring(0, 10)}...`
              : userName?.split(" ")[0] || "there"}
          </span>
          !
        </h2>
        <p className="text-muted-foreground mt-2 text-base">
          Your images are waiting for you.
        </p>
      </div>
      <Tabs 
        aria-label="Dashboard Tabs"
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex w-full border-b space-x-6 bg-transparent h-auto px-0">
          <TabsTrigger value="files" className="flex items-center gap-3 py-3 px-0 h-auto bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:rounded-lg cursor-pointer">
            <FileText className="h-5 w-5" />
            <span className="font-medium">My Files</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-3 py-3 px-0 h-auto bg-transparent rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:rounded-lg cursor-pointer">
            <User className="h-5 w-5" />
            <span className="font-medium">Profile</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="files">
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow p-0">
                <CardHeader className="flex gap-3 p-6 pb-3">
                  <FileUp className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Upload</h2>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <FileUploadForm
                    userId={userId}
                    onUploadSuccess={handleFileUploadSuccess}
                    currentFolder={currentFolder}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow p-0">
                <CardHeader className="flex gap-3 p-6 pb-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Your Files</h2>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <FileList
                    userId={userId}
                    refreshTrigger={refreshTrigger}
                    onFolderChange={handleFolderChange}
                  />                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="mt-8">
            <UserProfile />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}