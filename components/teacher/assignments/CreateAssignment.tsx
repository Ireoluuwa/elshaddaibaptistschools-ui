"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  CalendarDays,
  Loader2,
  Trash2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignment.service";
import { storageService } from "@/services/storage.service";
import { useTeacherClasses } from "@/hooks/academics.hooks";
import { toast } from "@/store/toast.store";

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
  const [classId, setClassId] = useState(
    initialData?.schoolClass?.id || 
    initialData?.classId || 
    initialData?.schoolClassId || 
    ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState(initialData?.attachmentUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: rawClasses = [], isLoading: isLoadingClasses } = useTeacherClasses();
  const classes = Array.isArray(rawClasses) ? rawClasses : [];

  // Sync classId if initialData changes
  useEffect(() => {
    if (initialData) {
      const id = initialData?.schoolClass?.id || initialData?.classId || initialData?.schoolClassId;
      if (id) setClassId(id);
    }
  }, [initialData]);

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

  const canSubmit = title.trim() !== "" && dueDate !== "" && classId !== "" && !isUploading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    let finalAttachmentUrl = attachmentUrl;

    // 1. Upload file if selected
    if (selectedFile) {
      setIsUploading(true);
      try {
        finalAttachmentUrl = await storageService.uploadAssignmentFile(selectedFile);
        setAttachmentUrl(finalAttachmentUrl);
      } catch (error: any) {
        toast.error("Failed to upload attachment: " + error.message);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    // 2. Mutate with the (new or existing) attachment URL
    mutation.mutate({
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      classId,
      attachmentUrl: finalAttachmentUrl,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAttachmentUrl("");
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
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-base transition-all placeholder:text-gray-300"
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
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-base transition-all text-gray-600"
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
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#006442] focus:ring-1 focus:ring-[#006442] outline-none text-base transition-all placeholder:text-gray-300 resize-none"
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
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-base transition-all text-gray-600 cursor-pointer"
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
              className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white focus:border-[#006442] outline-none text-base transition-all text-gray-600 cursor-pointer"
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Attachment (optional)
          </label>
          
          <input 
            type="file" 
            ref={fileRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />

          {!selectedFile && !attachmentUrl ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/30 text-gray-400 text-xs font-medium hover:bg-gray-100 hover:border-[#006442]/30 transition-all"
            >
              <Upload size={14} />
              <span>Click to upload assignment file</span>
            </button>
          ) : (
            <div className="flex items-center justify-between p-4 bg-[#006442]/5 border border-[#006442]/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#006442]/10 flex items-center justify-center text-[#006442]">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 truncate max-w-[200px]">
                    {selectedFile ? selectedFile.name : "Attached File"}
                  </p>
                  <p className="text-[10px] text-[#006442] font-medium tracking-tight">
                    {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "File uploaded"}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleRemoveFile}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
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
            disabled={!canSubmit || mutation.isPending || isUploading}
            className="h-10 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending || isUploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {isUploading ? "Uploading..." : (isEditing ? "Updating..." : "Creating...")}
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
