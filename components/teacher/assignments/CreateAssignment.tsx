"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignment.service";
import { toast } from "@/store/toast.store";
import api from "@/lib/axios"; // For fetching classes

interface CreateAssignmentProps {
  onClose: () => void;
  initialData?: any;
}

const CreateAssignment: React.FC<CreateAssignmentProps> = ({ onClose, initialData }) => {
  const isEditing = !!initialData;
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "");
  const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [classId, setClassId] = useState(initialData?.schoolClass?.id || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: rawClasses = [], isLoading: isLoadingClasses } = useQuery({
    queryKey: ['teacher-classes'],
    queryFn: async () => {
      const { data } = await api.get('/academics/classes');
      return data.data;
    },
    staleTime: 30 * 60 * 1000, 
  });

  const classes = Array.isArray(rawClasses) ? rawClasses : [];

  // Auto-select class if only one exists
  useEffect(() => {
    if (classes.length === 1 && !classId) {
      setClassId(classes[0].id);
    }
  }, [classes, classId]);

  const mutation = useMutation({
    mutationFn: (payload: any) => 
      isEditing 
        ? assignmentService.updateAssignment(initialData.id, payload)
        : assignmentService.createAssignment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(`Assignment ${isEditing ? 'updated' : 'created'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} assignment`);
    }
  });

  const canSubmit = title.trim() !== "" && dueDate !== "" && classId !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    mutation.mutate({
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      classId,
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#006442] rounded-full" />
          {isEditing ? 'Edit Assignment' : 'New Assignment'}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="e.g. Physics Project: Motion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300"
            />
          </div>

          {/* Class Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Target Class
            </label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm transition-all text-gray-600"
            >
              <option value="">Select Class</option>
              {classes.map((cls: any) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Description
          </label>
          <textarea
            placeholder="Briefly describe the assignment..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-sm transition-all placeholder:text-gray-300 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              <CalendarDays size={12} />
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm transition-all text-gray-600 cursor-pointer"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              <CalendarDays size={12} />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-sm transition-all text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        {/* File Upload Placeholder */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Attachment (optional)
          </label>
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/30 text-gray-400 text-xs font-medium cursor-not-allowed opacity-50"
          >
            <Upload size={14} />
            <span>Upload functionality coming soon</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit || mutation.isPending}
            className="h-10 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditing ? "Update Assignment" : "Create Assignment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
