import React, { useContext } from 'react';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
import { NgoUserContext } from './NgoUserContext';
import { CgEnter } from 'react-icons/cg';
import { useMutation } from '@apollo/client';
import { JOIN_NGO } from '@/graphql/ngo/ngoUser.mutation';
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
  refetch: any;
}

export const NgoOptions: React.FC<Props> = ({ ngoId, refetch }) => {
  const toast = useToast();

  const { isMember, isAdmin, user } = useContext(NgoUserContext);

  const [joinNgo] = useMutation(JOIN_NGO);

  const joinNgoHandler = () => {
    joinNgo({ variables: { ngoId } })
      .then(() => {
        toast({
          title: 'Joined ngo successfully.',
          position: 'top-right',
          duration: 3000,
          status: 'success',
        });
        refetch();
      })
      .catch(() => {
        toast({
          title: 'Failed to join ngo.',
          position: 'top-right',
          duration: 3000,
          status: 'error',
        });
      });
  };

  return (
    <Flex alignItems='center'>
      {user && !isMember && (
        <Button colorScheme='teal' mr={2} onClick={joinNgoHandler}>
          Join Ngo
        </Button>
      )}
      <Menu>
        <MenuButton>
          <IconButton aria-label='options' icon={<SlOptions />} />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<VscCopy className='text-lg' />}>
            Copy Ngo URL
          </MenuItem>
          {user && (
            <>
              {isAdmin && (
                <MenuItem icon={<IoAdd className='text-lg' />}>
                  Create Post
                </MenuItem>
              )}
              {isMember ? (
                <MenuItem
                  color='red.500'
                  icon={<BiLogOut className='text-lg' />}
                >
                  Leave Ngo
                </MenuItem>
              ) : (
                <MenuItem
                  color='teal.500'
                  icon={<CgEnter className='text-lg' />}
                  onClick={joinNgoHandler}
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
