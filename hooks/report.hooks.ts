import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentHistoryService, initTeacherDashboardService, submitReportService } from '@/services/report.service';

export const useInitTeacherDashboard = () => {
  return useQuery({
    queryKey: ['teacherDashboardInit'],
    queryFn: initTeacherDashboardService,
  });
};

export const useSubmitReport = () => {
  return useMutation({
    mutationFn: submitReportService,
  });
};

export const useStudentHistory = (studentId: string, termId: string) => {
  return useQuery({
    queryKey: ['studentHistory', studentId, termId],
    queryFn: () => getStudentHistoryService(studentId, termId),
    enabled: !!studentId && !!termId,
  });
};
