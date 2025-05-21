import Footer from "@/components/landing/footer";
import HomeNavbar from "@/components/landing/navbar";


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <header className="sticky top-2 z-50 px-2 lg:px-0">
        <HomeNavbar />
      </header>
      <div className="w-full flex-1">
        {children}
      </div>
      <div className="border-t">
        <Footer />
      </div>
    </div>
  )
}