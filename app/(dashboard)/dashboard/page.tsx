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
    <main className="max-h-full flex flex-col flex-1 py-8">
      <DashboardContent
        userId={userId ?? ""}
        userName={user?.firstName ?? ""}
      />
    </main>
  )
}