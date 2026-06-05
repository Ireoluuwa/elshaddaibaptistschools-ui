import { pagesMetadata } from '@/constants/metadata';
import Navbar from "@/components/shared/Navbar";

export const metadata = pagesMetadata.about;
import Footer from "@/components/shared/Footer";
import Hero from "@/components/about/Hero";
import OurRoots from "@/components/about/OurRoots";
import GuidingPrinciples from "@/components/about/GuidingPrinciples";
import PrincipalDesk from "@/components/about/PrincipalDesk";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white font-display transition-colors duration-200">
      <Navbar />
      <Hero />
      <OurRoots />
      <GuidingPrinciples />
      <PrincipalDesk />
      <Footer />
    </main>
  );
}
