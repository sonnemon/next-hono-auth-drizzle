import { hClient } from '@/lib/hono-client';
import { useQuery } from '@tanstack/react-query';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await hClient.api.user[':userId'].$get({ param: { userId } });
      return res.json();
    },
    enabled: !!userId
  });
};
