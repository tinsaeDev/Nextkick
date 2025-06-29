// middleware.ts

import { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';

const PUBLIC_PATHS = ['/signin'];

const isPublic = (pathname: string) => {
  // 1. Whitelisted app routes
  if (
    PUBLIC_PATHS.some(
      (path) => pathname === path || pathname.startsWith(path + '/')
    )
  ) {
    return true;
  }

  // 2. Specifically allow '/feed' itself
  if (pathname === '/feed') {
    return true;
  }

  // 3. Allow anything under '/feed/detail/', but not other '/feed/*'
  if (pathname.startsWith('/feed/detail/')) {
    return true;
  }

  // ✅ 4. NEW: Allow anything under '/feed/user/'
  if (pathname.startsWith('/feed/user/')) {
    return true;
  }

  // 4. Next.js internals & static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/assets/') ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|eot)$/.test(pathname)
  ) {
    return true;
  }

  return false;
};

export default withAuth({
  pages: {
    ...pagesOptions
  },
  callbacks: {
    async authorized({ token, req }: { token: any; req: NextRequest }) {
      const { pathname } = req.nextUrl;

      if (isPublic(pathname)) {
        return true;
      }

      return !!token;
    }
  }
});

export const config = {
  matcher: ['/((?!api/auth).*)']
};
