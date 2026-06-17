import { pagesMetadata } from '@/constants/metadata';
import Navbar from "@/components/shared/Navbar";

export const metadata = pagesMetadata.home;
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import NewsAndEvents from "@/components/home/NewsAndEvents";
import Facilities from "@/components/home/Facilities";
import CTA from "@/components/home/CTA";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <NewsAndEvents />
      <Facilities />
      <CTA />
      <Footer />
    </main>
  );
}
