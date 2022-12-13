import React, { useEffect } from 'react';
import { ReactComponent } from '@/types/react.type';
import { userStore } from '@/store/user.store';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';

// redirect to login page if not logged in
export const AuthWrapper: ReactComponent = ({ children }) => {
  const router = useRouter();
  const user = userStore.getState().user;

  useEffect(() => {
    if (!user) {
      router.push(`${Paths.login}?next=${router.pathname}`); // passing current path in order to redirect back to same page after login
    }
  }, []);

  return user ? <>{children}</> : <></>;
};
