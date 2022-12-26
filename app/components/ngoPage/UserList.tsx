import React, { useContext } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { NgoUserContext } from './NgoUserContext';
import { SlOptions } from 'react-icons/sl';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { IoBan } from 'react-icons/io5';
import { RxReload } from 'react-icons/rx';
import { UserType } from '@/types/user.type';
import { DocumentNode, useMutation } from '@apollo/client';
import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';

interface Props {
  users: UserType[];
  title: string;
  ngoId: string;
  refetch: any;
  userAdminOption: {
    title: string;
    mutation: DocumentNode;
  };
}

export const UserList: React.FC<Props> = ({
  users,
  title,
  refetch,
  ngoId,
  userAdminOption,
}) => {
  const toast = useToast();

  const { isAdmin, user: currentUser } = useContext(NgoUserContext);

  const [userAdminFunction] = useMutation(userAdminOption.mutation);

  return (
    <div>
      <Flex mb={5} alignItems='center'>
        <Text fontSize='xl' fontWeight='semibold'>
          {title} ({users.length})
        </Text>
        <IconButton
          ml={3}
          aria-label='refetch'
          variant='outline'
          onClick={() => refetch()}
          icon={<RxReload className='text-lg' />}
        />
      </Flex>
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
            <Menu>
              <MenuButton>
                <IconButton
                  variant='ghost'
                  aria-label='options'
                  icon={<SlOptions />}
                />
              </MenuButton>
              <MenuList>
                <Link href={`${Paths.user}/${user.email}`}>
                  <MenuItem icon={<BiDetail className='text-lg' />}>
                    View details
                  </MenuItem>
                </Link>
                <MenuItem
                  icon={<MdOutlineAdminPanelSettings className='text-lg' />}
                  onClick={() => {
                    userAdminFunction({
                      variables: { ngoId, userId: Number(user.id) },
                    })
                      .then(() => {
                        refetch();
                        toast({
                          title: 'Permission changed successfully.',
                          position: 'top-right',
                          duration: 3000,
                          status: 'success',
                        });
                      })
                      .catch((err) => {
                        toast({
                          title: 'Failed to change user permission.',
                          position: 'top-right',
                          duration: 3000,
                          status: 'error',
                        });
                      });
                  }}
                >
                  {userAdminOption.title}
                </MenuItem>
                <MenuItem color='red.500' icon={<IoBan className='text-lg' />}>
                  Kick user
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      ))}
    </div>
  );
};
