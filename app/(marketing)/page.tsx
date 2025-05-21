import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import FAQs from "@/components/landing/faqs";
export default function Home() {
  return (
    <div className="w-full space-y-10">
      <Hero />
      <Features />
      <FAQs />
    </div>
  );
}
