"use client";

import React, { useMemo, useState } from "react";
import { Info, Loader2, UserPlus } from "lucide-react";
import CredentialsModal from "@/components/admin/shared/CredentialsModal";
import { inputClass, labelClass, panelClass, primaryButton } from "@/components/admin/shared/AdminModal";
import { useClasses, useDepartments } from "@/hooks/curriculum.hooks";
import { useEnrollStudent } from "@/hooks/enrollment.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { CreatedStudent } from "@/types/enrollment.types";

// JSS classes before SS, then by name.
const classOrder = (a: { name: string }, b: { name: string }) =>
  Number(a.name.startsWith("SS")) - Number(b.name.startsWith("SS")) || a.name.localeCompare(b.name);

const ManualEntry = () => {
  const { data: rawClasses = [] } = useClasses();
  const { data: departments = [] } = useDepartments();
  const classes = useMemo(() => [...rawClasses].sort(classOrder), [rawClasses]);
  const enroll = useEnrollStudent();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classId, setClassId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [created, setCreated] = useState<CreatedStudent | null>(null);

  const selectedClass = classes.find((c) => c.id === classId);
  const needsDepartment = !!selectedClass?.isSenior;
  const canSubmit =
    !!firstName.trim() && !!lastName.trim() && !!classId && (!needsDepartment || !!departmentId) && !enroll.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      const student = await enroll.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        classId,
        departmentId: needsDepartment ? departmentId : undefined,
      });
      setCreated(student);
      setFirstName("");
      setLastName("");
    } catch (err) {
      toast.error("Couldn't add student", apiErrorMessage(err));
    }
  };

  return (
    <section className={`${panelClass} overflow-hidden`}>
      <header className="px-6 py-4 border-b border-line">
        <h2 className="font-semibold text-ink">Student details</h2>
      </header>

      <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className={labelClass}>First name</label>
            <input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. Tomiwa" className={inputClass} />
          </div>
          <div>
            <label htmlFor="last-name" className={labelClass}>Last name</label>
            <input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Nurudeen" className={inputClass} />
          </div>
        </div>

        <div className={`grid gap-4 ${needsDepartment ? "sm:grid-cols-2" : "grid-cols-1"}`}>
          <div>
            <label htmlFor="class" className={labelClass}>Class</label>
            <select
              id="class"
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
                setDepartmentId("");
              }}
              className={inputClass}
            >
              <option value="" disabled>
                Choose a class
              </option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {needsDepartment && (
            <div>
              <label htmlFor="department" className={labelClass}>Department</label>
              <select id="department" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} className={inputClass}>
                <option value="" disabled>
                  Choose a department
                </option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <p className="flex items-start gap-2 text-sm text-muted px-3 py-2.5 rounded-lg bg-tint">
          <Info size={16} className="text-brand shrink-0 mt-0.5" />
          The username (e.g. EBS/STU/031) and a temporary password are created automatically and shown after
          you add the student.
        </p>

        <div className="flex justify-end">
          <button type="submit" disabled={!canSubmit} className={primaryButton}>
            {enroll.isPending ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
            {enroll.isPending ? "Adding…" : "Add student"}
          </button>
        </div>
      </form>

      {created && (
        <CredentialsModal
          title="Student added"
          name={`${created.firstName} ${created.lastName}`}
          username={created.username}
          password={created.password}
          onClose={() => setCreated(null)}
        />
      )}
    </section>
  );
};

export default ManualEntry;
