import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { featuredPost } from "@/constants/news";
import Link from "next/link";

const FeaturedArticle = () => {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl border border-transparent">
      <div className="aspect-video w-full overflow-hidden">
        <div 
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          aria-label={featuredPost.imageAlt}
          style={{ backgroundImage: `url('${featuredPost.image}')` }}
        />
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {featuredPost.tag}
          </span>
          <span className="text-sm text-[#64748b] flex items-center gap-1">
            <Calendar size={16} /> {featuredPost.date}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
          {featuredPost.title}
        </h2>
        <p className="text-[#101818] text-base leading-relaxed line-clamp-3">
          {featuredPost.description}
        </p>
        <Link href={featuredPost.link} className="inline-flex items-center text-primary font-bold text-sm hover:underline mt-2 group-hover:translate-x-1 transition-transform">
          {featuredPost.linkText} <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default FeaturedArticle;
