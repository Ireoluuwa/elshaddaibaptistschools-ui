"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import AdminConfirm from "@/components/admin/shared/AdminConfirm";
import MoneyInput from "@/components/bursar/MoneyInput";
import { panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { promotionClasses } from "@/constants/admin/mock.constants";
import {
  billTotal,
  draftNextBills,
  naira,
  nextTermLabel,
} from "@/constants/bursar/mock.constants";
import { toast } from "@/store/toast.store";
import type { ClassBill } from "@/types/bursar.types";

const sameBill = (a?: ClassBill, b?: ClassBill) => JSON.stringify(a) === JSON.stringify(b);
const levelOf = (className: string) => (className.startsWith("SS") ? "SS" : "JSS");

export default function NextTermBillPage() {
  const [bills, setBills] = useState<ClassBill[]>(draftNextBills);
  const [saved, setSaved] = useState<Record<string, ClassBill>>({});
  const [selectedClass, setSelectedClass] = useState(promotionClasses[0]);
  const [copyOpen, setCopyOpen] = useState(false);

  const bill = bills.find((b) => b.className === selectedClass)!;
  const isSaved = sameBill(saved[selectedClass], bill);
  const level = levelOf(selectedClass);
  const sameLevel = promotionClasses.filter((c) => levelOf(c) === level && c !== selectedClass);
  const otherTotal = bill.otherCharges.reduce((sum, c) => sum + c.amount, 0);

  const update = (patch: Partial<ClassBill>) =>
    setBills((prev) => prev.map((b) => (b.className === selectedClass ? { ...b, ...patch } : b)));

  const updateCharge = (id: string, patch: { name?: string; amount?: number }) =>
    update({ otherCharges: bill.otherCharges.map((c) => (c.id === id ? { ...c, ...patch } : c)) });

  const handleSave = () => {
    // TODO: PUT /bursary/bills/:termId/:classId
    setSaved((s) => ({ ...s, [selectedClass]: bill }));
    toast.success(`${selectedClass} bill saved`, `${naira(billTotal(bill))} per student`);
  };

  const handleCopy = () => {
    const copies = Object.fromEntries(
      sameLevel.map((c) => [
        c,
        { ...bill, className: c, otherCharges: bill.otherCharges.map((x) => ({ ...x, id: `${c}-${x.id}` })) },
      ]),
    );
    setBills((prev) => prev.map((b) => copies[b.className] ?? b));
    setCopyOpen(false);
    toast.info("Bill copied", `Review and save ${sameLevel.join(", ")}.`);
  };

  const savedCount = promotionClasses.filter((c) =>
    sameBill(saved[c], bills.find((b) => b.className === c)),
  ).length;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Next Term Bill"
        description={`What each student will pay for ${nextTermLabel}. Printed on this term's report sheets.`}
        action={
          <span className="text-sm text-muted self-start sm:self-auto">
            <span className="font-semibold text-ink tabular-nums">{savedCount}</span> of{" "}
            {promotionClasses.length} classes saved
          </span>
        }
      />

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        <ClassNav
          selected={selectedClass}
          onSelect={setSelectedClass}
          items={promotionClasses.map((c) => {
            const b = bills.find((x) => x.className === c)!;
            return {
              key: c,
              label: c,
              detail: naira(billTotal(b)),
              done: sameBill(saved[c], b),
            };
          })}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="flex flex-wrap items-end justify-between gap-3 px-6 py-4 border-b border-line">
            <div>
              <h2 className="text-xl font-bold text-ink">{selectedClass} bill</h2>
              <p className="text-sm text-muted mt-0.5">{nextTermLabel} · per student</p>
            </div>
            {sameLevel.length > 0 && (
              <button
                onClick={() => setCopyOpen(true)}
                className="h-9 px-3 text-sm font-medium text-brand hover:bg-tint rounded-lg transition-colors"
              >
                Copy to other {level} classes
              </button>
            )}
          </header>

          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Main fees */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tuition" className="block text-sm font-medium text-ink mb-1.5">Tuition</label>
                <MoneyInput id="tuition" value={bill.tuition} onChange={(v) => update({ tuition: v })} />
              </div>
              <div>
                <label htmlFor="ict" className="block text-sm font-medium text-ink mb-1.5">I.C.T</label>
                <MoneyInput id="ict" value={bill.ict} onChange={(v) => update({ ict: v })} />
              </div>
            </div>

            {/* Other charges */}
            <div>
              <p className="text-sm font-medium text-ink">Other charges</p>
              <p className="text-xs text-muted mt-0.5 mb-2">E.g. development levy, uniform, books.</p>
              <ul className="flex flex-col gap-2">
                {bill.otherCharges.map((c) => (
                  <li key={c.id} className="grid grid-cols-[minmax(0,1fr)_140px_36px] gap-2 items-center">
                    <input
                      value={c.name}
                      onChange={(e) => updateCharge(c.id, { name: e.target.value })}
                      placeholder="Charge name"
                      aria-label="Charge name"
                      className="h-9 px-3 rounded-lg border border-line focus:border-brand focus:ring-2 focus:ring-brand/15 outline-none text-sm text-ink bg-white"
                    />
                    <MoneyInput
                      size="sm"
                      label={`${c.name || "Charge"} amount`}
                      value={c.amount}
                      onChange={(v) => updateCharge(c.id, { amount: v })}
                    />
                    <button
                      onClick={() => update({ otherCharges: bill.otherCharges.filter((x) => x.id !== c.id) })}
                      aria-label={`Remove ${c.name || "charge"}`}
                      className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-muted hover:text-danger hover:bg-clay-soft transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  update({
                    otherCharges: [...bill.otherCharges, { id: crypto.randomUUID(), name: "", amount: 0 }],
                  })
                }
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
              >
                <Plus size={15} /> Add charge
              </button>
            </div>

            {/* Total + report sheet preview */}
            <div className="rounded-lg bg-canvas border border-line px-4 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-sm text-muted">Total per student</p>
                <p className="text-3xl font-bold text-ink tabular-nums tracking-tight">{naira(billTotal(bill))}</p>
              </div>
              <div className="text-xs text-muted sm:text-right">
                <p className="font-medium text-ink mb-0.5">On the report sheet</p>
                <p className="tabular-nums">
                  Next Term Tuition: {naira(bill.tuition + otherTotal)} · I.C.T: {naira(bill.ict)}
                </p>
              </div>
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 px-6 py-4 border-t border-line">
            <span className={`text-sm ${isSaved ? "text-brand" : "text-muted"}`}>
              {isSaved ? "Saved" : saved[selectedClass] ? "Unsaved changes" : "Not saved yet"}
            </span>
            <button onClick={handleSave} disabled={isSaved} className={primaryButton}>
              Save {selectedClass} bill
            </button>
          </footer>
        </section>
      </div>

      <AdminConfirm
        isOpen={copyOpen}
        onClose={() => setCopyOpen(false)}
        onConfirm={handleCopy}
        title={`Copy ${selectedClass} bill?`}
        confirmText="Copy bill"
        message={`${sameLevel.join(", ")} will get the same tuition, I.C.T and other charges (${naira(
          billTotal(bill),
        )} total). You'll still need to save each one.`}
      />
    </div>
  );
}
