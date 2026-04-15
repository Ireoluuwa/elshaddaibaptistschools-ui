"use client";

import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  newsSection,
  eventsSection,
  newsData,
  eventsData,
} from "@/constants/home/newsAndEvents";

const NewsAndEvents = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-20"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          {/* News Section */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-secondary text-2xl font-bold">
                {newsSection.title}
              </h2>
              <a
                className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                href="#"
              >
                {newsSection.viewAllText} <ArrowRight size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-6">
              {newsData.map((item, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h3 className="text-secondary font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-secondary text-2xl font-bold">
                {eventsSection.title}
              </h2>
              <a
                className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                href="#"
              >
                {eventsSection.calendarText} <Calendar size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              {eventsData.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-primary/30 transition-colors"
                >
                  <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      {event.month}
                    </span>
                    <span className="text-xl font-black text-primary">
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-secondary font-bold text-base">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                      <Clock size={14} className="text-gray-400" /> {event.time}
                      <MapPin size={14} className="text-gray-400 ml-1" />{" "}
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsAndEvents;
