import { admissionsHero } from "@/constants/admissions";
import Link from "next/link";

const AdmissionsHero = () => {
  return (
    <div className="relative flex min-h-[520px] w-full flex-col justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0 z-0">
        <img
          src={admissionsHero.image}
          alt="Students at El-Shaddai"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/75" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center px-6 py-24 lg:px-20 mt-10">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase">
            Admissions 2025 / 2026
          </span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight whitespace-pre-line drop-shadow">
            {admissionsHero.title}
          </h1>
          <p className="text-green-100 text-lg leading-relaxed max-w-2xl">
            {admissionsHero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="#apply"
              className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base font-bold transition-all shadow-lg active:scale-95"
            >
              Start Application
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-lg h-12 px-8 border-2 border-white text-white font-bold hover:bg-white hover:text-secondary transition-all duration-300"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsHero;
