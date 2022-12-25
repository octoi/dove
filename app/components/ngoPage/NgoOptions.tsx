import React, { useContext } from 'react';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
import { NgoUserContext } from './NgoUserContext';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

interface Props {
  ngoId: string;
}

export const NgoOptions: React.FC<Props> = ({ ngoId }) => {
  const { isMember, isAdmin } = useContext(NgoUserContext);

  return (
    <Menu>
      <MenuButton>
        <IconButton aria-label='options' icon={<SlOptions />} />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<VscCopy className='text-lg' />}>Copy Ngo URL</MenuItem>
        {isAdmin && (
          <MenuItem icon={<IoAdd className='text-lg' />}>Create Post</MenuItem>
        )}
        {isMember ? (
          <MenuItem color='red.400' icon={<BiLogOut className='text-lg' />}>
            Leave Ngo
          </MenuItem>
        ) : (
          <MenuItem color='teal.400'>Join Ngo</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
