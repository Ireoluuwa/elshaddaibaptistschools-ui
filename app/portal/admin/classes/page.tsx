"use client";

import React, { useMemo, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import AddClassModal from "@/components/admin/classes/AddClassModal";
import DepartmentsModal from "@/components/admin/classes/DepartmentsModal";
import { panelClass, primaryButton, secondaryButton } from "@/components/admin/shared/AdminModal";
import {
  useClasses,
  useCurriculum,
  useSaveCurriculum,
  useSubjectCatalog,
} from "@/hooks/curriculum.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { ClassCurriculum } from "@/types/curriculum.types";

const ALL = "all";

// Editable copy of a class's subjects: "all" plus one list per department id.
type Draft = Record<string, string[]>;

const toDraft = (c: ClassCurriculum): Draft => ({
  [ALL]: c.common,
  ...Object.fromEntries(c.departments.map((d) => [d.id, d.subjects])),
});

const sameDraft = (a: Draft, b: Draft) =>
  Object.keys({ ...a, ...b }).every(
    (k) => JSON.stringify([...(a[k] ?? [])].sort()) === JSON.stringify([...(b[k] ?? [])].sort()),
  );

// JSS classes before SS, then by name.
const classOrder = (a: { name: string }, b: { name: string }) =>
  Number(a.name.startsWith("SS")) - Number(b.name.startsWith("SS")) || a.name.localeCompare(b.name);

export default function ClassesSubjectsPage() {
  const { data: rawClasses = [], isLoading: classesLoading } = useClasses();
  const classes = useMemo(() => [...rawClasses].sort(classOrder), [rawClasses]);
  const [pickedClassId, setPickedClassId] = useState<string | null>(null);
  const selectedId = pickedClassId ?? classes[0]?.id ?? null;
  const current = classes.find((c) => c.id === selectedId);

  const { data: curriculum, isLoading: curriculumLoading, isError } = useCurriculum(selectedId);
  const { data: catalog = [] } = useSubjectCatalog();
  const saveCurriculum = useSaveCurriculum();

  // Unsaved edits per class, kept while switching classes.
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [tab, setTab] = useState(ALL);
  const [newSubject, setNewSubject] = useState("");
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  const saved = curriculum ? toDraft(curriculum) : null;
  const draft = (selectedId && drafts[selectedId]) || saved;
  const isDirty = !!(saved && draft && !sameDraft(saved, draft));
  const departments = curriculum?.departments ?? [];
  const activeTab = tab === ALL || departments.some((d) => d.id === tab) ? tab : ALL;
  const listed = draft?.[activeTab] ?? [];
  const common = draft?.[ALL] ?? [];

  const discardDraft = (classId: string) =>
    setDrafts((d) => Object.fromEntries(Object.entries(d).filter(([id]) => id !== classId)));

  const setList = (key: string, list: string[]) => {
    if (!selectedId || !draft) return;
    setDrafts((d) => ({ ...d, [selectedId]: { ...draft, [key]: list } }));
  };

  const trimmed = newSubject.trim();
  // A subject can't be listed twice for the same student.
  const duplicate =
    !!trimmed &&
    [...listed, ...(activeTab === ALL ? [] : common)].some((s) => s.toLowerCase() === trimmed.toLowerCase());

  const addSubject = () => {
    if (!trimmed || duplicate) return;
    // Reuse the catalog's spelling when it matches.
    const match = catalog.find((s) => s.toLowerCase() === trimmed.toLowerCase());
    setList(activeTab, [...listed, match ?? trimmed]);
    setNewSubject("");
  };

  const handleSave = async () => {
    if (!selectedId || !draft || !current) return;
    try {
      await saveCurriculum.mutateAsync({
        classId: selectedId,
        payload: {
          common: draft[ALL] ?? [],
          departments: departments.map((d) => ({ departmentId: d.id, subjects: draft[d.id] ?? [] })),
        },
      });
      discardDraft(selectedId);
      toast.success(`${current.name} subjects saved`);
    } catch (err) {
      toast.error("Couldn't save subjects", apiErrorMessage(err));
    }
  };

  const subjectTotal = (deptId: string) => (draft?.[ALL]?.length ?? 0) + (draft?.[deptId]?.length ?? 0);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <PageHeader
        title="Classes & Subjects"
        description="Choose which subjects each class takes. Teachers enter results for these subjects."
        action={
          <div className="flex gap-2 self-start">
            <button onClick={() => setDepartmentsOpen(true)} className={secondaryButton}>
              Departments
            </button>
            <button onClick={() => setAddClassOpen(true)} className={primaryButton}>
              <Plus size={16} /> Add class
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
        {classesLoading ? (
          <div className="flex lg:flex-col gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 w-28 lg:w-full rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <ClassNav
            selected={selectedId ?? ""}
            onSelect={(id) => {
              setPickedClassId(id);
              setNewSubject("");
            }}
            items={classes.map((c) => ({
              key: c.id,
              label: c.name,
              detail: drafts[c.id] ? "Unsaved changes" : c.isSenior ? "Senior class" : "Junior class",
              done: false,
            }))}
          />
        )}

        <section className={`${panelClass} overflow-hidden`}>
          {!current ? (
            <p className="px-5 py-12 text-center text-sm text-muted">
              {classesLoading ? "Loading classes…" : "No classes yet. Add one to get started."}
            </p>
          ) : (
            <>
              <header className="px-5 pt-4 border-b border-line">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-xl font-bold text-ink">{current.name}</h2>
                  <span className="text-xs font-medium text-muted">
                    {current.isSenior ? "Senior class" : "Junior class"}
                  </span>
                </div>

                {current.isSenior ? (
                  <nav className="flex gap-1 mt-3 -mb-px overflow-x-auto">
                    {[{ id: ALL, name: "All departments" }, ...departments].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`px-3 pb-2.5 pt-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                          activeTab === t.id
                            ? "border-brand text-ink"
                            : "border-transparent text-muted hover:text-ink"
                        }`}
                      >
                        {t.name}
                        <span className="ml-1.5 text-xs text-muted tabular-nums">{draft?.[t.id]?.length ?? 0}</span>
                      </button>
                    ))}
                  </nav>
                ) : (
                  <p className="text-sm text-muted mt-0.5 pb-4">Every student in {current.name} takes these subjects.</p>
                )}
              </header>

              {curriculumLoading ? (
                <div className="px-5 py-5 flex flex-wrap gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-8 w-28 rounded-full bg-canvas animate-pulse" />
                  ))}
                </div>
              ) : isError ? (
                <p className="px-5 py-10 text-center text-sm text-muted">Couldn&apos;t load this class&apos;s subjects.</p>
              ) : (
                <>
                  {current.isSenior && (
                    <p className="px-5 pt-4 text-sm text-muted">
                      {activeTab === ALL
                        ? "Every senior student in this class takes these, whatever their department."
                        : `${departments.find((d) => d.id === activeTab)?.name} students take these plus the ${common.length} under All departments (${subjectTotal(activeTab)} in total).`}
                    </p>
                  )}

                  <ul className="px-5 py-4 flex flex-wrap gap-2">
                    {listed.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1 pl-3 pr-1 h-8 rounded-full border border-line bg-white text-sm text-ink"
                      >
                        {s}
                        <button
                          onClick={() => setList(activeTab, listed.filter((x) => x !== s))}
                          aria-label={`Remove ${s}`}
                          className="p-1 rounded-full text-muted hover:text-danger hover:bg-clay-soft transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </li>
                    ))}
                    {listed.length === 0 && <li className="text-sm text-muted py-1.5">No subjects yet.</li>}
                  </ul>

                  <div className="px-5 pb-5">
                    <datalist id="subject-options">
                      {catalog.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                    <div className="flex gap-2 max-w-md">
                      <input
                        list="subject-options"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSubject()}
                        placeholder="Add a subject"
                        aria-label="Add a subject"
                        className={`flex-1 h-9 px-3 rounded-lg border outline-none text-sm text-ink bg-white focus:ring-2 focus:ring-brand/15 ${
                          duplicate ? "border-danger" : "border-line focus:border-brand"
                        }`}
                      />
                      <button
                        onClick={addSubject}
                        disabled={!trimmed || duplicate}
                        className="h-9 px-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:bg-tint rounded-lg disabled:opacity-40 transition-colors"
                      >
                        <Plus size={15} /> Add
                      </button>
                    </div>
                    {duplicate && <p className="text-xs text-danger mt-1.5">{trimmed} is already on the list.</p>}
                  </div>
                </>
              )}

              <footer className="flex items-center justify-between gap-4 px-5 py-4 border-t border-line">
                <span className={`text-sm ${isDirty ? "text-muted" : "text-brand"}`}>
                  {isDirty ? "Unsaved changes" : "All changes saved"}
                </span>
                <div className="flex items-center gap-2">
                  {isDirty && (
                    <button
                      onClick={() => discardDraft(current.id)}
                      disabled={saveCurriculum.isPending}
                      className="h-10 px-3 text-sm font-medium text-muted hover:text-ink"
                    >
                      Discard
                    </button>
                  )}
                  <button onClick={handleSave} disabled={!isDirty || saveCurriculum.isPending} className={primaryButton}>
                    {saveCurriculum.isPending && <Loader2 size={16} className="animate-spin" />}
                    Save {current.name}
                  </button>
                </div>
              </footer>
            </>
          )}
        </section>
      </div>

      {addClassOpen && (
        <AddClassModal
          existing={classes.map((c) => c.name)}
          onClose={() => setAddClassOpen(false)}
          onAdded={(c) => {
            setAddClassOpen(false);
            setPickedClassId(c.id);
            toast.success("Class added", `Now add ${c.name}'s subjects.`);
          }}
        />
      )}
      {departmentsOpen && <DepartmentsModal onClose={() => setDepartmentsOpen(false)} />}
    </div>
  );
}
