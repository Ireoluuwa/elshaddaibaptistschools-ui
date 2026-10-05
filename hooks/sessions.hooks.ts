import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sessionsService } from '@/services/sessions.service';
import type {
  CreateSessionPayload,
  CreateTermPayload,
  UpdateReportDetailsPayload,
} from '@/types/session.types';

const SESSIONS_KEY = ['sessions'];

export const useSessions = () =>
  useQuery({
    queryKey: SESSIONS_KEY,
    queryFn: sessionsService.getAll,
  });

// Any term change can affect other terms and the active period, so refresh both.
const useInvalidateSessions = () => {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: SESSIONS_KEY }),
      queryClient.invalidateQueries({ queryKey: ['resultsDashboardInit'] }),
      queryClient.invalidateQueries({ queryKey: ['myResult'] }),
      queryClient.invalidateQueries({ queryKey: ['teacherDashboardInit'] }),
    ]);
};

export const useCreateSession = () => {
  const invalidate = useInvalidateSessions();
  return useMutation({
    mutationFn: (payload: CreateSessionPayload) => sessionsService.create(payload),
    onSuccess: invalidate,
  });
};

export const useAddTerm = () => {
  const invalidate = useInvalidateSessions();
  return useMutation({
    mutationFn: ({ sessionId, payload }: { sessionId: string; payload: CreateTermPayload }) =>
      sessionsService.addTerm(sessionId, payload),
    onSuccess: invalidate,
  });
};

export const useActivateTerm = () => {
  const invalidate = useInvalidateSessions();
  return useMutation({
    mutationFn: (termId: string) => sessionsService.activateTerm(termId),
    onSuccess: invalidate,
  });
};

export const useCloseTerm = () => {
  const invalidate = useInvalidateSessions();
  return useMutation({
    mutationFn: (termId: string) => sessionsService.closeTerm(termId),
    onSuccess: invalidate,
  });
};

export const useUpdateReportDetails = () => {
  const invalidate = useInvalidateSessions();
  return useMutation({
    mutationFn: ({ termId, payload }: { termId: string; payload: UpdateReportDetailsPayload }) =>
      sessionsService.updateReportDetails(termId, payload),
    onSuccess: invalidate,
  });
};
