import React from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { LogoutWrapper } from '../account/LogoutWrapper';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline, IoAddOutline } from 'react-icons/io5';
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

interface Props {
  user: UserType;
}

export const LoggedInUser: React.FC<Props> = ({ user }) => {
  const router = useRouter();

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
          <LogoutWrapper>
            <MenuItem icon={<BiLogOut className='text-lg text-red-600' />}>
              <Button
                colorScheme='red'
                variant='link'
                _hover={{ textDecoration: 'none' }}
              >
                Logout
              </Button>
            </MenuItem>
          </LogoutWrapper>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
