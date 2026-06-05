import { pagesMetadata } from "@/constants/metadata";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AdmissionsForm from "@/components/admissions/AdmissionsForm";

export const metadata = pagesMetadata.admissions;

export default function Admissions() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AdmissionsForm />
      <Footer />
    </main>
  );
}
