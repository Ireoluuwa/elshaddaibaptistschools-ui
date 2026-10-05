"use client";

import React, { useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import PasswordPanel from "@/components/admin/profile/PasswordPanel";
import { inputClass, labelClass, panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useStaffProfile, useUpdateStaffProfile } from "@/hooks/profile.hooks";
import { storageService } from "@/services/storage.service";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import { STAFF_TITLES, type StaffProfile, type UpdateStaffProfilePayload } from "@/types/staff-profile.types";

type Form = { title: string; firstName: string; lastName: string; position: string; email: string; phoneNumber: string };

const toForm = (p: StaffProfile): Form => ({
  title: p.title ?? "",
  firstName: p.firstName,
  lastName: p.lastName,
  position: p.position ?? "",
  email: p.email ?? "",
  phoneNumber: p.phoneNumber ?? "",
});

function DetailsForm({ profile, showPosition }: { profile: StaffProfile; showPosition: boolean }) {
  const update = useUpdateStaffProfile();
  const initial = toForm(profile);
  const [form, setForm] = useState(initial);
  const set = (key: keyof Form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  // Names are always sent as text; other fields clear to null when emptied.
  const changes = Object.fromEntries(
    (Object.keys(form) as (keyof Form)[])
      .filter((key) => form[key].trim() !== initial[key])
      .map((key) => {
        const value = form[key].trim();
        return [key, key === "firstName" || key === "lastName" ? value : value || null];
      }),
  ) as UpdateStaffProfilePayload;
  const hasChanges = Object.keys(changes).length > 0;
  const valid = !!form.firstName.trim();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update.mutateAsync(changes);
      toast.success("Profile saved");
    } catch (err) {
      toast.error("Couldn't save profile", apiErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSave} className="px-6 py-5 flex flex-col gap-4">
      <div className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)] gap-3">
        <div>
          <label htmlFor="title" className={labelClass}>Title</label>
          <select id="title" value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass}>
            <option value="">—</option>
            {STAFF_TITLES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="first-name" className={labelClass}>First name</label>
          <input id="first-name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="last-name" className={labelClass}>Last name</label>
          <input id="last-name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputClass} />
        </div>
      </div>

      {showPosition && (
        <div>
          <label htmlFor="position" className={labelClass}>Position</label>
          <input
            id="position"
            value={form.position}
            onChange={(e) => set("position", e.target.value)}
            placeholder="e.g. Vice Principal"
            className={inputClass}
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="phone" type="tel" value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <span className={labelClass}>Username</span>
        <p className="h-10 px-3 flex items-center rounded-lg bg-canvas text-sm text-muted tabular-nums">{profile.username}</p>
        <p className="text-xs text-muted mt-1.5">
          {profile.role === "admin" ? "Usernames can't be changed here." : "Only the admin can change your username."}
        </p>
      </div>

      <div className="flex justify-end pt-1">
        <button type="submit" disabled={!hasChanges || !valid || update.isPending} className={primaryButton}>
          {update.isPending && <Loader2 size={16} className="animate-spin" />}
          Save details
        </button>
      </div>
    </form>
  );
}

function SignatureSection({ profile }: { profile: StaffProfile }) {
  const update = useUpdateStaffProfile();
  const [uploading, setUploading] = useState(false);
  const busy = uploading || update.isPending;

  const handleFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const signatureUrl = await storageService.uploadSignature(file, `staff-${profile.username}`);
      await update.mutateAsync({ signatureUrl });
      toast.success("Signature updated");
    } catch (err) {
      toast.error("Couldn't update signature", apiErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      await update.mutateAsync({ signatureUrl: null });
      toast.info("Signature removed");
    } catch (err) {
      toast.error("Couldn't remove signature", apiErrorMessage(err));
    }
  };

  const fileInput = (
    <input type="file" accept="image/*" className="sr-only" disabled={busy} onChange={(e) => handleFile(e.target.files?.[0])} />
  );

  return (
    <section className={panelClass}>
      <header className="px-6 py-4 border-b border-line">
        <h2 className="font-semibold text-ink">Signature</h2>
        <p className="text-sm text-muted mt-0.5">
          Saved here so you can add it to each term&apos;s report sheets in Sessions &amp; Terms with one click.
        </p>
      </header>
      <div className="px-6 py-5">
        {busy ? (
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" /> Saving…
          </p>
        ) : profile.signatureUrl ? (
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-20 w-56 rounded-lg border border-line bg-white flex items-center justify-center px-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- storage URL */}
              <img src={profile.signatureUrl} alt="Your signature" className="max-h-16 max-w-full object-contain" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <label className="font-medium text-brand hover:underline underline-offset-2 cursor-pointer">
                Replace
                {fileInput}
              </label>
              <button onClick={handleRemove} className="font-medium text-danger hover:underline underline-offset-2">
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center gap-1.5 px-4 py-8 rounded-lg border border-dashed border-muted/40 hover:border-brand hover:bg-tint cursor-pointer text-center transition-colors">
            <ImageUp size={20} className="text-brand" />
            <span className="text-sm font-medium text-ink">Upload your signature</span>
            <span className="text-xs text-muted">Sign on white paper and take a clear photo, or use a PNG with a transparent background</span>
            {fileInput}
          </label>
        )}
      </div>
    </section>
  );
}

// Profile page for admins and bursars.
export default function StaffProfileView({ role }: { role: "admin" | "bursar" }) {
  const { data: profile, isLoading, isError, refetch } = useStaffProfile();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <PageHeader title="Profile" description="Your details and password." />
        <div className={`${panelClass} h-24 animate-pulse`} />
        <div className={`${panelClass} h-72 animate-pulse`} />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <PageHeader title="Profile" description="Your details and password." />
        <div className={`${panelClass} px-5 py-12 text-center text-sm text-muted`}>
          Couldn&apos;t load your profile.{" "}
          <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const fullName = [profile.title, profile.firstName, profile.lastName].filter(Boolean).join(" ");
  const initials =
    `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase() || profile.username[0]?.toUpperCase();
  const roleLabel = role === "admin" ? profile.position || "Administrator" : "Bursar";

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Profile"
        description={role === "admin" ? "Your details, signature and password." : "Your details and password."}
      />

      <section className={`${panelClass} px-6 py-5 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center text-lg font-bold shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-ink truncate">{fullName || "Add your name below"}</p>
          <p className="text-sm text-muted">
            {roleLabel} · signed in as <span className="font-medium text-ink tabular-nums">{profile.username}</span>
          </p>
        </div>
      </section>

      {role === "bursar" && (
        <p className="text-sm text-ink px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
          Still using the temporary password the admin gave you? Change it below so only you know it.
        </p>
      )}

      <section className={panelClass}>
        <header className="px-6 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Personal details</h2>
        </header>
        <DetailsForm key={JSON.stringify(profile)} profile={profile} showPosition={role === "admin"} />
      </section>

      {role === "admin" && <SignatureSection profile={profile} />}

      <PasswordPanel />
    </div>
  );
}
