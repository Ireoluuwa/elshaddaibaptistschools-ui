"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import InviteBursarModal, { InviteValues } from "@/components/admin/bursars/InviteBursarModal";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useAdminBursars, useInviteBursar } from "@/hooks/admin-staff.hooks";
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

type Credentials = { title: string; name: string; username: string; password: string };

const nameOf = (b: BursarAccount) => `${b.firstName} ${b.lastName}`.trim() || b.username;

export default function AdminBursarsPage() {
  const { data: bursars = [], isLoading, isError, refetch } = useAdminBursars();
  const inviteBursar = useInviteBursar();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

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
                    <Link href={`/portal/admin/bursars/${b.id}`} className="min-w-0 group">
                      <p className={`text-sm font-medium truncate group-hover:underline underline-offset-2 ${removed ? "text-muted" : "text-ink"}`}>{nameOf(b)}</p>
                      <p className="text-xs text-muted truncate">
                        {b.username}
                        {(b.email || b.phoneNumber) && ` · ${b.email ?? b.phoneNumber}`}
                      </p>
                    </Link>

                    <div className="col-start-2 row-start-1 sm:col-start-auto sm:row-start-auto justify-self-end sm:justify-self-start">
                      <StatusBadge tone={statusTone[b.status]}>{b.status}</StatusBadge>
                    </div>

                    <span className="hidden sm:block text-sm text-muted tabular-nums">
                      {b.lastLoginAt ? formatDate(b.lastLoginAt) : `Invited ${formatDate(b.invitedAt)}`}
                    </span>

                    <Link
                      href={`/portal/admin/bursars/${b.id}`}
                      aria-label={`Manage ${nameOf(b)}`}
                      className="col-span-2 sm:col-span-1 justify-self-end p-1.5 text-muted/50 hover:text-brand transition-colors"
                    >
                      <ChevronRight size={18} />
                    </Link>
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

      {credentials && <CredentialsModal {...credentials} onClose={() => setCredentials(null)} />}

    </div>
  );
}
