import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import authRouter from '@/server/auth';
import userRouter from '@/server/user';

// export const runtime = 'edge';

const app = new Hono({ strict: false })
  .basePath('/api')
  .route('/', authRouter)
  .route('/user', userRouter);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
