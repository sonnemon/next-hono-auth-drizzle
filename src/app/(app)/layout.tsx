'use client';

import { SessionProvider } from '@hono/auth-js/react';
import ReactQueryProvider from '@/providers/react-query-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={1000} refetchOnWindowFocus={false}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}
