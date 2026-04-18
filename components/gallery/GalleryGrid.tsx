import React from "react";
import { galleryItems } from "@/constants/gallery";
import { Maximize2, RotateCw } from "lucide-react";

interface GalleryItemProps {
  image: string;
  title: string;
  category: string;
  colSpan?: string;
  rowSpan?: string;
  isLarge?: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ 
  image, 
  title, 
  category, 
  colSpan = "", 
  rowSpan = "",
  isLarge = false 
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border-4 border-white ${colSpan} ${rowSpan}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${isLarge ? 'opacity-70' : 'opacity-40'} transition-opacity duration-300 group-hover:opacity-90`} />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
        <span className="mb-3 inline-block rounded-full bg-primary/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
          {category}
        </span>
        <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-white leading-tight`}>
          {title}
        </h3>
      </div>
      
      <div className="absolute right-6 top-6 flex size-12 translate-y-[-20px] items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-white border border-white/30">
        <Maximize2 size={24} />
      </div>
    </div>
  );
};

const GalleryGrid = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-20 pb-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[280px]">
        {galleryItems.map((item, idx) => (
          <GalleryItem key={idx} {...item} />
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <button className="flex h-14 min-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-secondary px-8 text-white text-base font-black tracking-widest transition-all hover:bg-primary hover:rotate-1 hover:shadow-xl shadow-primary/20 group">
          <RotateCw size={24} className="mr-3 transition-transform group-hover:rotate-180 duration-500" />
          <span>LOAD MORE MEMORIES</span>
        </button>
      </div>
    </section>
  );
};

export default GalleryGrid;
