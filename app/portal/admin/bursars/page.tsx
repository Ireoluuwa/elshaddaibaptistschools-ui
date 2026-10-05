"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import InviteBursarModal, { InviteValues } from "@/components/admin/bursars/InviteBursarModal";
import CredentialsModal from "@/components/admin/bursars/CredentialsModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { mockBursars, mockTeachers } from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";
import type { AdminBursar, BursarStatus } from "@/types/admin.types";

const statusTone: Record<BursarStatus, "brand" | "clay" | "muted"> = {
  active: "brand",
  invited: "clay",
  disabled: "muted",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// Readable temporary password: no 0/O or 1/l/I to avoid mix-ups when shared by text.
const tempPassword = () => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint32Array(10));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_110px_150px_auto] items-center gap-x-4 gap-y-2";

const linkButton = "text-sm font-medium underline-offset-2 hover:underline";

type Credentials = { title: string; name: string; username: string; password: string };
type Pending = { kind: "disable" | "remove"; bursar: AdminBursar };

export default function AdminBursarsPage() {
  const [bursars, setBursars] = useState<AdminBursar[]>(mockBursars);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);

  // Usernames are shared across all staff accounts.
  const takenUsernames = [...bursars, ...mockTeachers].map((u) => u.username.toLowerCase());

  const update = (id: string, patch: Partial<AdminBursar>) =>
    setBursars((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const handleInvite = (values: InviteValues) => {
    // TODO: POST /admin/bursars — the server should generate and hash the password.
    const password = tempPassword();
    const username = values.username.trim().toLowerCase();
    setBursars((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        username,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim() || undefined,
        phoneNumber: values.phoneNumber.trim() || undefined,
        status: "invited",
        invitedAt: new Date().toISOString(),
      },
    ]);
    setInviteOpen(false);
    setCredentials({ title: "Account created", name: values.firstName.trim(), username, password });
  };

  const handleReset = (b: AdminBursar) => {
    // TODO: POST /admin/bursars/:id/reset-password
    setCredentials({
      title: "Password reset",
      name: b.firstName,
      username: b.username,
      password: tempPassword(),
    });
  };

  const handleConfirm = () => {
    if (!pending) return;
    const { kind, bursar } = pending;
    if (kind === "remove") {
      setBursars((prev) => prev.filter((b) => b.id !== bursar.id));
      toast.success("Bursar removed", `${bursar.firstName} ${bursar.lastName} can no longer sign in.`);
    } else {
      update(bursar.id, { status: "disabled" });
      toast.info("Account disabled", bursar.username);
    }
    setPending(null);
  };

  const enable = (b: AdminBursar) => {
    update(b.id, { status: b.lastSignIn ? "active" : "invited" });
    toast.success("Account enabled", b.username);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Bursars"
        description="Give bursary staff access to set bills and record school fees."
        action={
          <button onClick={() => setInviteOpen(true)} className={`${primaryButton} self-start`}>
            <Plus size={16} /> Invite bursar
          </button>
        }
      />

      <section className={`${panelClass} overflow-hidden`}>
        {bursars.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="font-semibold text-ink">No bursars yet</p>
            <p className="text-sm text-muted mt-1">Invite someone from the bursary to get started.</p>
            <button onClick={() => setInviteOpen(true)} className={`${primaryButton} mt-4`}>
              <Plus size={16} /> Invite bursar
            </button>
          </div>
        ) : (
          <>
            <div className={`${rowGrid} hidden sm:grid px-5 py-2 bg-canvas border-b border-line text-xs font-medium text-muted`}>
              <span>Bursar</span>
              <span>Status</span>
              <span>Last signed in</span>
              <span />
            </div>
            <ul className="divide-y divide-line">
              {bursars.map((b) => {
                const disabled = b.status === "disabled";
                return (
                  <li key={b.id} className={`${rowGrid} px-5 py-3.5`}>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${disabled ? "text-muted" : "text-ink"}`}>
                        {b.firstName} {b.lastName}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {b.username}
                        {(b.email || b.phoneNumber) && ` · ${b.email ?? b.phoneNumber}`}
                      </p>
                    </div>

                    <div className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-self-end sm:justify-self-start">
                      <StatusBadge tone={statusTone[b.status]}>{b.status}</StatusBadge>
                    </div>

                    <span className="hidden sm:block text-sm text-muted tabular-nums">
                      {b.lastSignIn ? formatDate(b.lastSignIn) : `Invited ${formatDate(b.invitedAt)}`}
                    </span>

                    <div className="col-span-2 sm:col-span-1 flex items-center gap-4 sm:justify-end">
                      <button onClick={() => handleReset(b)} className={`${linkButton} text-ink`}>
                        Reset password
                      </button>
                      {disabled ? (
                        <button onClick={() => enable(b)} className={`${linkButton} text-brand`}>
                          Enable
                        </button>
                      ) : (
                        <button onClick={() => setPending({ kind: "disable", bursar: b })} className={`${linkButton} text-muted`}>
                          Disable
                        </button>
                      )}
                      <button onClick={() => setPending({ kind: "remove", bursar: b })} className={`${linkButton} text-danger`}>
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <p className="text-xs text-muted">
        Bursars can set next term&apos;s bill and record outstanding fees. Students who owe can&apos;t see
        their results until the bursar clears them.
      </p>

      {inviteOpen && (
        <InviteBursarModal
          takenUsernames={takenUsernames}
          onClose={() => setInviteOpen(false)}
          onInvite={handleInvite}
        />
      )}

      {credentials && <CredentialsModal {...credentials} onClose={() => setCredentials(null)} />}

      <AdminConfirm
        isOpen={!!pending}
        danger
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        title={pending?.kind === "remove" ? "Remove this bursar?" : "Disable this account?"}
        confirmText={pending?.kind === "remove" ? "Remove" : "Disable"}
        message={
          pending?.kind === "remove"
            ? `${pending.bursar.firstName} ${pending.bursar.lastName}'s account will be deleted. Fees they recorded are kept.`
            : `${pending?.bursar.firstName} won't be able to sign in until you enable the account again.`
        }
      />
    </div>
  );
}
