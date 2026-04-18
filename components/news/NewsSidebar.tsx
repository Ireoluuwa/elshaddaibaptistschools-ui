import React from "react";
import { Search, Tags, Clock, Mail } from "lucide-react";
import { sidebarCategories, recentPosts } from "@/constants/news";
import Link from "next/link";

const NewsSidebar = () => {
  return (
    <aside className="lg:col-span-4 space-y-8">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-primary mb-4">Search News</h3>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#64748b]">
            <Search size={20} />
          </span>
          <input 
            className="w-full rounded-lg border-0 bg-[#f6f8f8] py-3 pl-10 pr-4 text-[#101818] placeholder:text-[#64748b] focus:ring-2 focus:ring-primary focus:ring-opacity-50" 
            placeholder="Type keywords..." 
            type="text"
          />
        </label>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center justify-between">
          Categories
          <Tags size={20} className="text-[#64748b]" />
        </h3>
        <ul className="space-y-3">
          {sidebarCategories.map((cat: any, idx: number) => (
            <li key={idx}>
              <Link href={cat.link} className="group flex items-center justify-between rounded-lg p-2 hover:bg-[#f6f8f8] transition-colors">
                <span className="text-[#101818] font-medium group-hover:text-primary">{cat.name}</span>
                <span className="text-xs font-bold text-[#64748b] bg-[#e2e8f0] px-2 py-1 rounded-full">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center justify-between">
          Recent Posts
          <Clock size={20} className="text-[#64748b]" />
        </h3>
        <div className="flex flex-col gap-4">
          {recentPosts.map((post: any, idx: number) => (
            <Link key={idx} href={post.link} className="group flex gap-4 items-start">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110" 
                  aria-label={post.imageAlt}
                  style={{ backgroundImage: `url('${post.image}')` }}
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-[#101818] line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <span className="text-xs text-[#64748b] mt-1">{post.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-primary/10 p-6 border border-primary/20">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Mail size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">Newsletter</span>
        </div>
        <h3 className="text-lg font-bold text-primary mb-2">Don't miss an update</h3>
        <p className="text-sm text-[#64748b] mb-4">Subscribe to our weekly newsletter for parents and guardians.</p>
        <form className="flex flex-col gap-2">
          <input 
            className="w-full rounded-lg border-0 bg-white py-2 px-3 text-[#101818] placeholder:text-[#64748b] text-sm" 
            placeholder="Email address" 
            type="email"
          />
          <button className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary/90 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
};

export default NewsSidebar;
