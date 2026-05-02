import { useMutation, useQuery } from '@tanstack/react-query';
import { loginService, getProfileService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { toast } from '@/store/toast.store';

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data) => {
      document.cookie = `token=${data.access_token}; path=/;`;
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

export const useLogout = () => {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);

  return () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    logoutStore();
    
    toast.info("Logged Out", "You have been securely logged out.");
    router.push('/auth/login');
  };
};
