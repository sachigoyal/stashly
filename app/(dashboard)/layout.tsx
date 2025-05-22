import Navbar from "@/components/landing/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col h-screen">
      <header className="sticky top-2 z-50 px-2 lg:px-0">
        <Navbar dashboard className="container max-w-9xl" />
      </header>
      <div className="container mx-auto px-2 sm:px-0">
        {children}
      </div>
    </main>
  );
}