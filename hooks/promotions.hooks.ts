import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { promotionsService } from '@/services/promotions.service';
import type { PromotionDecision } from '@/types/promotions.types';

export const usePromotionSummary = () =>
  useQuery({ queryKey: ['promotions', 'summary'], queryFn: promotionsService.summary });

export const useClassPromotion = (classId?: string | null) =>
  useQuery({
    queryKey: ['promotions', 'class', classId],
    queryFn: () => promotionsService.forClass(classId!),
    enabled: !!classId,
  });

const useRefreshPromotions = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['promotions'] });
};

export const useSavePromotion = () =>
  useMutation({
    mutationFn: ({ classId, decisions }: { classId: string; decisions: PromotionDecision[] }) =>
      promotionsService.save(classId, decisions),
    onSuccess: useRefreshPromotions(),
  });

export const useUndoPromotion = () =>
  useMutation({ mutationFn: (classId: string) => promotionsService.undo(classId), onSuccess: useRefreshPromotions() });
