import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminBursarsService, adminTeachersService } from '@/services/admin-staff.service';
import type { UpdateStaffPayload } from '@/types/admin-staff.types';

const TEACHERS = ['adminTeachers'];
const BURSARS = ['adminBursars'];

// Teacher changes also change which class a teacher sees and who teaches each class.
const useRefresh = (key: string[]) => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: key });
    queryClient.invalidateQueries({ queryKey: [`${key[0]}Detail`] });
    if (key === TEACHERS) {
      queryClient.invalidateQueries({ queryKey: ['resultsDashboardInit'] });
      queryClient.invalidateQueries({ queryKey: ['teacherDashboardInit'] });
    }
  };
};

export const useAdminTeachers = () => useQuery({ queryKey: TEACHERS, queryFn: adminTeachersService.getAll });

export const useCreateTeacher = () =>
  useMutation({ mutationFn: adminTeachersService.create, onSuccess: useRefresh(TEACHERS) });

export const useAssignTeacherClass = () =>
  useMutation({
    mutationFn: ({ id, classId }: { id: string; classId: string | null }) =>
      adminTeachersService.assignClass(id, classId),
    onSuccess: useRefresh(TEACHERS),
  });

export const useAdminTeacher = (id: string) =>
  useQuery({ queryKey: ['adminTeachersDetail', id], queryFn: () => adminTeachersService.getOne(id) });

export const useAdminBursar = (id: string) =>
  useQuery({ queryKey: ['adminBursarsDetail', id], queryFn: () => adminBursarsService.getOne(id) });

export const useAdminBursars = () => useQuery({ queryKey: BURSARS, queryFn: adminBursarsService.getAll });

export const useInviteBursar = () =>
  useMutation({ mutationFn: adminBursarsService.invite, onSuccess: useRefresh(BURSARS) });

// Password, remove, restore and delete, for teachers or bursars.
export const useStaffAccountActions = (role: 'teacher' | 'bursar') => {
  const service = role === 'teacher' ? adminTeachersService : adminBursarsService;
  const refresh = useRefresh(role === 'teacher' ? TEACHERS : BURSARS);
  return {
    update: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: UpdateStaffPayload }): Promise<unknown> =>
        service.update(id, payload),
      onSuccess: refresh,
    }),
    setPassword: useMutation({
      mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) => service.setPassword(id, newPassword),
    }),
    remove: useMutation({ mutationFn: (id: string): Promise<unknown> => service.remove(id), onSuccess: refresh }),
    restore: useMutation({ mutationFn: (id: string): Promise<unknown> => service.restore(id), onSuccess: refresh }),
    deletePermanently: useMutation({ mutationFn: (id: string) => service.deletePermanently(id), onSuccess: refresh }),
  };
};
