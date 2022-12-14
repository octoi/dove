import React, { useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';
import { IoAdd, IoSettingsOutline } from 'react-icons/io5';
import { NgoUserContext } from './NgoUserContext';
import { CgEnter } from 'react-icons/cg';
import { useMutation } from '@apollo/client';
import { JOIN_NGO, LEAVE_NGO } from '@/graphql/ngo/ngoUser.mutation';
import { NgoSettingsWrapper } from './NgoSettingsWrapper';
import { NgoType } from '@/types/ngo.type';
import { SetState } from '@/types/react.type';
import { PermissionWrapper } from '../PermissionWrapper';
import { CreatePostWrapper } from './post/CreatePostWrapper';
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';

interface Props {
  ngoId: string;
  ngo: NgoType;
  setNgo: SetState<NgoType | null>;
  refetch: any;
}

export const NgoOptions: React.FC<Props> = ({
  ngoId,
  ngo,
  setNgo,
  refetch,
}) => {
  const toast = useToast();

  const { isMember, isAdmin, user } = useContext(NgoUserContext);

  const [joinNgo] = useMutation(JOIN_NGO);
  const [leaveNgo] = useMutation(LEAVE_NGO);

  const ngoHandler = (fn: any, successMsg: string, errorMsg: string) => {
    fn({ variables: { ngoId } })
      .then(() => {
        toast({
          title: successMsg,
          position: 'top-right',
          duration: 3000,
          status: 'success',
        });
        refetch();
      })
      .catch(() => {
        toast({
          title: errorMsg,
          position: 'top-right',
          duration: 3000,
          status: 'error',
        });
      });
  };

  return (
    <Flex alignItems='center'>
      {user && !isMember && (
        <Button
          colorScheme='teal'
          mr={2}
          onClick={() =>
            ngoHandler(
              joinNgo,
              'Joined ngo successfully.',
              'Failed to join ngo.'
            )
          }
        >
          Join Ngo
        </Button>
      )}
      <Menu>
        <MenuButton>
          <IconButton aria-label='options' icon={<SlOptions />} />
        </MenuButton>
        <MenuList>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              toast({
                title: 'Copied To Clipboard',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
                status: 'success',
              });
            }}
          >
            <MenuItem icon={<VscCopy className='text-lg' />}>
              Copy Ngo URL
            </MenuItem>
          </CopyToClipboard>
          {user && (
            <>
              {isAdmin && (
                <>
                  <CreatePostWrapper ngoId={ngo.id}>
                    <MenuItem icon={<IoAdd className='text-lg' />}>
                      Create Post
                    </MenuItem>
                  </CreatePostWrapper>
                  <NgoSettingsWrapper ngo={ngo} setNgo={setNgo}>
                    <MenuItem icon={<IoSettingsOutline className='text-lg' />}>
                      Ngo Settings
                    </MenuItem>
                  </NgoSettingsWrapper>
                </>
              )}
              {isMember ? (
                <PermissionWrapper
                  description="Are you sure you wan't to leave this ngo ?"
                  placeholder='Leave NGO'
                  onClick={() =>
                    ngoHandler(
                      leaveNgo,
                      'Left ngo successfully.',
                      'Failed to leave ngo.'
                    )
                  }
                >
                  <MenuItem
                    color='red.500'
                    icon={<BiLogOut className='text-lg' />}
                  >
                    Leave Ngo
                  </MenuItem>
                </PermissionWrapper>
              ) : (
                <MenuItem
                  color='teal.500'
                  icon={<CgEnter className='text-lg' />}
                  onClick={() =>
                    ngoHandler(
                      joinNgo,
                      'Joined ngo successfully.',
                      'Failed to join ngo.'
                    )
                  }
                >
                  Join Ngo
                </MenuItem>
              )}
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
};
