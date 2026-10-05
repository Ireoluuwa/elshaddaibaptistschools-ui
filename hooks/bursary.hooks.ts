import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bursaryService } from '@/services/bursary.service';
import type { SaveBillPayload } from '@/types/bursary.types';

export const useBursaryTerms = () => useQuery({ queryKey: ['bursary', 'terms'], queryFn: bursaryService.terms });

export const useBursaryOverview = (termId?: string) =>
  useQuery({ queryKey: ['bursary', 'overview', termId ?? 'active'], queryFn: () => bursaryService.overview(termId) });

export const useClassBills = (termId?: string) =>
  useQuery({ queryKey: ['bursary', 'bills', termId ?? 'active'], queryFn: () => bursaryService.bills(termId) });

export const useClassFees = (classId?: string | null, termId?: string) =>
  useQuery({
    queryKey: ['bursary', 'fees', classId, termId ?? 'active'],
    queryFn: () => bursaryService.fees(classId!, termId),
    enabled: !!classId,
  });

// Any save can change totals, holds and printed fee lines.
const useRefreshBursary = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['bursary'] });
    queryClient.invalidateQueries({ queryKey: ['studentResult'] });
    queryClient.invalidateQueries({ queryKey: ['myResult'] });
  };
};

export const useSaveBill = () =>
  useMutation({
    mutationFn: ({ termId, classId, payload }: { termId: string; classId: string; payload: SaveBillPayload }) =>
      bursaryService.saveBill(termId, classId, payload),
    onSuccess: useRefreshBursary(),
  });

export const useSaveFees = () =>
  useMutation({
    mutationFn: ({ termId, fees }: { termId: string; fees: { studentId: string; outstanding: number }[] }) =>
      bursaryService.saveFees(termId, fees),
    onSuccess: useRefreshBursary(),
  });
