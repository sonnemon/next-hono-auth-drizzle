import { NextRequest, NextResponse } from 'next/server';
import {
  apiRoute,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from '@/route';

export async function middleware(req: NextRequest) {
  const sessionRequest = await fetch(`${process.env.AUTH_URL}/session`, {
    headers: {
      Cookie: req.headers.get('cookie') || ''
    }
  });
  const session = await sessionRequest.json();

  const { nextUrl } = req;
  const isLoggedIn = !!session?.user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiRoute);

  if (isApiAuthRoute) return undefined;
  if (isApiRoute) return undefined;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }
  return undefined;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
