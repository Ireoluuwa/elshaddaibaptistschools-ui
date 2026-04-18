import React from "react";
import * as Icons from "lucide-react";
import { contactDetails } from "@/constants/contact";

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6">
      {contactDetails.map((item: any, idx: number) => {
        const IconComponent = (Icons as any)[item.icon];
        return (
          <div key={idx} className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary shrink-0">
              {IconComponent && <IconComponent size={24} />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-1">{item.title}</h3>
              <div className="text-[#64748b] leading-relaxed">
                {item.details.map((line: string, lineIdx: number) => (
                  <p key={lineIdx}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
