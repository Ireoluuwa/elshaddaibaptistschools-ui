"use client";

import React, { useMemo, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import MoneyInput from "@/components/bursar/MoneyInput";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useBursaryTerms, useClassBills, useSaveBill } from "@/hooks/bursary.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { naira } from "@/lib/money";
import { toast } from "@/store/toast.store";
import type { ClassBill } from "@/types/bursary.types";

// Editable bill; charges carry a local key for React.
type Draft = { tuition: number; ict: number; otherCharges: { key: string; name: string; amount: number }[] };

const toDraft = (b: ClassBill): Draft => ({
  tuition: b.tuition,
  ict: b.ict,
  otherCharges: b.otherCharges.map((c, i) => ({ key: `${b.classId}-${i}`, ...c })),
});

const totalOf = (d: Draft) => d.tuition + d.ict + d.otherCharges.reduce((s, c) => s + c.amount, 0);
const otherOf = (d: Draft) => d.otherCharges.reduce((s, c) => s + c.amount, 0);
const sameDraft = (a: Draft, b: Draft) =>
  a.tuition === b.tuition &&
  a.ict === b.ict &&
  JSON.stringify(a.otherCharges.map(({ name, amount }) => [name, amount])) ===
    JSON.stringify(b.otherCharges.map(({ name, amount }) => [name, amount]));

const levelOf = (name: string) => (name.startsWith("SS") ? "SS" : "JSS");
const classOrder = (a: ClassBill, b: ClassBill) =>
  Number(a.className.startsWith("SS")) - Number(b.className.startsWith("SS")) || a.className.localeCompare(b.className);

