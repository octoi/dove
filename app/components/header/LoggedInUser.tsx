import React from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline, IoAddOutline } from 'react-icons/io5';
import { PermissionWrapper } from '../PermissionWrapper';
import { userStore } from '@/store/user.store';
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { removeToken } from '@/utils/cookie';

interface Props {
  user: UserType;
}

export const LoggedInUser: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { removeUser } = userStore.getState();

  return (
    <Menu>
      <MenuButton>
        <Avatar src={user.profile} name={user.name} />
      </MenuButton>
      <MenuList>
        <MenuGroup title='Ngo'>
          <MenuItem
            icon={<IoAddOutline className='text-lg' />}
            onClick={() => router.push(Paths.createNgo)}
          >
            Create ngo
          </MenuItem>
        </MenuGroup>
        <MenuGroup title='Profile'>
          <MenuItem
            onClick={() => router.push(`${Paths.user}/${user.email}`)}
            icon={<CgProfile className='text-lg' />}
          >
            Profile
          </MenuItem>
          <MenuItem
            icon={<IoSettingsOutline className='text-lg' />}
            onClick={() => router.push(Paths.settings)}
          >
            Settings
          </MenuItem>
          <PermissionWrapper
            description='Are you sure you want to logout ?'
            placeholder='Logout'
            onClick={() => {
              removeUser();
              removeToken();
              router.push(Paths.login);
            }}
          >
            <MenuItem icon={<BiLogOut className='text-lg text-red-600' />}>
              <Button
                colorScheme='red'
                variant='link'
                _hover={{ textDecoration: 'none' }}
              >
                Logout
              </Button>
            </MenuItem>
          </PermissionWrapper>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
