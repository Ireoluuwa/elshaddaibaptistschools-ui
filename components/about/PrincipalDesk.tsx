import React from "react";
import { Quote } from "lucide-react";
import { principalDesk } from "@/constants/about";

const PrincipalDesk = () => {
  return (
    <div className="w-full bg-white dark:bg-background-dark py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <div className="bg-primary/5 dark:bg-green-900/20 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 items-center border border-green-100 dark:border-green-900">
          
          <div className="shrink-0 relative">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-green-800 shadow-xl">
              <img 
                alt="Principal" 
                className="w-full h-full object-cover" 
                src={principalDesk.image}
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg">
              <Quote size={24} />
            </div>
          </div>
          
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm block mb-2">
                {principalDesk.label}
              </span>
              <h2 className="text-primary dark:text-white text-3xl font-bold">
                {principalDesk.title}
              </h2>
            </div>
            
            <blockquote className="text-gray-700 dark:text-gray-300 text-lg md:text-xl italic leading-relaxed font-light">
              {principalDesk.quote}
            </blockquote>
            
            <div className="mt-2">
              <h4 className="text-primary dark:text-white font-bold text-xl">
                {principalDesk.name}
              </h4>
              <p className="text-gray-500 text-sm">
                {principalDesk.role}
              </p>
            </div>
            
            <div className="mt-4">
              <button className="inline-flex cursor-pointer items-center justify-center rounded-lg h-11 px-8 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors shadow-md">
                {principalDesk.buttonText}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PrincipalDesk;
