import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "@/services/assignment.service";
import { toast } from "@/store/toast.store";

export const useAssignments = (search = "") => {
  return useInfiniteQuery({
    queryKey: ["assignments", search],
    queryFn: ({ pageParam = 1 }) => assignmentService.getAssignments(pageParam, 10, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
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
