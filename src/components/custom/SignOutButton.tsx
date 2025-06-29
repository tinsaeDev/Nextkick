import { Button } from '../ui/button';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant='ghost'
      onClick={() => {
        setLoading(true);
        signOut();
      }}
      disabled={loading}
      size={'sm'}
    >
      Logout
    </Button>
  );
}
