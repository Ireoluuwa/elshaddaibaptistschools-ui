import React from "react";
import { galleryHeader } from "@/constants/gallery";

const GalleryHeader = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-20 lg:py-16">
      <div className="flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-4xl font-black tracking-tight text-secondary sm:text-5xl lg:text-6xl uppercase">
          {galleryHeader.title}
        </h1>
        <p className="max-w-2xl text-lg text-[#64748b] leading-relaxed">
          {galleryHeader.description}
        </p>
      </div>
    </section>
  );
};

export default GalleryHeader;
