"use client";

import React, { useState } from "react";
import { ImageUp } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import PasswordPanel from "@/components/admin/profile/PasswordPanel";
import {
  inputClass,
  labelClass,
  panelClass,
  primaryButton,
} from "@/components/admin/shared/AdminModal";
import { useProfileQuery } from "@/hooks/auth.hooks";
import { toast } from "@/store/toast.store";

const titles = ["Mr", "Mrs", "Miss", "Dr", "Pastor", "Rev"];

// TEMPORARY: there's no admin profile record on the backend yet.
const initialDetails = {
  title: "Mrs",
  firstName: "",
  lastName: "",
  position: "Vice Principal",
  email: "",
  phone: "",
};

export default function AdminProfilePage() {
  const { data: account } = useProfileQuery();
  const [details, setDetails] = useState(initialDetails);
  const [savedDetails, setSavedDetails] = useState(initialDetails);
  const [signatureUrl, setSignatureUrl] = useState("");

  const set = (key: keyof typeof details, value: string) =>
    setDetails((d) => ({ ...d, [key]: value }));

  const dirty = JSON.stringify(details) !== JSON.stringify(savedDetails);
  const fullName = [details.title, details.firstName, details.lastName].filter(Boolean).join(" ");
  const initials =
    `${details.firstName[0] ?? ""}${details.lastName[0] ?? ""}`.toUpperCase() ||
    account?.username?.[0]?.toUpperCase() ||
    "A";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: PATCH /profile/admin once the endpoint exists.
    setSavedDetails(details);
    toast.success("Profile saved");
  };

  // TODO: upload to storage once the backend endpoint exists; a data URL is enough to preview.
  const handleSignature = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureUrl(reader.result as string);
      toast.success("Signature updated");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <PageHeader title="Profile" description="Your details, signature and password." />

      {/* Identity */}
      <section className={`${panelClass} px-6 py-5 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center text-lg font-bold shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-ink truncate">{fullName || "Add your name below"}</p>
          <p className="text-sm text-muted">
            {details.position || "Administrator"} · signed in as{" "}
            <span className="font-medium text-ink">{account?.username ?? "—"}</span>
          </p>
        </div>
      </section>

      {/* Details */}
      <section className={panelClass}>
        <header className="px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Personal details</h2>
        </header>
        <form onSubmit={handleSave} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-[100px_minmax(0,1fr)] sm:grid-cols-[100px_minmax(0,1fr)_minmax(0,1fr)] gap-3">
            <div>
              <label htmlFor="title" className={labelClass}>Title</label>
              <select id="title" value={details.title} onChange={(e) => set("title", e.target.value)} className={inputClass}>
                {titles.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="first-name" className={labelClass}>First name</label>
              <input id="first-name" value={details.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="last-name" className={labelClass}>Last name</label>
              <input id="last-name" value={details.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="position" className={labelClass}>Position</label>
            <input
              id="position"
              value={details.position}
              onChange={(e) => set("position", e.target.value)}
              placeholder="e.g. Vice Principal"
              className={inputClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="email" type="email" value={details.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="phone" type="tel" value={details.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <span className={labelClass}>Username</span>
            <p className="h-10 px-3 flex items-center rounded-lg bg-canvas text-sm text-muted">
              {account?.username ?? "—"}
            </p>
            <p className="text-xs text-muted mt-1.5">Your username can&apos;t be changed.</p>
          </div>

          <div className="flex justify-end pt-1">
            <button type="submit" disabled={!dirty} className={primaryButton}>
              Save details
            </button>
          </div>
        </form>
      </section>

      {/* Signature */}
      <section className={panelClass}>
        <header className="px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Signature</h2>
          <p className="text-sm text-muted mt-0.5">
            Printed on report sheets. You can still use a different one for a specific term in Sessions & Terms.
          </p>
        </header>
        <div className="px-6 py-5">
          {signatureUrl ? (
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-20 w-56 rounded-lg border border-line bg-white flex items-center justify-center px-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview */}
                <img src={signatureUrl} alt="Your signature" className="max-h-16 max-w-full object-contain" />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <label className="font-medium text-brand hover:underline underline-offset-2 cursor-pointer">
                  Replace
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleSignature(e.target.files?.[0])} />
                </label>
                <button onClick={() => setSignatureUrl("")} className="font-medium text-danger hover:underline underline-offset-2">
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-1.5 px-4 py-8 rounded-lg border border-dashed border-muted/40 hover:border-brand hover:bg-tint cursor-pointer text-center transition-colors">
              <ImageUp size={20} className="text-brand" />
              <span className="text-sm font-medium text-ink">Upload your signature</span>
              <span className="text-xs text-muted">Sign on white paper and take a clear photo, or use a PNG with a transparent background</span>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleSignature(e.target.files?.[0])} />
            </label>
          )}
        </div>
      </section>

      <PasswordPanel />
    </div>
  );
}
