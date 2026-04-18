import React from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactMap from "@/components/contact/ContactMap";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8f8] text-[#101818] font-display antialiased transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-10 py-10 md:py-16">
        <ContactHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <ContactDetails />
            <ContactMap />
          </div>
          
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
