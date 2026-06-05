import { pagesMetadata } from "@/constants/metadata";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AdmissionsHero from "@/components/admissions/AdmissionsHero";
import AdmissionsStats from "@/components/admissions/AdmissionsStats";
import AdmissionsProcess from "@/components/admissions/AdmissionsProcess";
import AdmissionsProgrammes from "@/components/admissions/AdmissionsProgrammes";
import AdmissionsFAQ from "@/components/admissions/AdmissionsFAQ";
import AdmissionsCTA from "@/components/admissions/AdmissionsCTA";

export const metadata = pagesMetadata.admissions;

export default function Admissions() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AdmissionsHero />
      <AdmissionsStats />
      <AdmissionsProcess />
      <AdmissionsProgrammes />
      <AdmissionsFAQ />
      <AdmissionsCTA />
      <Footer />
    </main>
  );
}
