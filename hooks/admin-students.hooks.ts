import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminStudentsService } from '@/services/admin-students.service';

export const useAdminStudents = () =>
  useQuery({
    queryKey: ['adminStudents'],
    queryFn: adminStudentsService.getAll,
  });

export const useAdminStudent = (id?: string | null) =>
  useQuery({
    queryKey: ['adminStudent', id],
    queryFn: () => adminStudentsService.getOne(id!),
    enabled: !!id,
  });

export const useSetStudentPassword = () =>
  useMutation({
    mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) =>
      adminStudentsService.setPassword(id, newPassword),
  });

// Class and status changes affect the admin lists and teachers' class lists.
const useInvalidateStudents = () => {
  const queryClient = useQueryClient();
  return () =>
    Promise.all(
      [['adminStudents'], ['adminStudent'], ['resultsDashboardInit'], ['teacherDashboardInit']].map((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      ),
    );
};

export const useChangeStudentClass = () => {
  const invalidate = useInvalidateStudents();
  return useMutation({
    mutationFn: ({ id, classId, departmentId }: { id: string; classId: string; departmentId?: string }) =>
      adminStudentsService.changeClass(id, { classId, departmentId }),
    onSuccess: invalidate,
  });
};

export const useRemoveStudent = () => {
  const invalidate = useInvalidateStudents();
  return useMutation({ mutationFn: adminStudentsService.remove, onSuccess: invalidate });
};

export const useRestoreStudent = () => {
  const invalidate = useInvalidateStudents();
  return useMutation({ mutationFn: adminStudentsService.restore, onSuccess: invalidate });
};

export const useDeleteStudent = () => {
  const invalidate = useInvalidateStudents();
  return useMutation({ mutationFn: adminStudentsService.deletePermanently, onSuccess: invalidate });
};
