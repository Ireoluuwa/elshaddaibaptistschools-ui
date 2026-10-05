import { useQuery } from '@tanstack/react-query';
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
