'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@hono/auth-js/react';

export default function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
