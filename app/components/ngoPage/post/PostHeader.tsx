import React from 'react';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import { NgoType } from '@/types/ngo.type';
import { PostType } from '@/types/post.type';
import { Paths } from '@/utils/paths';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiTrash } from 'react-icons/bi';
import { PermissionWrapper } from '@/components/PermissionWrapper';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '@/graphql/post/post.mutation';
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
  const router = useRouter();

  const [deletePost] = useMutation(DELETE_POST);

  const handleDeletePost = () => {
    deletePost({ variables: { ngoId: ngo.id, postId: Number(post.id) } })
      .then(() => {
        router.push(`${Paths.ngo}/${ngo.id}`);
        toast({
          title: 'Deleted post successfully',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
      })
      .catch((err) => {
        toast({
          title: 'Failed to delete post',
          description: err?.message,
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      });
  };

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
            <PermissionWrapper
              description="Are you sure you want to delete this post, this action can't be undone"
              placeholder='Delete Post'
              onClick={handleDeletePost}
            >
              <MenuItem color='red.500' icon={<BiTrash className='text-lg' />}>
                Delete post
              </MenuItem>
            </PermissionWrapper>
          )}
        </MenuList>
      </Menu>
    </div>
  );
};
