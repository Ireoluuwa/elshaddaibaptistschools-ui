import api from "@/lib/axios";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  attachmentUrl?: string;
  status: "Active" | "Past Due" | "Draft";
  hasAttachment: boolean;
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
  getAssignments: async (page = 1, limit = 10, search = "", status = "") => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) params.append("search", search);
    if (status) params.append("filter.status", status);

    const { data } = await api.get<any>(`/assignments?${params.toString()}`);
    // Handle wrapped response structure
    return data.data || data;
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
