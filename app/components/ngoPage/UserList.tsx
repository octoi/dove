import React, { useContext } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { NgoUserContext } from './NgoUserContext';
import { SlOptions } from 'react-icons/sl';

interface Props {
  users: UserType[];
  title: string;
}

export const UserList: React.FC<Props> = ({ users, title }) => {
  const { isAdmin, user: currentUser } = useContext(NgoUserContext);

  return (
    <div>
      <Text mb={5} fontSize='xl' fontWeight='semibold'>
        {title} ({users.length})
      </Text>
      {users.map((user) => (
        <Flex
          mb={5}
          key={user.id}
          alignItems='center'
          justifyContent='space-between'
        >
          <Link key={user.id} href={`${Paths.user}/${user.email}`}>
            <Flex alignItems='center' className='group'>
              <Avatar src={user.profile} name={user.name} />
              <div className='ml-3'>
                <Text
                  fontSize='xl'
                  fontWeight='medium'
                  className='group-hover:underline underline-offset-2'
                >
                  {user.name}
                </Text>
                <Text>{user.email}</Text>
              </div>
            </Flex>
          </Link>
          {currentUser && currentUser.id != user.id && isAdmin && (
            <IconButton
              variant='ghost'
              aria-label='options'
              icon={<SlOptions />}
            />
          )}
        </Flex>
      ))}
    </div>
  );
};
