import React from "react";
import { School, Users, Trophy } from "lucide-react";

const Features = () => {
  return (
    <div className="w-full bg-bg-accent-subtle/30 dark:bg-background-dark py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Why Choose Us
            </span>
            <h2 className="text-secondary dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Our Core Values
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-md">
            We are dedicated to providing a holistic education that balances
            academic rigor with moral integrity and community service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c252b] p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white transition-colors">
              <School size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-secondary dark:text-white text-xl font-bold">
                Academic Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Our curriculum is designed to challenge students and foster
                critical thinking, preparing them for top universities locally
                and abroad.
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c252b] p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white transition-colors">
              <Users size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-secondary dark:text-white text-xl font-bold">
                Moral Integrity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We build strong character through discipline and guidance,
                ensuring our students become responsible citizens of Nigeria.
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c252b] p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white transition-colors">
              <Trophy size={28} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-secondary dark:text-white text-xl font-bold">
                Sports & Creativity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Beyond the classroom, we nurture talents in arts, music, and
                athletics, fostering a well-rounded development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
