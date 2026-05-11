import { useQuery } from '@tanstack/react-query';
import { academicsService } from '@/services/academics.service';

export const useMappedSubjects = (classId?: string | null, departmentId?: string | null) => {
  return useQuery({
    queryKey: ['mappedSubjects', classId, departmentId ?? null],
    queryFn: () => academicsService.getMappedSubjects(classId!, departmentId),
    enabled: !!classId,
    staleTime: 5 * 60 * 1000, 
  });
};

export const useTeacherClasses = () => {
  return useQuery({
    queryKey: ['teacher-classes'],
    queryFn: () => academicsService.getTeacherClasses(),
    staleTime: 30 * 60 * 1000, // 30 minutes cache
  });
};
