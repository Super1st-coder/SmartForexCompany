import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { Approach } from "@/components/home/Approach";
import { PerformancesPreview } from "@/components/home/PerformancesPreview";
import { Advantages } from "@/components/home/Advantages";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Approach />
      <PerformancesPreview />
      <Advantages />
      <Testimonials />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
