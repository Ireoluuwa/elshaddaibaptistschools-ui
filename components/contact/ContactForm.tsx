import React from "react";
import { ChevronDown, Send } from "lucide-react";
import { contactForm } from "@/constants/contact";

const ContactForm = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#eaf1f1] shadow-sm">
      <h2 className="text-2xl font-bold text-text-main mb-6">{contactForm.title}</h2>
      <form className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-main" htmlFor="name">Full Name</label>
            <input 
              className="w-full h-12 px-4 rounded-lg bg-[#f6f8f8] border border-[#eaf1f1] text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-[#64748b]/50" 
              id="name" 
              placeholder="John Doe" 
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-main" htmlFor="phone">Phone Number</label>
            <input 
              className="w-full h-12 px-4 rounded-lg bg-[#f6f8f8] border border-[#eaf1f1] text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-[#64748b]/50" 
              id="phone" 
              placeholder="+234 ..." 
              type="tel"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="email">Email Address</label>
          <input 
            className="w-full h-12 px-4 rounded-lg bg-[#f6f8f8] border border-[#eaf1f1] text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-[#64748b]/50" 
            id="email" 
            placeholder="john@example.com" 
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="subject">Subject</label>
          <div className="relative">
            <select 
              className="w-full h-12 px-4 rounded-lg bg-[#f6f8f8] border border-[#eaf1f1] text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer" 
              id="subject"
              defaultValue=""
            >
              <option disabled value="">Select a topic</option>
              {contactForm.subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>{subject.label}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748b]">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-main" htmlFor="message">Message</label>
          <textarea 
            className="w-full p-4 rounded-lg bg-[#f6f8f8] border border-[#eaf1f1] text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-[#64748b]/50" 
            id="message" 
            placeholder="How can we help you?" 
            rows={5}
          ></textarea>
        </div>
        <div className="mt-2">
          <button 
            className="w-full sm:w-auto min-w-[160px] h-12 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2" 
            type="button"
          >
            <span>{contactForm.buttonText}</span>
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
