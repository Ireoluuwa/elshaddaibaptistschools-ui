import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { curriculumService } from '@/services/curriculum.service';
import type { UpdateCurriculumPayload } from '@/types/curriculum.types';

const keys = {
  classes: ['classes'],
  departments: ['departments'],
  catalog: ['subjectCatalog'],
  curriculum: (classId: string) => ['curriculum', classId],
};

export const useClasses = () =>
  useQuery({ queryKey: keys.classes, queryFn: curriculumService.getClasses });

export const useDepartments = () =>
  useQuery({ queryKey: keys.departments, queryFn: curriculumService.getDepartments });

export const useSubjectCatalog = () =>
  useQuery({ queryKey: keys.catalog, queryFn: curriculumService.getSubjectCatalog });

export const useCurriculum = (classId?: string | null) =>
  useQuery({
    queryKey: keys.curriculum(classId ?? ''),
    queryFn: () => curriculumService.getCurriculum(classId!),
    enabled: !!classId,
  });

export const useAddClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: curriculumService.addClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.classes });
      queryClient.invalidateQueries({ queryKey: ['teacher-classes'] });
    },
  });
};

export const useSetNextClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, nextClassId }: { id: string; nextClassId: string | null }) =>
      curriculumService.setNextClass(id, nextClassId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.classes });
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
  });
};

// Department changes alter every senior class's tabs.
const useInvalidateDepartments = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: keys.departments });
    queryClient.invalidateQueries({ queryKey: ['curriculum'] });
  };
};

export const useAddDepartment = () => {
  const invalidate = useInvalidateDepartments();
  return useMutation({ mutationFn: curriculumService.addDepartment, onSuccess: invalidate });
};

export const useRemoveDepartment = () => {
  const invalidate = useInvalidateDepartments();
  return useMutation({ mutationFn: curriculumService.removeDepartment, onSuccess: invalidate });
};

export const useSaveCurriculum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, payload }: { classId: string; payload: UpdateCurriculumPayload }) =>
      curriculumService.saveCurriculum(classId, payload),
    onSuccess: (saved) => {
      queryClient.setQueryData(keys.curriculum(saved.classId), saved);
      queryClient.invalidateQueries({ queryKey: keys.catalog });
      // Teachers' subject lists for result entry.
      queryClient.invalidateQueries({ queryKey: ['mappedSubjects'] });
      queryClient.invalidateQueries({ queryKey: ['resultSubjects'] });
    },
  });
};
