import React from "react";

const CTA = () => {
  return (
    <div className="w-full bg-accent py-16">
      <div className="max-w-5xl mx-auto px-6 text-center text-secondary flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Join Our Community?
        </h2>
        <p className="max-w-2xl text-secondary/80 text-lg">
          Admissions for the 2024/2025 academic session are now open. Secure a
          bright future for your child today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg">
            Start Application
          </button>
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-transparent border border-white hover:bg-white/10 text-white text-base font-bold leading-normal tracking-[0.015em]">
            Contact Admissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
