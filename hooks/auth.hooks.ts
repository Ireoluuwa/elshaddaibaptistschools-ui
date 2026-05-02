import { useMutation, useQuery } from '@tanstack/react-query';
import { loginService, getProfileService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      document.cookie = `token=${data.token}; path=/;`;
      setUser(data.user);
    },
  });
};

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileService,
  });
};
