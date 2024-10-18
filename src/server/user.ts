import { z } from 'zod';
import { db } from '@/db';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { users, insertUserSchema } from '@/db/users';
import { zValidator } from '@hono/zod-validator';
import { hashPassword } from '@/utils/password';

const app = new Hono()
  .get(
    '/:userId',
    zValidator('param', z.object({ userId: z.string() })),
    async (c) => {
      const { userId } = c.req.valid('param');
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
      });
      return c.json(user);
    }
  )
  .post(
    '/',
    zValidator(
      'json',
      insertUserSchema.pick({ name: true, email: true, password: true })
    ),
    async (c) => {
      const { name, email, password } = c.req.valid('json');

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
      });
      if (existingUser) return c.json({ error: 'User already exists' }, 400);

      const hashedPassword = await hashPassword(password!);

      const user = await db
        .insert(users)
        .values({ name, email, password: hashedPassword })
        .returning();
      return c.json(user);
    }
  );

export default app;
