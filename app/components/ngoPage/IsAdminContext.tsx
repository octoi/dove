import React, { createContext, useEffect, useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { userStore } from '@/store/user.store';
import { UserType } from '@/types/user.type';

interface IsAdminContextType {
  isAdmin: boolean;
  creatorId: number;
  user: UserType | null;
}

export const IsAdminContext = createContext<IsAdminContextType>({
  isAdmin: false,
  creatorId: NaN,
  user: null,
});

interface Props {
  ngoCreatorId: number;
}

export const IsAdminContextWrapper: ReactComponent<Props> = ({
  children,
  ngoCreatorId,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    let user = userStore.getState().user;
    if (user) {
      setIsAdmin(user.id == ngoCreatorId);
      setUser(user);
    }
  }, [ngoCreatorId]);

  return (
    <IsAdminContext.Provider value={{ isAdmin, user, creatorId: ngoCreatorId }}>
      {children}
    </IsAdminContext.Provider>
  );
};
