import React from 'react';
import { ReactComponent } from '@/types/react.type';
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

interface Props {
  description: string;
  placeholder: string;
  onClick: () => void;
}

export const PermissionWrapper: ReactComponent<Props> = ({
  children,
  description,
  placeholder,
  onClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

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
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant='outline'>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose();
                  onClick();
                }}
                ml={3}
              >
                {placeholder}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
