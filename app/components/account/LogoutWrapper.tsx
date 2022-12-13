import React from 'react';
import { ReactComponent } from '@/types/react.type';
import { userStore } from '@/store/user.store';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { removeToken } from '@/utils/cookie';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export const LogoutWrapper: ReactComponent = ({ children }) => {
  const { removeUser } = userStore.getState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const router = useRouter();

  return (
    <>
      <div onClick={onOpen}>{children}</div>
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
