import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignment.service";
import { toast } from "@/store/toast.store";

export const useAssignments = (search = "", status = "") => {
  return useInfiniteQuery({
    queryKey: ["assignments", search, status],
    queryFn: ({ pageParam = 1 }) => assignmentService.getAssignments(pageParam, 10, search, status),
    initialPageParam: 1,
    retry: false, 
    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta) return undefined;
      const next = lastPage.meta.currentPage + 1;
      return next <= lastPage.meta.totalPages ? next : undefined;
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => assignmentService.deleteAssignment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success("Assignment deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete assignment");
    },
  });
};
export const useStudentAssignments = (page = 1) => {
  return useQuery({
    queryKey: ['student-assignments', page],
    queryFn: () => assignmentService.getStudentAssignments(page),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
