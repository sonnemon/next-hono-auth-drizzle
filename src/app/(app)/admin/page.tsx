'use client';

import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signOut, useSession } from '@hono/auth-js/react';
import { BellRing, Check } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().min(3),
});

export default function Admin() {
  // The useSession hook is making frequent requests to keep the session data up-to-date.
  // This behavior is likely due to the default configuration of the SessionProvider
  // in the parent layout component. To reduce the number of requests, you can:
  // 1. Increase the refetchInterval in the SessionProvider
  // 2. Set refetchOnWindowFocus to false in the SessionProvider
  // 3. Use the required: true option in useSession to only fetch when necessary
  const { data: session, status, update } = useSession({ required: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  if (status === 'loading') return <div>Loading...</div>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    update(values);
    console.log(values);
  }
  console.log('session', session);
  return (
    <div>
      <Card className={'w-[380px]'}>
        <CardHeader>
          <CardTitle>{session.user.name}</CardTitle>
          <CardDescription>{session.user.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              id="profile-form"
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex space-x-2">
          <Button type="submit" form="profile-form" className="w-full">
            Update Profile
          </Button>
          <Button className="w-full" onClick={() => signOut()}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
