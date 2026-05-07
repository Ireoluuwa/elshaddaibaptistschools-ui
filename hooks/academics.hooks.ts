import { useQuery } from '@tanstack/react-query';
import { getMappedSubjectsService } from '@/services/academics.service';

export const useMappedSubjects = (classId?: string | null, departmentId?: string | null) => {
  return useQuery({
    queryKey: ['mappedSubjects', classId, departmentId ?? null],
    queryFn: () => getMappedSubjectsService(classId!, departmentId),
    enabled: !!classId,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes — subject lists rarely change
  });
};
