import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { createHash } from 'crypto';
import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth';

/**
 * Get user session from for  server side
 * @returns
 */
export async function auth() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function session() {
  return auth();
}

export async function getUser() {
  const session = (await auth()) as unknown as Session;
  return session?.user;
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
