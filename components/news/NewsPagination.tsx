import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NewsPagination = () => {
  return (
    <div className="flex items-center justify-center gap-4 pt-8">
      <button className="flex items-center justify-center rounded-lg h-10 w-10 border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-primary hover:text-white transition-colors">
        <ChevronLeft size={16} />
      </button>
      <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary text-white font-bold shadow-md">
        1
      </button>
      <button className="flex items-center justify-center rounded-lg h-10 w-10 border border-[#e2e8f0] bg-white text-[#101818] hover:border-primary hover:text-primary transition-colors">
        2
      </button>
      <button className="flex items-center justify-center rounded-lg h-10 w-10 border border-[#e2e8f0] bg-white text-[#101818] hover:border-primary hover:text-primary transition-colors">
        3
      </button>
      <span className="text-[#64748b]">...</span>
      <button className="flex items-center justify-center rounded-lg h-10 w-10 border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-primary hover:text-white transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default NewsPagination;
