import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <Navbar className="container mx-auto px-2 sm:px-0 py-2 md:py-3 lg:py-4" />
      </header>
      <div className="container mx-auto px-2 sm:px-0">
        {children}
      </div>
    </main>
  );
}