import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import NewsAndEvents from "@/components/home/NewsAndEvents";
import Facilities from "@/components/home/Facilities";
import Faculty from "@/components/home/Faculty";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <NewsAndEvents />
      <Facilities />
      <Faculty />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
