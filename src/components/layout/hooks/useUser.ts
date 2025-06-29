import { useSession } from 'next-auth/react';

export function useUser() {
  const user = useSession().data?.user;
  return {
    user: {
      imageUrl: user?.image!,
      fullName: user?.name || '',
      emailAddresses: [{ emailAddress: user?.email || '' }]
    }
  };
}
