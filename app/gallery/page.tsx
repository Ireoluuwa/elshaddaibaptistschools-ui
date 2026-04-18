import React from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-secondary font-display antialiased transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full">
        <GalleryHeader />
        <GalleryFilters />
        <GalleryGrid />
      </main>
      
      <Footer />
    </div>
  );
}
