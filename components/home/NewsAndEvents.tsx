import React from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

const NewsAndEvents = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-secondary text-2xl font-bold">
                Latest News
              </h2>
              <a
                className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                href="#"
              >
                View All <ArrowRight size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    alt="Students debating on stage with microphones"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyFqhRK0NUEKV2LFp8pwQUhL0WJ0Ft0PkwUoc2hwm3dAC_iPJIA1Xg02GuTYug6lDpdAV5h0xhHr-jDXBqJNlR6iwDor6MtrN1gkhBfI15a_vY4kWhbcE2GVPhDWPVsNfM5QfTZ1jvObfRAxyeGnFyeqMrfAabVrXaLSuYhffw46vIwn4D4q3JJ_VZ0uzpYMKL0-hQ849-yQ00wAQsXODYDMvqE6ugxYcQucv5UAJMKEYDOud6hvYdK8jlhSC_diRpdt4O-Ch-5Q"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Academic
                  </span>
                  <h3 className="text-secondary font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    School Wins Regional Debate Competition
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    Our senior debate team took home the first prize trophy at
                    the Lagos State Inter-School Debate held last Friday.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    alt="Science laboratory equipment with colorful liquids"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLyZyWJgN0N-RG7ibHuVfisGVoV4a6j2atZcUKJyOEj7W4U-pi8vvIWFyBzZJ5vL3rc-UXPcY9n7j0Zr4Pa0gR8Aqzpd-HEI8i3n-vmGpoPaEC7kMwsD368-pQPx06kPFK0chSyTgdYFrWtGT4stHYVe8-Y40jI0TIgL-xNUvGAvmXqu76bdFNUMqmAx2j_6ONb5HwGCLpf_SDzG6Z82FXAD6-FHeyOUJ7CCefiGii1n6vbq5SjQfWmu2wMKtYTb-bwTliiTFO2Q"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Facilities
                  </span>
                  <h3 className="text-secondary font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    New Science Laboratory Inauguration
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    We are excited to announce the opening of our
                    state-of-the-art physics and chemistry labs, fully equipped
                    for practical learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-secondary text-2xl font-bold">
                Upcoming Events
              </h2>
              <a
                className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
                href="#"
              >
                Calendar <Calendar size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-primary/30 transition-colors">
                <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Oct
                  </span>
                  <span className="text-xl font-black text-primary">15</span>
                </div>
                <div>
                  <h3 className="text-secondary font-bold text-base">
                    Parent-Teacher Association Meeting
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                    <Clock size={14} className="text-gray-400" /> 10:00 AM
                    <MapPin size={14} className="text-gray-400 ml-1" /> School Hall
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-primary/30 transition-colors">
                <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Nov
                  </span>
                  <span className="text-xl font-black text-primary">03</span>
                </div>
                <div>
                  <h3 className="text-secondary font-bold text-base">
                    Annual Inter-House Sports
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                    <Clock size={14} className="text-gray-400" /> 09:00 AM
                    <MapPin size={14} className="text-gray-400 ml-1" /> Sports Complex
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-primary/30 transition-colors">
                <div className="shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Dec
                  </span>
                  <span className="text-xl font-black text-primary">12</span>
                </div>
                <div>
                  <h3 className="text-secondary font-bold text-base">
                    End of Year Party & Awards
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                    <Clock size={14} className="text-gray-400" /> 02:00 PM
                    <MapPin size={14} className="text-gray-400 ml-1" /> Main Auditorium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndEvents;
