"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import SetPasswordModal from "@/components/admin/shared/SetPasswordModal";
import InviteBursarModal, { InviteValues } from "@/components/admin/bursars/InviteBursarModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useAdminBursars, useInviteBursar, useStaffAccountActions } from "@/hooks/admin-staff.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { BursarAccount, BursarStatus } from "@/types/admin-staff.types";

const statusTone: Record<BursarStatus, "brand" | "clay" | "muted"> = {
  active: "brand",
  invited: "clay",
  removed: "muted",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const rowGrid =
  "grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_110px_150px_auto] items-center gap-x-4 gap-y-2";

const linkButton = "text-sm font-medium underline-offset-2 hover:underline disabled:opacity-40";

type Credentials = { title: string; name: string; username: string; password: string };
type Pending = { kind: "remove" | "delete"; bursar: BursarAccount };

const nameOf = (b: BursarAccount) => `${b.firstName} ${b.lastName}`.trim() || b.username;

export default function AdminBursarsPage() {
  const { data: bursars = [], isLoading, isError, refetch } = useAdminBursars();
  const inviteBursar = useInviteBursar();
  const actions = useStaffAccountActions("bursar");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [passwordFor, setPasswordFor] = useState<BursarAccount | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [pending, setPending] = useState<Pending | null>(null);

  const handleInvite = async (values: InviteValues) => {
    try {
      const { bursar, password } = await inviteBursar.mutateAsync({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        username: values.username.trim().toLowerCase(),
        email: values.email.trim() || undefined,
        phoneNumber: values.phoneNumber.trim() || undefined,
      });
      setInviteOpen(false);
      setCredentials({ title: "Account created", name: nameOf(bursar), username: bursar.username, password });
    } catch (err) {
      toast.error("Couldn't invite bursar", apiErrorMessage(err));
    }
  };

  const handleConfirm = async () => {
    if (!pending) return;
    const { kind, bursar } = pending;
    try {
      if (kind === "remove") await actions.remove.mutateAsync(bursar.id);
      else await actions.deletePermanently.mutateAsync(bursar.id);
      toast.success(kind === "remove" ? "Bursar removed" : "Bursar deleted", nameOf(bursar));
    } catch (err) {
      toast.error(kind === "remove" ? "Couldn't remove bursar" : "Couldn't delete bursar", apiErrorMessage(err));
    }
    setPending(null);
  };

  const handleRestore = async (bursar: BursarAccount) => {
    try {
      await actions.restore.mutateAsync(bursar.id);
      toast.success("Bursar restored", `${nameOf(bursar)} can sign in again.`);
    } catch (err) {
      toast.error("Couldn't restore bursar", apiErrorMessage(err));
    }
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
        {isLoading ? (
          <div className="p-5 flex flex-col gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-9 rounded-lg bg-canvas animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <p className="px-6 py-12 text-center text-sm text-muted">
            Couldn&apos;t load bursars.{" "}
            <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
              Try again
            </button>
          </p>
        ) : bursars.length === 0 ? (
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
                const removed = b.status === "removed";
                return (
                  <li key={b.id} className={`${rowGrid} px-5 py-3.5`}>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${removed ? "text-muted" : "text-ink"}`}>{nameOf(b)}</p>
                      <p className="text-xs text-muted truncate">
                        {b.username}
                        {(b.email || b.phoneNumber) && ` · ${b.email ?? b.phoneNumber}`}
                      </p>
                    </div>

                    <div className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-self-end sm:justify-self-start">
                      <StatusBadge tone={statusTone[b.status]}>{b.status}</StatusBadge>
                    </div>

                    <span className="hidden sm:block text-sm text-muted tabular-nums">
                      {b.lastLoginAt ? formatDate(b.lastLoginAt) : `Invited ${formatDate(b.invitedAt)}`}
                    </span>

                    <div className="col-span-2 sm:col-span-1 flex items-center gap-4 sm:justify-end">
                      {removed ? (
                        <>
                          <button onClick={() => handleRestore(b)} disabled={actions.restore.isPending} className={`${linkButton} text-brand`}>
                            Restore
                          </button>
                          <button onClick={() => setPending({ kind: "delete", bursar: b })} className={`${linkButton} text-danger`}>
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setPasswordFor(b)} className={`${linkButton} text-ink`}>
                            Password
                          </button>
                          <button onClick={() => setPending({ kind: "remove", bursar: b })} className={`${linkButton} text-danger`}>
                            Remove
                          </button>
                        </>
                      )}
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
          takenUsernames={bursars.map((b) => b.username.toLowerCase())}
          onClose={() => setInviteOpen(false)}
          onInvite={handleInvite}
          isSubmitting={inviteBursar.isPending}
        />
      )}

      {passwordFor && (
        <SetPasswordModal
          personName={nameOf(passwordFor)}
          onSubmit={(newPassword) => actions.setPassword.mutateAsync({ id: passwordFor.id, newPassword })}
          onClose={() => setPasswordFor(null)}
          onChanged={(c) => {
            setCredentials({ title: "Password changed", name: nameOf(passwordFor), ...c });
            setPasswordFor(null);
          }}
        />
      )}

      {credentials && <CredentialsModal {...credentials} onClose={() => setCredentials(null)} />}

      <AdminConfirm
        isOpen={!!pending}
        danger
        onClose={() => setPending(null)}
        onConfirm={handleConfirm}
        isPending={actions.remove.isPending || actions.deletePermanently.isPending}
        title={pending?.kind === "remove" ? `Remove ${pending && nameOf(pending.bursar)}?` : `Delete ${pending && nameOf(pending.bursar)} permanently?`}
        confirmText={pending?.kind === "remove" ? "Remove bursar" : "Delete permanently"}
        message={
          pending?.kind === "remove"
            ? "They won't be able to sign in. You can restore them later."
            : "This deletes their account and can't be undone."
        }
      />
    </div>
  );
}
