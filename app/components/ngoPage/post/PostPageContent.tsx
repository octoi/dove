import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CopyToClipboard from 'react-copy-to-clipboard';
import { NgoType } from '@/types/ngo.type';
import { PostType } from '@/types/post.type';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/post/post.query';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { userStore } from '@/store/user.store';
import { SlOptions } from 'react-icons/sl';
import { VscCopy } from 'react-icons/vsc';
import { BiLike, BiShareAlt, BiTrash } from 'react-icons/bi';
import {
  Avatar,
  Container,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';

interface Props {
  ngo: NgoType;
  postId: number;
}

export const PostPageContent: React.FC<Props> = ({ postId, ngo }) => {
  const router = useRouter();
  const toast = useToast();

  const [post, setPost] = useState<PostType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  useEffect(() => {
    if (loading || error) return;
    let user = userStore.getState().user;

    if (data?.getPost) {
      setPost(data?.getPost);

      if (user) {
        let admins: UserType[] = data?.getPost?.ngo?.admins || [];
        admins.filter((admin) => admin.id === user?.id);
        setIsAdmin(admins.length !== 0);
      }

      return;
    }

    router.push(Paths.notFound);
  }, [data]);

  return (
    <div>
      {loading && <p className='text-lg'>Loading ...</p>}
      {error && <p className='text-lg text-red-500'>{error?.message}</p>}

      {post && (
        <Container
          maxW='container.xl'
          className='rounded-md bg-gray-50 bg-opacity-50'
          p={5}
        >
          <Flex className='flex-col md:flex-row'>
            <div className='w-full md:w-1/2'>
              <h2 className='text-2xl font-medium mb-5'>{post.text}</h2>
              {post.media && (
                <img className='w-full  object-cover' src={post.media} />
              )}
            </div>
            <div className='mx-0 md:mx-2' />
            <div className='w-full md:w-1/2 flex flex-col justify-between'>
              <Flex alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center'>
                  <Avatar src={ngo.profile} />
                  <div className='ml-2'>
                    <Text fontSize='lg' fontWeight='medium'>
                      {ngo.name}
                    </Text>
                    <Text>
                      {moment(new Date(Number(post.createdAt))).fromNow()}
                    </Text>
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
                      <MenuItem
                        color='red.500'
                        icon={<BiTrash className='text-lg' />}
                      >
                        Delete post
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Flex>
              <div className='h-full my-2 w-full bg-white'></div>
              <Flex alignItems='center'>
                <Button variant='outline' rightIcon={<BiLike />}>
                  Like
                </Button>
                {navigator?.share && (
                  <Button
                    ml={2}
                    variant='outline'
                    rightIcon={<BiShareAlt />}
                    onClick={() => {
                      navigator.share({
                        title: 'Share post',
                        text: window.location.href,
                      });
                    }}
                  >
                    Share
                  </Button>
                )}
              </Flex>
            </div>
          </Flex>
        </Container>
      )}
    </div>
  );
};
