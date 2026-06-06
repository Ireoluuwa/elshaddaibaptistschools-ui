import React from "react";
import { contactMap } from "@/constants/contact";

const ContactMap = () => {
  return (
    <div className="w-full h-[300px] lg:h-full min-h-[300px] rounded-xl overflow-hidden shadow-sm border border-[#eaf1f1]">
      <iframe
        src={contactMap.embedSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={contactMap.schoolName}
      />
    </div>
  );
};

export default ContactMap;
