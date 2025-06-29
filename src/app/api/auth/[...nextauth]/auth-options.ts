import type { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import LinkedinProvider from 'next-auth/providers/linkedin';
import { pagesOptions } from './pages-options';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { cookies } from 'next/headers';
import { prismaClient } from '@/lib/dbClient';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  pages: {
    ...pagesOptions
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    // Called during sign-in process
    async signIn({ user, account }) {
      return true;
    },

    // Called when JWT is created or updated
    async jwt({ token, account, user }) {
      if (user) {
        token.user = { ...(user as Session['user']) };
      }
      if (account && user) {
        const cookieStore = await cookies();
        const role = cookieStore.get('user-role')?.value;
      }

      return token;
    },

    // Called whenever a session is checked
    async session({ session, token }) {
      if (session.user) {
      }
      return session;
    },

    // Called during redirection after sign-in or sign-out
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || ''
    })
  ]
};
