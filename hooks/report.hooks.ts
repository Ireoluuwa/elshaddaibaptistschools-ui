import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStudentHistoryService, initTeacherDashboardService, submitReportService } from '@/services/report.service';

export const useInitTeacherDashboard = () => {
  return useQuery({
    queryKey: ['teacherDashboardInit'],
    queryFn: initTeacherDashboardService,
  });
};

export const useSubmitReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReportService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherDashboardInit'] });
      queryClient.invalidateQueries({ queryKey: ['studentHistory'] });
    },
  });
};

export const useStudentHistory = (studentId: string, termId: string) => {
  return useQuery({
    queryKey: ['studentHistory', studentId, termId],
    queryFn: () => getStudentHistoryService(studentId, termId),
    enabled: !!studentId && !!termId,
  });
};
