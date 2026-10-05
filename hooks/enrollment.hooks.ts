import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentService } from '@/services/enrollment.service';

// New students appear in admin lists, teacher class lists and promotion.
const useRefreshStudents = () => {
  const queryClient = useQueryClient();
  return () =>
    ['adminStudents', 'resultsDashboardInit', 'teacherDashboardInit', 'promotions', 'resultsOverview', 'classResults'].forEach(
      (key) => queryClient.invalidateQueries({ queryKey: [key] }),
    );
};

export const useEnrollStudent = () =>
  useMutation({ mutationFn: enrollmentService.enrollOne, onSuccess: useRefreshStudents() });

export const useEnrollFromCsv = () =>
  useMutation({ mutationFn: enrollmentService.enrollFromCsv, onSuccess: useRefreshStudents() });
