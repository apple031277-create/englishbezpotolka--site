import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Method from "@/components/sections/Method";
import Workbook from "@/components/sections/Workbook";
import Testimonial from "@/components/sections/Testimonial";
import QuizBanner from "@/components/sections/QuizBanner";
import Socials from "@/components/sections/Socials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Method />
      <Workbook />
      <Testimonial />
      <QuizBanner />
      <Socials />
    </>
  );
}
