"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import ClassNav from "@/components/admin/shared/ClassNav";
import AddClassModal from "@/components/admin/classes/AddClassModal";
import DepartmentsModal from "@/components/admin/classes/DepartmentsModal";
import { panelClass, primaryButton, secondaryButton } from "@/components/admin/shared/AdminModal";
import {
  ALL_DEPARTMENTS,
  allSubjects,
  departments as initialDepartments,
  mockClasses,
  mockCurriculum,
  type SchoolClassInfo,
} from "@/constants/admin/mock.constants";
import { toast } from "@/store/toast.store";

type Curriculum = Record<string, Record<string, string[]>>;

const clone = (c: Curriculum): Curriculum => JSON.parse(JSON.stringify(c));

export default function ClassesSubjectsPage() {
  const [classes, setClasses] = useState<SchoolClassInfo[]>(mockClasses);
  const [departments, setDepartments] = useState<string[]>(initialDepartments);
  const [curriculum, setCurriculum] = useState<Curriculum>(() => clone(mockCurriculum));
  const [saved, setSaved] = useState<Curriculum>(() => clone(mockCurriculum));
  const [selectedClass, setSelectedClass] = useState(mockClasses[0].name);
  const [tab, setTab] = useState(ALL_DEPARTMENTS);
  const [newSubject, setNewSubject] = useState("");
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [departmentsOpen, setDepartmentsOpen] = useState(false);

  const current = classes.find((c) => c.name === selectedClass)!;
  const tabs = current.isSenior ? [ALL_DEPARTMENTS, ...departments] : [ALL_DEPARTMENTS];
  const activeTab = tabs.includes(tab) ? tab : ALL_DEPARTMENTS;

  const subjectsFor = (className: string, key: string) => curriculum[className]?.[key] ?? [];
  const common = subjectsFor(selectedClass, ALL_DEPARTMENTS);
  const listed = subjectsFor(selectedClass, activeTab);

  const isDirty = (className: string) =>
    JSON.stringify(curriculum[className]) !== JSON.stringify(saved[className]);

  const subjectCount = (className: string) => {
    const info = classes.find((c) => c.name === className)!;
    const base = subjectsFor(className, ALL_DEPARTMENTS).length;
    if (!info.isSenior) return `${base} subjects`;
    const counts = departments.map((d) => base + subjectsFor(className, d).length);
    return counts.length ? `${Math.min(...counts)}–${Math.max(...counts)} subjects` : `${base} subjects`;
  };

  const setList = (key: string, list: string[]) =>
    setCurriculum((c) => ({ ...c, [selectedClass]: { ...c[selectedClass], [key]: list } }));

  const trimmed = newSubject.trim();
  // A subject can't be listed twice for the same student.
  const duplicate =
    !!trimmed &&
    [...listed, ...(activeTab === ALL_DEPARTMENTS ? [] : common)].some(
      (s) => s.toLowerCase() === trimmed.toLowerCase(),
    );

  const addSubject = () => {
    if (!trimmed || duplicate) return;
    setList(activeTab, [...listed, trimmed]);
    setNewSubject("");
  };

  const handleSave = () => {
    // TODO: PUT /academics/curriculum/:classId
    setSaved((s) => ({ ...s, [selectedClass]: JSON.parse(JSON.stringify(curriculum[selectedClass])) }));
    toast.success(`${selectedClass} subjects saved`);
  };

  const handleAddClass = (name: string, isSenior: boolean) => {
    // TODO: POST /academics/classes
    const entry = isSenior
      ? { [ALL_DEPARTMENTS]: [], ...Object.fromEntries(departments.map((d) => [d, [] as string[]])) }
      : { [ALL_DEPARTMENTS]: [] };
    setClasses((c) => [...c, { name, isSenior }]);
    setCurriculum((c) => ({ ...c, [name]: entry }));
    setSaved((s) => ({ ...s, [name]: JSON.parse(JSON.stringify(entry)) }));
    setSelectedClass(name);
    setAddClassOpen(false);
    toast.success("Class added", `Now add ${name}'s subjects.`);
  };

  const handleAddDepartment = (name: string) => {
    // TODO: POST /academics/departments
    setDepartments((d) => [...d, name]);
    const addTo = (c: Curriculum) =>
      Object.fromEntries(
        Object.entries(c).map(([cls, map]) =>
          classes.find((x) => x.name === cls)?.isSenior ? [cls, { ...map, [name]: [] }] : [cls, map],
        ),
      );
    setCurriculum(addTo);
    setSaved(addTo);
  };

  const handleRemoveDepartment = (name: string) => {
    setDepartments((d) => d.filter((x) => x !== name));
    toast.info("Department removed", name);
  };

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
        <ClassNav
          selected={selectedClass}
          onSelect={(c) => {
            setSelectedClass(c);
            setNewSubject("");
          }}
          items={classes.map((c) => ({
            key: c.name,
            label: c.name,
            detail: isDirty(c.name) ? "Unsaved changes" : subjectCount(c.name),
            done: false,
          }))}
        />

        <section className={`${panelClass} overflow-hidden`}>
          <header className="px-5 pt-4 border-b border-line">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-bold text-ink">{selectedClass}</h2>
              <span className="text-xs font-medium text-muted">
                {current.isSenior ? "Senior class" : "Junior class"}
              </span>
            </div>

            {/* Department tabs (senior classes only) */}
            {current.isSenior ? (
              <nav className="flex gap-1 mt-3 -mb-px overflow-x-auto">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 pb-2.5 pt-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === t
                        ? "border-brand text-ink"
                        : "border-transparent text-muted hover:text-ink"
                    }`}
                  >
                    {t}
                    <span className="ml-1.5 text-xs text-muted tabular-nums">{subjectsFor(selectedClass, t).length}</span>
                  </button>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-muted mt-0.5 pb-4">Every student in {selectedClass} takes these subjects.</p>
            )}
          </header>

          {current.isSenior && (
            <p className="px-5 pt-4 text-sm text-muted">
              {activeTab === ALL_DEPARTMENTS
                ? "Every senior student in this class takes these, whatever their department."
                : `${activeTab} students take these plus the ${common.length} subjects under All departments (${common.length + listed.length} in total).`}
            </p>
          )}

          {/* Subjects */}
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

          {/* Add subject */}
          <div className="px-5 pb-5">
            <datalist id="subject-options">
              {allSubjects.map((s) => (
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

          <footer className="flex items-center justify-between gap-4 px-5 py-4 border-t border-line">
            <span className={`text-sm ${isDirty(selectedClass) ? "text-muted" : "text-brand"}`}>
              {isDirty(selectedClass) ? "Unsaved changes" : "All changes saved"}
            </span>
            <button onClick={handleSave} disabled={!isDirty(selectedClass)} className={primaryButton}>
              Save {selectedClass}
            </button>
          </footer>
        </section>
      </div>

      {addClassOpen && (
        <AddClassModal
          existing={classes.map((c) => c.name)}
          onClose={() => setAddClassOpen(false)}
          onAdd={handleAddClass}
        />
      )}
      {departmentsOpen && (
        <DepartmentsModal
          departments={departments}
          onClose={() => setDepartmentsOpen(false)}
          onAdd={handleAddDepartment}
          onRemove={handleRemoveDepartment}
        />
      )}
    </div>
  );
}
