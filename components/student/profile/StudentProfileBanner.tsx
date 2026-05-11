"use client";

import React, { useRef, useState } from "react";
import { Camera, Shield, GraduationCap, Loader2 } from "lucide-react";
import { useUploadStudentAvatar } from "@/hooks/profile.hooks";
import { toast } from "@/store/toast.store";

interface StudentProfileBannerProps {
  firstName: string;
  lastName: string;
  studentId: string;
  currentClass: string;
  profileId: string;
  avatarUrl: string | null;
}

const StudentProfileBanner: React.FC<StudentProfileBannerProps> = ({
  firstName,
  lastName,
  studentId,
  currentClass,
  profileId,
  avatarUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const { mutate: uploadAvatar, isPending } = useUploadStudentAvatar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid File', 'Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File Too Large', 'Please select an image under 5MB.');
      return;
    }

    // Optimistic preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    uploadAvatar(
      { file, profileId },
      {
        onSuccess: () => toast.success('Photo Updated', 'Profile photo saved successfully.'),
        onError: () => {
          setPreview(avatarUrl);
          toast.error('Upload Failed', 'Could not save profile photo. Try again.');
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#006442]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
            <img
              src={preview || '/no-profile.png'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="absolute bottom-1 right-1 w-8 h-8 bg-[#006442] hover:bg-[#005236] disabled:opacity-70 text-white rounded-full flex items-center justify-center transition-all shadow-lg border-2 border-white active:scale-95"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {isPending && (
          <span className="text-xs text-gray-400 font-medium">Uploading…</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-6 relative z-10 w-full text-center md:text-left">
        <div>
          <h2 className="text-2xl font-black text-[#000000] leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-500 font-medium">Student</p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f9f8] text-[#0e2e1d] rounded-lg border border-gray-100">
            <Shield size={14} className="text-[#006442]" />
            <span className="text-xs font-bold tracking-tight">{studentId}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e2e1d]/5 text-[#0e2e1d] rounded-lg border border-[#0e2e1d]/10">
            <GraduationCap size={14} className="text-[#0e2e1d]" />
            <span className="text-xs font-bold tracking-tight">{currentClass}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBanner;
