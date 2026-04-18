import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/about/Hero";
import OurHistory from "@/components/about/OurHistory";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import CTA from "@/components/home/CTA";
import Footer from "@/components/shared/Footer";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <OurHistory />
      <CoreValues />
      <Leadership />
      <CTA />
      <Footer />
    </main>
  );
}
