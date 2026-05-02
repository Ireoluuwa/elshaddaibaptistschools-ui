"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { TeacherProfile } from "@/types";
import { useUpdateTeacherProfile } from "@/hooks/profile.hooks";

interface TeacherProfileDetailsFormProps {
  profile: TeacherProfile;
}

export default function TeacherProfileDetailsForm({ profile }: TeacherProfileDetailsFormProps) {
  const { mutate: updateProfile, isPending, isSuccess, isError, error } = useUpdateTeacherProfile();
  
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    address: profile.address || "",
    email: profile.email || "",
    phoneNumber: profile.phoneNumber || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-[#0e2e1d] text-lg font-bold mb-1">Profile Details</h2>
        <p className="text-gray-400 text-xs">Update your personal and contact information.</p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-10 flex-1">
        
        {/* Personal Details Section */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">Home Address</label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-5">
          <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#006442] focus:ring-2 focus:ring-[#006442]/20 outline-none transition-all text-sm text-[#0e2e1d]"
              />
            </div>
          </div>
        </div>

        {isError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs">
            <AlertCircle size={16} />
            <p>{(error as any)?.response?.data?.message || "Failed to update profile. Please try again."}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 mt-auto">
          <button
            type="submit"
            disabled={isPending}
            className="h-11 px-6 bg-[#006442] hover:bg-[#005236] disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 min-w-[140px]"
          >
            {isPending ? (
              <Loader2 size={18} className="animate-spin mr-2" />
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={18} className="mr-2 text-emerald-300" />
                Saved
              </>
            ) : (
              "Save Details"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
