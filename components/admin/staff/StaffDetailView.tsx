"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, Pencil, Phone, RotateCcw, School, UserX } from "lucide-react";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import SetPasswordModal from "@/components/admin/shared/SetPasswordModal";
import EditStaffModal, { EditableStaff } from "@/components/admin/staff/EditStaffModal";
import { panelClass } from "@/components/admin/shared/AdminModal";
import { useStaffAccountActions } from "@/hooks/admin-staff.hooks";
import AssignClassModal from "@/components/admin/staff/AssignClassModal";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";

export interface StaffDetail extends EditableStaff {
  avatarUrl?: string | null;
  isActive: boolean;
  status: { label: string; tone: "brand" | "clay" | "muted" };
  lastLoginAt: string | null;
  // Teachers only.
  classId?: string | null;
  className?: string | null;
}

interface StaffDetailViewProps {
  role: "teacher" | "bursar";
  account: StaffDetail | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const NotProvided = () => <span className="text-muted">Not provided</span>;

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 px-5 py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink break-words">{children}</dd>
    </div>
  );
}

const actionButton =
  "h-9 px-3 inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg transition-colors shrink-0";

export default function StaffDetailView({ role, account, isLoading, isError, onRetry }: StaffDetailViewProps) {
  const router = useRouter();
  const listHref = role === "teacher" ? "/portal/admin/teachers" : "/portal/admin/bursars";
  const roleLabel = role === "teacher" ? "Teacher" : "Bursar";
  const actions = useStaffAccountActions(role);

  const [editOpen, setEditOpen] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
  const [confirming, setConfirming] = useState<"remove" | "delete" | null>(null);

  const back = (
    <Link href={listHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink self-start">
      <ArrowLeft size={16} /> All {role === "teacher" ? "teachers" : "bursars"}
    </Link>
  );

  if (isLoading || isError || !account) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {back}
        {isLoading ? (
          <div className={`${panelClass} h-28 animate-pulse`} />
        ) : (
          <div className={`${panelClass} px-5 py-12 text-center`}>
            <p className="text-sm text-muted">Couldn&apos;t load this {role}.</p>
            <button onClick={onRetry} className="mt-2 text-sm font-semibold text-brand hover:underline">
              Try again
            </button>
          </div>
        )}
      </div>
    );
  }

  const fullName = `${account.firstName} ${account.lastName}`.trim() || account.username;
  const initials = `${account.firstName[0] ?? ""}${account.lastName[0] ?? ""}`.toUpperCase() || "?";

  const run = async (action: () => Promise<unknown>, success: string, failure: string) => {
    try {
      await action();
      toast.success(success, fullName);
      return true;
    } catch (err) {
      toast.error(failure, apiErrorMessage(err));
      return false;
    }
  };

  const handleConfirm = async () => {
    if (confirming === "remove") {
      await run(() => actions.remove.mutateAsync(account.id), `${roleLabel} removed`, `Couldn't remove ${role}`);
      setConfirming(null);
    } else if (confirming === "delete") {
      const ok = await run(() => actions.deletePermanently.mutateAsync(account.id), `${roleLabel} deleted`, `Couldn't delete ${role}`);
      setConfirming(null);
      if (ok) router.push(listHref);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {back}

      {!account.isActive && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
          <p className="flex-1 text-sm text-ink">
            <span className="font-semibold">This {role} has been removed.</span> They can&apos;t sign in.
          </p>
          <button
            onClick={() => run(() => actions.restore.mutateAsync(account.id), `${roleLabel} restored`, `Couldn't restore ${role}`)}
            disabled={actions.restore.isPending}
            className={`${actionButton} text-white bg-brand hover:bg-brand-dark self-start sm:self-auto`}
          >
            <RotateCcw size={15} /> Restore
          </button>
        </div>
      )}

      {/* Identity */}
      <section className={`${panelClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4`}>
        {account.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- storage URL
          <img src={account.avatarUrl} alt={fullName} className="w-16 h-16 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-ink text-white flex items-center justify-center text-xl font-bold shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-ink tracking-tight truncate">{fullName}</h1>
          <p className="text-sm text-muted tabular-nums">
            {roleLabel} · {account.username}
          </p>
        </div>
        <div className="flex sm:flex-col sm:items-end gap-x-4 gap-y-1.5">
          {role === "teacher" && (
            <span className="text-sm font-semibold text-ink">
              {account.className ? `Class teacher of ${account.className}` : "No class"}
            </span>
          )}
          <StatusBadge tone={account.status.tone}>{account.status.label}</StatusBadge>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <section className={`${panelClass} overflow-hidden`}>
          <header className="px-5 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">Contact</h2>
          </header>
          <dl className="divide-y divide-line">
            <DetailRow label="Email">
              {account.email ? (
                <a href={`mailto:${account.email}`} className="inline-flex items-center gap-1.5 text-brand hover:underline break-all">
                  <Mail size={14} className="shrink-0" /> {account.email}
                </a>
              ) : (
                <NotProvided />
              )}
            </DetailRow>
            <DetailRow label="Phone">
              {account.phoneNumber ? (
                <a href={`tel:${account.phoneNumber}`} className="inline-flex items-center gap-1.5 text-brand hover:underline">
                  <Phone size={14} /> {account.phoneNumber}
                </a>
              ) : (
                <NotProvided />
              )}
            </DetailRow>
            {role === "teacher" && <DetailRow label="Address">{account.address ?? <NotProvided />}</DetailRow>}
          </dl>
        </section>

        <section className={`${panelClass} overflow-hidden`}>
          <header className="px-5 py-4 border-b border-line">
            <h2 className="font-semibold text-ink">Account</h2>
          </header>
          <dl className="divide-y divide-line">
            <DetailRow label="Username">
              <span className="tabular-nums">{account.username}</span>
            </DetailRow>
            <DetailRow label="Last signed in">
              {account.lastLoginAt ? formatDate(account.lastLoginAt) : <span className="text-muted">Never</span>}
            </DetailRow>
          </dl>
        </section>
      </div>

      {/* Manage */}
      <section className={`${panelClass} overflow-hidden`}>
        <header className="px-5 py-4 border-b border-line">
          <h2 className="font-semibold text-ink">Manage</h2>
        </header>
        <ul className="divide-y divide-line">
          <li className="flex items-center gap-4 px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">Details</p>
              <p className="text-xs text-muted">Name, username and contact details.</p>
            </div>
            <button onClick={() => setEditOpen(true)} className={`${actionButton} text-ink border border-line hover:border-ink/30`}>
              <Pencil size={15} /> Edit details
            </button>
          </li>
          {role === "teacher" && account.isActive && (
            <li className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">Class teacher of</p>
                <p className="text-xs text-muted">The class whose results and reports they manage.</p>
              </div>
              <span className={`text-sm ${account.className ? "font-semibold text-ink" : "text-clay"}`}>
                {account.className ?? "None"}
              </span>
              <button onClick={() => setClassOpen(true)} className={`${actionButton} text-ink border border-line hover:border-ink/30`}>
                <School size={15} /> Change class
              </button>
            </li>
          )}
          <li className="flex items-center gap-4 px-5 py-3.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">Password</p>
              <p className="text-xs text-muted">Forgotten their password? Set a new one.</p>
            </div>
            <button onClick={() => setPasswordOpen(true)} className={`${actionButton} text-ink border border-line hover:border-ink/30`}>
              <KeyRound size={15} /> Change password
            </button>
          </li>
          {account.isActive && (
            <li className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">Remove {role}</p>
                <p className="text-xs text-muted">
                  Stops them signing in{role === "teacher" ? " and takes them off their class" : ""}. You can restore them later.
                </p>
              </div>
              <button onClick={() => setConfirming("remove")} className={`${actionButton} text-danger border border-danger/30 hover:bg-clay-soft`}>
                <UserX size={15} /> Remove
              </button>
            </li>
          )}
        </ul>
      </section>

      {!account.isActive && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-1">
          <p className="flex-1 text-xs text-muted">No longer needed? Delete this account permanently.</p>
          <button onClick={() => setConfirming("delete")} className="text-sm font-medium text-danger hover:underline underline-offset-2 self-start">
            Delete permanently
          </button>
        </div>
      )}

      {classOpen && (
        <AssignClassModal
          teacherId={account.id}
          teacherName={fullName}
          currentClassId={account.classId ?? null}
          onClose={() => setClassOpen(false)}
        />
      )}

      {editOpen && <EditStaffModal role={role} account={account} onClose={() => setEditOpen(false)} />}

      {passwordOpen && (
        <SetPasswordModal
          personName={fullName}
          onSubmit={(newPassword) => actions.setPassword.mutateAsync({ id: account.id, newPassword })}
          onClose={() => setPasswordOpen(false)}
          onChanged={(c) => {
            setPasswordOpen(false);
            setCredentials(c);
          }}
        />
      )}

      {credentials && (
        <CredentialsModal
          title="Password changed"
          name={fullName}
          username={credentials.username}
          password={credentials.password}
          onClose={() => setCredentials(null)}
        />
      )}

      <AdminConfirm
        isOpen={!!confirming}
        danger
        onClose={() => setConfirming(null)}
        onConfirm={handleConfirm}
        isPending={actions.remove.isPending || actions.deletePermanently.isPending}
        title={confirming === "remove" ? `Remove ${fullName}?` : `Delete ${fullName} permanently?`}
        confirmText={confirming === "remove" ? `Remove ${role}` : "Delete permanently"}
        message={
          confirming === "remove"
            ? `They won't be able to sign in${role === "teacher" ? " and will be taken off their class" : ""}. You can restore them later.`
            : `This deletes their account and can't be undone.${role === "teacher" ? " It's only allowed if they haven't posted any assignments." : ""}`
        }
      />
    </div>
  );
}
