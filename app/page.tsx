import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Contact } from "@/components/sections/contact";
import { About } from "@/components/sections/about";
import { Consultation } from "@/components/sections/consultation";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustedBy } from "@/components/sections/trusted-by";
import { WhyUs } from "@/components/sections/why-us";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Work />
        <Testimonials />
        <Consultation />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}
