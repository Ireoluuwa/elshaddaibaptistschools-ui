import React from "react";
import { contactHeader } from "@/constants/contact";

const ContactHeader = () => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4 tracking-tight">
        {contactHeader.title}
      </h1>
      <p className="text-[#64748b] text-lg max-w-2xl">
        {contactHeader.description}
      </p>
    </div>
  );
};

export default ContactHeader;
