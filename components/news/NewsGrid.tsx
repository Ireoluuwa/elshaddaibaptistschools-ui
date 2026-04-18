import React from "react";
import Link from "next/link";
import { regularPosts } from "@/constants/news";

const NewsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {regularPosts.map((post, idx) => (
        <article key={idx} className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
          <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
            <div 
              className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105" 
              aria-label={post.imageAlt}
              style={{ backgroundImage: `url('${post.image}')` }}
            />
          </div>
          <div className="p-5 flex flex-col flex-grow gap-3">
            <span className="w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
              {post.tag}
            </span>
            <h3 className="text-xl font-bold text-primary leading-tight">
              {post.title}
            </h3>
            <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3 flex-grow">
              {post.description}
            </p>
            <Link href={post.link} className="text-primary font-bold text-sm hover:underline mt-2">
              {post.linkText}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsGrid;
