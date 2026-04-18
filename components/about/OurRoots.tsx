import React from "react";
import { History } from "lucide-react";
import { rootsSection } from "@/constants/about";

const OurRoots = () => {
  return (
    <div className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm">
                {rootsSection.label}
              </span>
              <h2 className="text-primary text-3xl md:text-4xl font-black leading-tight">
                {rootsSection.title}
              </h2>
            </div>
            <div className="text-gray-600 text-lg leading-relaxed flex flex-col gap-4">
              {rootsSection.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                alt="Vintage school building" 
                className="w-full object-cover sepia-[.5] grayscale-[.2]" 
                src={rootsSection.image}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-white text-sm font-medium flex items-center">
                <History className="mr-2" size={20} />
                {rootsSection.imageCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRoots;
