"use client";

import React, { useRef, useState } from "react";
import { Download, FileSpreadsheet, Info, Loader2, Upload, X } from "lucide-react";
import { panelClass, primaryButton, secondaryButton } from "@/components/admin/shared/AdminModal";
import { csvRequirements } from "@/constants/teacher/students.constants";
import { useEnrollFromCsv } from "@/hooks/enrollment.hooks";
import { apiErrorMessage } from "@/lib/api-error";
import { toast } from "@/store/toast.store";
import type { CreatedStudent } from "@/types/enrollment.types";

const TEMPLATE =
  "first_name,last_name,class,department\nTomiwa,Nurudeen,JSS1,\nIfeoma,Okafor,SS1,Science\n";

const downloadCsv = (fileName: string, content: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

// Quote a CSV value only when it needs it.
const csvValue = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

const BatchUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [created, setCreated] = useState<CreatedStudent[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useEnrollFromCsv();

  const pickFile = (f?: File) => {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".csv")) {
      toast.error("Not a CSV file", "Save the spreadsheet as CSV, then upload it.");
      return;
    }
    setFile(f);
    setCreated(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { students } = await upload.mutateAsync(file);
      setCreated(students);
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.success("Students added", `${students.length} student${students.length === 1 ? "" : "s"} enrolled.`);
    } catch (err) {
      toast.error("Upload failed", apiErrorMessage(err));
    }
  };

  const downloadCredentials = () => {
    if (!created) return;
    const rows = created.map((s) =>
      [s.firstName, s.lastName, s.className, s.department ?? "", s.username, s.password].map(csvValue).join(","),
    );
    downloadCsv(
      `student-sign-in-details-${new Date().toISOString().slice(0, 10)}.csv`,
      ["first_name,last_name,class,department,username,password", ...rows].join("\n"),
    );
  };

  return (
    <section className={`${panelClass} overflow-hidden`}>
      <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-line">
        <div>
          <h2 className="font-semibold text-ink">Upload a CSV</h2>
          <p className="text-sm text-muted mt-0.5">Add many students at once.</p>
        </div>
        <button type="button" onClick={() => downloadCsv("students-template.csv", TEMPLATE)} className={secondaryButton}>
          <Download size={16} /> Download template
        </button>
      </header>

      <div className="px-6 py-5 flex flex-col gap-5">
        {created ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-lg bg-clay-soft border-l-4 border-clay">
              <p className="flex-1 text-sm text-ink">
                <span className="font-semibold">{created.length} students added.</span> Each one signs in with their
                username and the password <span className="font-semibold">1234</span>.
              </p>
              <button onClick={downloadCredentials} className={`${primaryButton} self-start sm:self-auto`}>
                <Download size={16} /> Download sign-in details
              </button>
            </div>

            <div className="rounded-lg border border-line overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-canvas text-xs text-muted">
                  <tr>
                    <th className="text-left font-medium px-4 py-2">Student</th>
                    <th className="text-left font-medium px-4 py-2">Class</th>
                    <th className="text-left font-medium px-4 py-2">Username</th>
                    <th className="text-left font-medium px-4 py-2">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {created.map((s) => (
                    <tr key={s.id}>
                      <td className="px-4 py-2 text-ink whitespace-nowrap">
                        {s.lastName} {s.firstName}
                      </td>
                      <td className="px-4 py-2 text-muted whitespace-nowrap">
                        {s.className} {s.department ?? ""}
                      </td>
                      <td className="px-4 py-2 font-medium text-ink tabular-nums whitespace-nowrap">{s.username}</td>
                      <td className="px-4 py-2 font-mono text-ink tracking-wider whitespace-nowrap">{s.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setCreated(null)} className={secondaryButton}>
                Upload another file
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => {
                handleDrag(e);
                pickFile(e.dataTransfer.files?.[0]);
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 p-10 rounded-lg border border-dashed cursor-pointer transition-colors ${
                dragActive ? "border-brand bg-tint" : file ? "border-brand bg-tint/50" : "border-muted/40 hover:border-brand hover:bg-tint/50"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                onChange={(e) => pickFile(e.target.files?.[0])}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center gap-3">
                  <FileSpreadsheet size={22} className="text-brand" />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-ink">{file.name}</span>
                    <span className="text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                    aria-label="Remove file"
                    className="ml-2 p-1.5 text-muted hover:text-danger rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={22} className="text-brand" />
                  <span className="text-center">
                    <span className="block text-sm font-semibold text-ink">Drop your CSV file here</span>
                    <span className="block text-xs text-muted mt-0.5">or click to choose one</span>
                  </span>
                </>
              )}
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-ink mb-2">
                <Info size={14} className="text-brand" /> CSV requirements
              </p>
              <ul className="flex flex-col gap-1 text-sm text-muted list-disc pl-5">
                {csvRequirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={handleUpload} disabled={!file || upload.isPending} className={primaryButton}>
                {upload.isPending ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {upload.isPending ? "Adding students…" : "Upload and add students"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BatchUpload;
