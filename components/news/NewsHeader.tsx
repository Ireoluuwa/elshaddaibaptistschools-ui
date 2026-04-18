import React from "react";
import { newsHeader } from "@/constants/news";

const NewsHeader = () => {
  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-[#e2e8f0]">
      <h1 className="text-secondary text-4xl lg:text-5xl font-black leading-tight tracking-tight">
        {newsHeader.title}
      </h1>
      <p className="text-[#64748b] text-lg font-normal">
        {newsHeader.subtitle}
      </p>
    </div>
  );
};

export default NewsHeader;
