import { api } from "./auth.service";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  attachmentUrl?: string;
  status: "Active" | "Past Due" | "Draft";
  hasAttachment: boolean; // Computed on frontend if needed, or returned from backend
}

export interface PaginatedAssignments {
  data: Assignment[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export const assignmentService = {
  getAssignments: async (page = 1, limit = 10, search = "") => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) params.append("search", search);

    const { data } = await api.get<PaginatedAssignments>(`/assignments?${params.toString()}`);
    return data;
  },

  getAssignmentDetails: async (id: string) => {
    const { data } = await api.get<Assignment>(`/assignments/${id}`);
    return data;
  },

  createAssignment: async (payload: any) => {
    const { data } = await api.post("/assignments", payload);
    return data;
  },

  updateAssignment: async (id: string, payload: any) => {
    const { data } = await api.patch(`/assignments/${id}`, payload);
    return data;
  },

  deleteAssignment: async (id: string) => {
    const { data } = await api.delete(`/assignments/${id}`);
    return data;
  },
};
