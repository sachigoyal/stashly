export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex justify-between h-screen">
      <div className="w-0 hidden md:block md:w-1/2 bg-muted">
        
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {children}
      </div>
    </main>
  );
}