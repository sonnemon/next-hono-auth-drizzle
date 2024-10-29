import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { Hono, Context } from 'hono';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from '@auth/core/providers/credentials';
import { AuthConfig, initAuthConfig, authHandler } from '@hono/auth-js';
import { users, accounts, sessions, verificationTokens } from '@/db/schema';

function getAuthConfig(_c: Context): AuthConfig {
  return {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens
    }),
    secret: process.env.AUTH_SECRET,
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {}
        },
        authorize: async (credentials) => {
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email as string)
          });
          return user ?? null;
        }
      })
    ],
    pages: {
      signIn: '/sign-in'
    },
    callbacks: {
      jwt: async ({ token, user, trigger, session }) => {
        if (trigger === 'update') {
          await db
            .update(users)
            .set({ name: session.name })
            .where(eq(users.id, token.userId as string));
          token = { ...token, ...session };
        }
        if (trigger == 'signIn' && user) {
          token.userId = user.id!;
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user.id = token.userId;
        return session;
      }
    },
    session: {
      strategy: 'jwt'
    }
  };
}

const app = new Hono()
  .use('*', initAuthConfig(getAuthConfig))
  .use('/auth/*', authHandler());

export default app;
