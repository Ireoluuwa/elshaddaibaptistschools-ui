import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  bulkUpsertResultsService,
  getMyResultService,
  getResultSubjectsService,
  getStudentResultService,
  initResultsDashboardService,
  upsertResultService,
} from '@/services/result.service';
import { UpsertResultPayload, BulkUpsertResultPayload } from '@/types/result';

export const useResultsDashboardInit = () => {
  return useQuery({
    queryKey: ['resultsDashboardInit'],
    queryFn: initResultsDashboardService,
  });
};

export const useStudentResult = (studentId: string, termId: string) => {
  return useQuery({
    queryKey: ['studentResult', studentId, termId],
    queryFn: () => getStudentResultService(studentId, termId),
    enabled: !!studentId && !!termId,
  });
};

export const useResultSubjects = (studentId: string) => {
  return useQuery({
    queryKey: ['resultSubjects', studentId],
    queryFn: () => getResultSubjectsService(studentId),
    enabled: !!studentId,
  });
};

export const useMyResult = (termId?: string) => {
  return useQuery({
    queryKey: ['myResult', termId],
    queryFn: () => getMyResultService(termId),
  });
};

export const useUpsertResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpsertResultPayload) => upsertResultService(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['studentResult', variables.studentId, variables.termId] });
      queryClient.invalidateQueries({ queryKey: ['resultsDashboardInit'] });
    },
  });
};

export const useBulkUpsertResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BulkUpsertResultPayload) => bulkUpsertResultsService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resultsDashboardInit'] });
    },
  });
};
