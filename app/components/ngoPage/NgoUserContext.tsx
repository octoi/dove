import React, { createContext, useEffect, useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { userStore } from '@/store/user.store';
import { UserType } from '@/types/user.type';

interface IsAdminContextType {
  isAdmin: boolean;
  isMember: boolean;
  isCreator: boolean;
  creatorId: number;
  user: UserType | null;
}

export const NgoUserContext = createContext<IsAdminContextType>({
  isAdmin: false,
  isMember: false,
  isCreator: false,
  creatorId: NaN,
  user: null,
});

interface Props {
  ngoCreatorId: number;
  members: UserType[];
  admins: UserType[];
}

export const NgoUserContextWrapper: ReactComponent<Props> = ({
  children,
  ngoCreatorId,
  members,
  admins,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    let user = userStore.getState().user;

    if (user) {
      setIsCreator(user.id === ngoCreatorId);

      let _admins = admins.filter((u) => u.id == user?.id);
      setIsAdmin(_admins.length > 0);

      let _members = members.filter((u) => u.id == user?.id);
      setIsMember(_members.length > 0);

      setUser(user);
    }
  }, [ngoCreatorId, members, admins]);

  return (
    <NgoUserContext.Provider
      value={{ isAdmin, isMember, isCreator, user, creatorId: ngoCreatorId }}
    >
      {children}
    </NgoUserContext.Provider>
  );
};
