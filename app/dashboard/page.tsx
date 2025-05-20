import Navbar from "@/components/Navbar";
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardContent from "@/components/DashboardContent";



export default async function Dashboard() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <DashboardContent
          userId={userId ?? ""}
          userName={user?.firstName ?? ""}
        />
      </main>
    </div>
  )
}