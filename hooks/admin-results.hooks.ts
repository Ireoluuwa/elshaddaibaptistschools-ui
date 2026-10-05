import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminResultsService } from '@/services/admin-results.service';
import type { ClassResultRow } from '@/types/admin-results.types';

export const useResultsOverview = (termId?: string | null) =>
  useQuery({
    queryKey: ['resultsOverview', termId],
    queryFn: () => adminResultsService.overview(termId!),
    enabled: !!termId,
  });

export const useClassResults = (termId?: string | null, classId?: string | null) =>
  useQuery({
    queryKey: ['classResults', termId, classId],
    queryFn: () => adminResultsService.classResults(termId!, classId!),
    enabled: !!termId && !!classId,
  });

export const useSetVpRemark = (termId: string, classId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resultId, vpRemark }: { resultId: string; vpRemark: string | null }) =>
      adminResultsService.setVpRemark(resultId, vpRemark),
    // Update the cached class list in place so the next student opens instantly.
    onSuccess: ({ id, vpRemark }) => {
      queryClient.setQueryData<ClassResultRow[]>(['classResults', termId, classId], (rows) =>
        rows?.map((r) => (r.result?.id === id ? { ...r, result: { ...r.result, vpRemark } } : r)),
      );
      queryClient.invalidateQueries({ queryKey: ['studentResult'] });
    },
  });
};
