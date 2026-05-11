import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getStudentProfile, updateStudentProfile, getTeacherProfile, updateTeacherProfile, changePassword } from '@/services/profile.service';
import { storageService } from '@/services/storage.service';

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

export const useTeacherProfile = () => {
  return useQuery({
    queryKey: ['teacher-profile'],
    queryFn: getTeacherProfile,
  });
};

export const useUpdateTeacherProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeacherProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-profile'] });
    },
  });
};

export const useSuspenseTeacherProfile = () => {
  return useSuspenseQuery({
    queryKey: ['teacher-profile'],
    queryFn: getTeacherProfile,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useUploadStudentAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, profileId }: { file: File; profileId: string }) => {
      const avatarUrl = await storageService.uploadProfileImage(file, profileId);
      return updateStudentProfile({ avatarUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
    },
  });
};

export const useUploadTeacherAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, profileId }: { file: File; profileId: string }) => {
      const avatarUrl = await storageService.uploadProfileImage(file, profileId);
      return updateTeacherProfile({ avatarUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-profile'] });
    },
  });
};
