import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentProfile, updateStudentProfile, changePassword } from '@/services/profile.service';

export const useStudentProfile = () => {
  return useQuery({
    queryKey: ['student-profile'],
    queryFn: getStudentProfile,
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
