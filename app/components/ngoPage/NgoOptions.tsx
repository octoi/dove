import React from 'react';
import { SlOptions } from 'react-icons/sl';
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
  return (
    <Menu>
      <MenuButton>
        <IconButton aria-label='options' icon={<SlOptions />} />
      </MenuButton>
      <MenuList>
        <MenuItem>Copy Ngo URL</MenuItem>
        {/* TODO: display according to user joined or not */}
        <MenuItem color='teal.400'>Join Ngo</MenuItem>
        <MenuItem color='red.400'>Leave Ngo</MenuItem>
      </MenuList>
    </Menu>
  );
};
