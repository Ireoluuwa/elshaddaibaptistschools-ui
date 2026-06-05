"use client";

import { useState } from "react";

const levels = [
  "Nursery",
  "Kindergarten",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SSS 1",
  "SSS 2",
  "SSS 3",
];

const AdmissionsForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="text-primary text-sm font-bold uppercase tracking-wider">Admissions 2025 / 2026</span>
          <h1 className="text-secondary text-3xl md:text-4xl font-black mt-2">Apply for Admission</h1>
          <p className="text-gray-500 mt-3">Fill in the details below and our team will get back to you within 3 working days.</p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-secondary text-2xl font-bold mb-2">Application Received</h2>
            <p className="text-gray-500">Thank you for applying to El-Shaddai Baptist Schools. We'll be in touch shortly.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-primary text-sm font-semibold hover:underline"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 space-y-6">

            {/* Student details */}
            <div>
              <h2 className="text-secondary font-bold text-base mb-4 pb-2 border-b border-gray-100">Student Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-400">*</span></label>
                  <input required type="text" placeholder="e.g. Chidi" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-400">*</span></label>
                  <input required type="text" placeholder="e.g. Okafor" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth <span className="text-red-400">*</span></label>
                  <input required type="date" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Applying For <span className="text-red-400">*</span></label>
                  <select required className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-white">
                    <option value="">Select a class</option>
                    {levels.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Parent / Guardian */}
            <div>
              <h2 className="text-secondary font-bold text-base mb-4 pb-2 border-b border-gray-100">Parent / Guardian</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input required type="text" placeholder="e.g. Mr. Emmanuel Okafor" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <input required type="tel" placeholder="e.g. 0801 234 5678" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" placeholder="e.g. parent@email.com" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>
              </div>
            </div>

            {/* Previous school */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous School <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="text" placeholder="Name of last school attended" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Information <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea rows={3} placeholder="Any questions or extra details you'd like us to know..." className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none" />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-sm text-base"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdmissionsForm;
