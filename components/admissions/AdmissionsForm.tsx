"use client";

import { useState } from "react";

const levels = [
  "Nursery", "Kindergarten",
  "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6",
  "JSS 1", "JSS 2", "JSS 3",
  "SSS 1", "SSS 2", "SSS 3",
];

const steps = [
  { n: "01", title: "Submit Application", desc: "Fill the form below and submit. Attach any relevant documents." },
  { n: "02", title: "Document Review", desc: "Our team reviews your application within 3–5 working days." },
  { n: "03", title: "Entrance Assessment", desc: "Eligible candidates are invited for a short written assessment." },
  { n: "04", title: "Offer & Enrolment", desc: "Successful applicants receive an offer letter and complete enrolment." },
];

const faqs = [
  { q: "When do admissions open?", a: "Admissions open in October each year for the following session starting in September." },
  { q: "Is there an entrance exam?", a: "Yes. Primary, JSS, and SSS applicants sit a short English and Maths assessment. Nursery/KG pupils have a simple observation session." },
  { q: "Are scholarships available?", a: "Merit-based scholarships are available for outstanding students entering JSS1 and SS1. Contact us for details." },
  { q: "Can my child apply mid-session?", a: "Mid-session transfers are considered on a case-by-case basis subject to available space." },
  { q: "How are school fees paid?", a: "Fees are paid termly. A detailed fee schedule is provided on admission — contact us for more info." },
];

export default function AdmissionsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-white">

      {/* Page header */}
      <div className="bg-secondary py-16 px-6 text-center">
        <h1 className="text-white text-2xl md:text-5xl font-black">Apply for Admission</h1>
        <p className="text-green-100 mt-2 text-sm md:text-base max-w-xl mx-auto">Fill in the form below and our team will be in touch within 3 working days.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 space-y-20">

        {/* ── FORM ── */}
        <section>
          {submitted ? (
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-secondary text-2xl font-bold mb-2">Application Received</h2>
              <p className="text-gray-500 text-sm">Thank you — we'll be in touch shortly.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-primary text-sm font-semibold hover:underline">
                Submit another application
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-secondary text-2xl font-bold mb-8">Application Form</h2>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">

                <fieldset className="space-y-4">
                  <legend className="text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100 w-full">Student Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-400">*</span></label>
                      <input required type="text" placeholder="e.g. Chidi" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-400">*</span></label>
                      <input required type="text" placeholder="e.g. Okafor" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth <span className="text-red-400">*</span></label>
                      <input required type="date" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Applying For <span className="text-red-400">*</span></label>
                      <select required className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition bg-white">
                        <option value="">Select a class</option>
                        {levels.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100 w-full">Parent / Guardian</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                      <input required type="text" placeholder="e.g. Mr. Emmanuel Okafor" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                      <input required type="tel" placeholder="0801 234 5678" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" placeholder="parent@email.com" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous School <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input type="text" placeholder="Name of last school attended" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Information <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea rows={3} placeholder="Any questions or details you'd like us to know..." className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition resize-none" />
                </div>

                <button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all active:scale-[0.98] text-base">
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </section>

        {/* ── PROCESS ── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-secondary text-2xl font-bold mb-8">How It Works</h2>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-primary text-xs font-black">
                  {s.n}
                </div>
                <div className="pt-1.5">
                  <p className="text-secondary font-semibold text-sm">{s.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-secondary text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="divide-y divide-gray-100">
            {faqs.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4"
                >
                  <span className="text-secondary font-medium text-sm">{item.q}</span>
                  <span className={`text-primary text-lg font-light transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <p className="text-gray-500 text-sm pb-4 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
