import React from "react";
import { principlesSection } from "@/constants/about";
import * as Icons from "lucide-react";

const GuidingPrinciples = () => {
  return (
    <div className="w-full bg-bg-accent-subtle/40 dark:bg-[#23382c] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary dark:text-white text-3xl md:text-4xl font-black mb-4">
            {principlesSection.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {principlesSection.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {principlesSection.principles.map((principle, idx) => {
            const IconComponent = (Icons as any)[principle.icon];
            
            return (
              <div key={idx} className="bg-white dark:bg-[#1b2e23] p-10 rounded-2xl shadow-sm border border-green-100 dark:border-green-800 hover:shadow-lg transition-shadow">
                <div className="size-16 rounded-full bg-bg-accent-subtle flex items-center justify-center text-primary mb-6">
                  {IconComponent && <IconComponent size={32} />}
                </div>
                <h3 className="text-primary dark:text-white text-2xl font-bold mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {principle.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuidingPrinciples;
