import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { hClient } from '@/lib/hono-client';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof hClient.api.user.$post>;
type RequestType = InferRequestType<typeof hClient.api.user.$post>['json'];

export const useSignUp = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await hClient.api.user.$post({ json: data });
      return response.json();
    },
    onSuccess: () => {
      toast.success('User created successfully');
      router.push('/sign-in');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
