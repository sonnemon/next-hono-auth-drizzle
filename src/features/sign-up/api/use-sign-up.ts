import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { hClient } from '@/lib/hono-client';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof hClient.api.user.$post>;
type RequestType = InferRequestType<typeof hClient.api.user.$post>['json'];

export const useSignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const request = await hClient.api.user.$post({ json: data });
      const response = await request.json();
      if ('error' in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      toast({
        title: 'User created successfully',
        description: 'You can now sign in',
      });
      router.push('/sign-in');
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return mutation;
};
