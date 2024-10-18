import { AppType } from '@/app/api/[[...route]]/route';
import { hc } from 'hono/client';

export const hClient = hc<AppType>('');
