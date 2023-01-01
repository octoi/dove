import React from 'react';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import { NgoType } from '@/types/ngo.type';
import { PostType } from '@/types/post.type';
import { Paths } from '@/utils/paths';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiTrash } from 'react-icons/bi';
import {
  Avatar,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';

interface Props {
  ngo: NgoType;
  post: PostType;
  isAdmin: boolean;
  className?: string;
}

export const PostHeader: React.FC<Props> = ({
  ngo,
  post,
  isAdmin,
  className,
}) => {
  const toast = useToast();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Flex alignItems='center'>
        <Avatar src={ngo.profile} />
        <div className='ml-2'>
          <Link href={`${Paths.ngo}/${ngo.id}`}>
            <Text fontSize='lg' fontWeight='medium'>
              {ngo.name}
            </Text>
          </Link>
          <Text>{moment(new Date(Number(post.createdAt))).fromNow()}</Text>
        </div>
      </Flex>
      <Menu>
        <MenuButton>
          <IconButton
            aria-label='options'
            variant='ghost'
            icon={<SlOptions />}
          />
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
              Copy post URL
            </MenuItem>
          </CopyToClipboard>
          {isAdmin && (
            <MenuItem color='red.500' icon={<BiTrash className='text-lg' />}>
              Delete post
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};
