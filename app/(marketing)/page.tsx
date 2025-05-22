import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import FAQs from "@/components/landing/faqs";
import TechStack from "@/components/landing/tech-stack";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-24 md:gap-32 lg:gap-40 md:my-16">
      <Hero />
      <Features />
      <TechStack />
      <FAQs />
    </div>
  );
}
