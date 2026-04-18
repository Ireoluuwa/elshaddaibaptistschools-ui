"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const mockAssignments = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Algebraic Equations Practice",
    dueDate: "Tomorrow, 8:00 AM",
    status: "pending",
    color: "bg-orange-500",
  },
  {
    id: 2,
    subject: "Physics",
    title: "Kinematics Lab Report",
    dueDate: "Oct 24, 11:59 PM",
    status: "pending",
    color: "bg-blue-500",
  },
  {
    id: 3,
    subject: "Biology",
    title: "Cell Structure Quiz Prep",
    dueDate: "Oct 22, 10:00 AM",
    status: "completed",
    color: "bg-emerald-500",
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

      <div className="flex-1 flex flex-col gap-3">
        {mockAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
          >
            <div className="pt-0.5">
              {assignment.status === "completed" ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <Circle className="text-gray-300" size={20} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`w-2 h-2 rounded-full ${assignment.color}`} />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  {assignment.subject}
                </p>
              </div>
              <h3 className="text-sm font-bold text-gray-900 truncate pr-4">
                {assignment.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1.5">
                Due: <span className={assignment.status === "pending" && assignment.dueDate.includes("Tomorrow") ? "text-orange-600 font-bold" : ""}>{assignment.dueDate}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignmentsWidget;
