import React from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { removeToken } from '@/utils/cookie';
import { userStore } from '@/store/user.store';
import { IoSettingsOutline, IoAddOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  user: UserType;
}

export const LoggedInUser: React.FC<Props> = ({ user }) => {
  const { removeUser } = userStore.getState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const router = useRouter();

  return (
    <>
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
            <MenuItem
              icon={<BiLogOut className='text-lg text-red-600' />}
              onClick={onOpen}
            >
              <Button
                colorScheme='red'
                variant='link'
                _hover={{ textDecoration: 'none' }}
              >
                Logout
              </Button>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want to logout.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  removeToken();
                  removeUser();

                  onClose();
                  router.push(Paths.login);
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
