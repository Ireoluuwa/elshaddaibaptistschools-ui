"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useChangePassword } from "@/hooks/profile.hooks";
import { inputClass, labelClass, panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { toast } from "@/store/toast.store";

const MIN_LENGTH = 6;

export default function PasswordPanel() {
  const { mutate: changePassword, isPending } = useChangePassword();
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const tooShort = form.newPassword.length > 0 && form.newPassword.length < MIN_LENGTH;
  const mismatch = form.confirmPassword.length > 0 && form.confirmPassword !== form.newPassword;
  const canSubmit =
    form.newPassword.length >= MIN_LENGTH && form.newPassword === form.confirmPassword && !isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    changePassword(form, {
      onSuccess: () => {
        setForm({ newPassword: "", confirmPassword: "" });
        toast.success("Password changed", "Use your new password next time you sign in.");
      },
      onError: (err) => {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
        setError(message || "Couldn't change your password. Please try again.");
      },
    });
  };

  return (
    <section className={panelClass}>
      <header className="px-6 py-4 border-b border-line">
        <h2 className="font-semibold text-ink">Password</h2>
        <p className="text-sm text-muted mt-0.5">Use at least {MIN_LENGTH} characters.</p>
      </header>
      <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
        <div>
          <label htmlFor="new-password" className={labelClass}>New password</label>
          <div className="relative">
            <input
              id="new-password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={form.newPassword}
              onChange={(e) => update("newPassword", e.target.value)}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted hover:text-ink"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {tooShort && (
            <p className="text-xs text-clay mt-1.5">
              {MIN_LENGTH - form.newPassword.length} more character
              {MIN_LENGTH - form.newPassword.length === 1 ? "" : "s"} needed
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClass}>Confirm new password</label>
          <input
            id="confirm-password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            className={inputClass}
          />
          {mismatch && <p className="text-xs text-clay mt-1.5">Passwords don&apos;t match</p>}
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex justify-end pt-1">
          <button type="submit" disabled={!canSubmit} className={primaryButton}>
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Saving…" : "Change password"}
          </button>
        </div>
      </form>
    </section>
  );
}
