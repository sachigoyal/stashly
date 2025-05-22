import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <header className="sticky top-2 z-50 px-2 lg:px-0">
        <Navbar />
      </header>
      <div className="w-full flex-1 px-2 md:px-0">
        {children}
      </div>
      <div className="border-t px-2 md:px-0">
        <Footer />
      </div>
    </div>
  )
}