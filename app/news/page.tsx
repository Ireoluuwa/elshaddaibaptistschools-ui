import React from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NewsHeader from "@/components/news/NewsHeader";
import FeaturedArticle from "@/components/news/FeaturedArticle";
import NewsGrid from "@/components/news/NewsGrid";
import NewsPagination from "@/components/news/NewsPagination";
import NewsSidebar from "@/components/news/NewsSidebar";

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8f8] text-[#101818] font-display antialiased transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <NewsHeader />
            <FeaturedArticle />
            <NewsGrid />
            <NewsPagination />
          </div>
          <NewsSidebar />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