export default function NextTermBillPage() {
  const { data: terms = [] } = useBursaryTerms();
  const [pickedTermId, setPickedTermId] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, refetch } = useClassBills(pickedTermId);
  const saveBill = useSaveBill();

  const termId = data?.term.id;
  const locked = data?.term.status === "closed";
  const classes = useMemo(() => [...(data?.classes ?? [])].sort(classOrder), [data]);

  const [pickedClassId, setPickedClassId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [copyOpen, setCopyOpen] = useState(false);
  const [copying, setCopying] = useState(false);

  const current = classes.find((c) => c.classId === pickedClassId) ?? classes[0];
  const saved = current ? toDraft(current) : null;
  const draft = (current && drafts[current.classId]) || saved;
  const isDirty = !!(saved && draft && !sameDraft(saved, draft));
  const sameLevel = current ? classes.filter((c) => levelOf(c.className) === levelOf(current.className) && c.classId !== current.classId) : [];

  const update = (patch: Partial<Draft>) => {
    if (!current || !draft) return;
    setDrafts((d) => ({ ...d, [current.classId]: { ...draft, ...patch } }));
  };
  const updateCharge = (key: string, patch: { name?: string; amount?: number }) =>
    draft && update({ otherCharges: draft.otherCharges.map((c) => (c.key === key ? { ...c, ...patch } : c)) });

  const payloadOf = (d: Draft) => ({
    tuition: d.tuition,
    ict: d.ict,
    otherCharges: d.otherCharges.filter((c) => c.name.trim()).map(({ name, amount }) => ({ name: name.trim(), amount })),
  });

  const dropDraft = (classId: string) =>
    setDrafts((d) => Object.fromEntries(Object.entries(d).filter(([id]) => id !== classId)));

  const handleSave = async () => {
    if (!termId || !current || !draft) return;
    try {
      await saveBill.mutateAsync({ termId, classId: current.classId, payload: payloadOf(draft) });
      dropDraft(current.classId);
      toast.success(`${current.className} bill saved`, `${naira(totalOf(draft))} per student`);
    } catch (err) {
      toast.error("Couldn't save bill", apiErrorMessage(err));
    }
  };

  const handleCopy = async () => {
    if (!termId || !draft) return;
    setCopying(true);
    try {
      for (const c of sameLevel) {
        await saveBill.mutateAsync({ termId, classId: c.classId, payload: payloadOf(draft) });
        dropDraft(c.classId);
      }
      toast.success("Bill copied", `Saved for ${sameLevel.map((c) => c.className).join(", ")}.`);
    } catch (err) {
      toast.error("Couldn't copy the bill", apiErrorMessage(err));
    }
    setCopying(false);
    setCopyOpen(false);
  };

  const savedCount = classes.filter((c) => c.saved).length;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Next Term Bill"
        description="What each student pays next term. It's printed on the chosen term's report sheets."
        action={
          <div className="flex items-center gap-3 self-start">
            <span className="text-sm text-muted hidden sm:inline">
              <span className="font-semibold text-ink tabular-nums">{savedCount}</span> of {classes.length} saved
            </span>
            <select
              value={pickedTermId ?? termId ?? ""}
              onChange={(e) => {
                setPickedTermId(e.target.value);
                setDrafts({});
              }}
              aria-label="Report sheet term"
              className="h-10 px-3 rounded-lg border border-line focus:border-brand outline-none text-sm text-ink bg-white"
            >
              {terms.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        }
      />

      {locked && (
        <p className="text-sm text-ink px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
          <span className="font-semibold">{data?.term.label} is closed.</span> Its report sheets are final, so its bill
          can&apos;t change. Ask the admin to reopen the term if it&apos;s wrong.
        </p>
      )}

      {isError ? (
        <div className={`${panelClass} px-5 py-12 text-center text-sm text-muted`}>
          Couldn&apos;t load bills.{" "}
          <button onClick={() => refetch()} className="font-semibold text-brand hover:underline">
            Try again
          </button>
        </div>
      ) : isLoading || !current || !draft ? (
        <div className={`${panelClass} h-60 animate-pulse`} />
      ) : (
        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
          <ClassNav
            selected={current.classId}
            onSelect={setPickedClassId}
            items={classes.map((c) => {
              const d = drafts[c.classId];
              return {
                key: c.classId,
                label: c.className,
                detail: d ? "Unsaved changes" : c.saved ? naira(c.total) : "Not set",
                done: c.saved && !d,
              };
            })}
          />

          <section className={`${panelClass} overflow-hidden`}>
            <header className="flex flex-wrap items-end justify-between gap-3 px-6 py-4 border-b border-line">
              <div>
                <h2 className="text-xl font-bold text-ink">{current.className} bill</h2>
                <p className="text-sm text-muted mt-0.5">Per student · printed on {data?.term.label} report sheets</p>
              </div>
              {!locked && sameLevel.length > 0 && (
                <button
                  onClick={() => setCopyOpen(true)}
                  className="h-9 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors"
                >
                  Copy to other {levelOf(current.className)} classes
                </button>
              )}
            </header>

            <fieldset disabled={locked} className="px-6 py-5 flex flex-col gap-5 disabled:opacity-70">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tuition" className="block text-sm font-medium text-ink mb-1.5">Tuition</label>
                  <MoneyInput id="tuition" value={draft.tuition} onChange={(v) => update({ tuition: v })} />
                </div>
                <div>
                  <label htmlFor="ict" className="block text-sm font-medium text-ink mb-1.5">I.C.T</label>
                  <MoneyInput id="ict" value={draft.ict} onChange={(v) => update({ ict: v })} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-ink">Other charges</p>
                <p className="text-xs text-muted mt-0.5 mb-2">E.g. development levy, uniform, books.</p>
                <ul className="flex flex-col gap-2">
                  {draft.otherCharges.map((c) => (
                    <li key={c.key} className="grid grid-cols-[minmax(0,1fr)_140px_36px] gap-2 items-center">
                      <input
                        value={c.name}
                        onChange={(e) => updateCharge(c.key, { name: e.target.value })}
                        placeholder="Charge name"
                        aria-label="Charge name"
                        className="h-9 px-3 rounded-lg border border-line focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none text-sm text-ink bg-white"
                      />
                      <MoneyInput
                        size="sm"
                        label={`${c.name || "Charge"} amount`}
                        value={c.amount}
                        onChange={(v) => updateCharge(c.key, { amount: v })}
                      />
                      <button
                        type="button"
                        onClick={() => update({ otherCharges: draft.otherCharges.filter((x) => x.key !== c.key) })}
                        aria-label={`Remove ${c.name || "charge"}`}
                        className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted hover:text-danger hover:bg-clay-soft transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    update({ otherCharges: [...draft.otherCharges, { key: crypto.randomUUID(), name: "", amount: 0 }] })
                  }
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
                >
                  <Plus size={15} /> Add charge
                </button>
              </div>

              <div className="rounded-lg bg-canvas border border-line px-4 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-muted">Total per student</p>
                  <p className="text-3xl font-bold text-ink tabular-nums tracking-tight">{naira(totalOf(draft))}</p>
                </div>
                <div className="text-xs text-muted sm:text-right">
                  <p className="font-medium text-ink mb-0.5">On the report sheet</p>
                  <p className="tabular-nums">
                    Next Term Tuition: {naira(draft.tuition + otherOf(draft))} · I.C.T: {naira(draft.ict)}
                  </p>
                </div>
              </div>
            </fieldset>

            {!locked && (
              <footer className="flex items-center justify-between gap-4 px-6 py-4 border-t border-line">
                <span className={`text-sm ${isDirty ? "text-muted" : current.saved ? "text-brand" : "text-clay"}`}>
                  {isDirty ? "Unsaved changes" : current.saved ? "Saved" : "Not saved yet"}
                </span>
                <button
                  onClick={handleSave}
                  disabled={(!isDirty && current.saved) || saveBill.isPending}
                  className={primaryButton}
                >
                  {saveBill.isPending && !copying && <Loader2 size={16} className="animate-spin" />}
                  Save {current.className} bill
                </button>
              </footer>
            )}
          </section>
        </div>
      )}

      <AdminConfirm
        isOpen={copyOpen}
        onClose={() => setCopyOpen(false)}
        onConfirm={handleCopy}
        isPending={copying}
        title={`Copy ${current?.className} bill?`}
        confirmText="Copy and save"
        message={`${sameLevel.map((c) => c.className).join(", ")} will get the same bill (${naira(draft ? totalOf(draft) : 0)} per student) and it will be saved for each.`}
      />
    </div>
  );
}
