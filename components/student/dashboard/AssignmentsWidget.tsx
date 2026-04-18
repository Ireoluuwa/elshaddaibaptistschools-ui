"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const mockAssignments = [
  {
    id: 1,
    title: "Algebraic Equations Practice",
    dueDate: "Tomorrow, 8:00 AM",
  },
  {
    id: 2,
    title: "Kinematics Lab Report",
    dueDate: "Oct 24, 11:59 PM",
  },
  {
    id: 3,
    title: "Cell Structure Quiz Prep",
    dueDate: "Oct 22, 10:00 AM",
  },
];

const AssignmentsWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-emerald-600" size={20} />
          Latest Assignments
        </h2>
        <Link
          href="/portal/student/assignments"
          className="text-xs font-bold text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {mockAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="group cursor-pointer border-l-2 border-transparent hover:border-emerald-500 pl-3 -ml-3 transition-all"
          >
            <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-emerald-700 transition-colors">
              {assignment.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1.5">
              <Clock size={12} /> Due: <span className={assignment.dueDate.includes("Tomorrow") ? "text-orange-600 font-bold" : ""}>{assignment.dueDate}</span>
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignmentsWidget;
