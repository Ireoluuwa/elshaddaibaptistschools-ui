import React from "react";
import { contactMap } from "@/constants/contact";

const ContactMap = () => {
  return (
    <div className="w-full h-[300px] lg:h-full min-h-[300px] rounded-xl overflow-hidden shadow-sm border border-[#eaf1f1] relative group">
      <div 
        className="w-full h-full bg-cover bg-center" 
        style={{ backgroundImage: `url('${contactMap.image}')` }}
      />
      <div className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-md max-w-[200px]">
        <p className="text-xs font-bold text-text-main">{contactMap.schoolName}</p>
        <p className="text-[10px] text-[#64748b]">{contactMap.address}</p>
        <a className="text-[10px] text-blue-600 hover:underline mt-1 block" href={contactMap.mapLink}>
          View larger map
        </a>
      </div>
    </div>
  );
};

export default ContactMap;
