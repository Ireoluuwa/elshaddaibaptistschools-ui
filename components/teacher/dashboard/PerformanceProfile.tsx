"use client";

import React from "react";
import { profileActions } from "@/constants/teacher/dashboard.constants";
import ActionCard from "./ActionCard";
import CBTCard from "./CBTCard";

const PerformanceProfile = () => {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#006442] rounded-full" />
        Performance & Profile
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {profileActions.map((action) => (
          <ActionCard key={action.name} action={action} />
        ))}
        <CBTCard />
      </div>
    </section>
  );
};

export default PerformanceProfile;
