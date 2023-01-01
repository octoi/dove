import React, { useEffect, useState } from 'react';
import { NgoType } from '@/types/ngo.type';
import { PostType } from '@/types/post.type';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/post/post.query';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { userStore } from '@/store/user.store';
import { BiLike, BiShareAlt } from 'react-icons/bi';
import { Container, Flex, Button, useToast } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { CREATE_LIKE, DELETE_LIKE } from '@/graphql/like/like.mutation';

interface Props {
  ngo: NgoType;
  postId: number;
}

export const PostPageContent: React.FC<Props> = ({ postId, ngo }) => {
  const router = useRouter();
  const toast = useToast();

  const [post, setPost] = useState<PostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const [createLike] = useMutation(CREATE_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  useEffect(() => {
    if (loading || error) return;
    let user = userStore.getState().user;

    setUser(user);

    if (data?.getPost) {
      setPost(data?.getPost);

      if (user) {
        let admins: UserType[] = data?.getPost?.ngo?.admins || [];
        admins.filter((admin) => admin.id === user?.id);
        setIsAdmin(admins.length !== 0);

        // set if user liked the post or not
        let filteredLikes = (data?.getPost.Like || []).filter(
          (like: any) => like.userId == user?.id
        );
        setIsLiked(filteredLikes.length != 0);
      }

      return;
    }

    router.push(Paths.notFound);
  }, [data]);

  const handleLikePost = () => {
    if (!post || !user) return;

    if (!isLiked) {
      createLike({ variables: { postId } })
        .then(() => {
          setPost({
            ...post,
            Like: [{ userId: user.id || 0 }],
            _count: {
              ...post._count,
              Like: (post._count.Like || 0) + 1,
            },
          });
          setIsLiked(true);
        })
        .catch((err) => {
          setIsLiked(false);
          toast({
            title: 'Failed to like post.',
            description: err?.message,
            status: 'error',
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          });
        });
    } else {
      deleteLike({ variables: { postId } })
        .then(() => {
          setPost({
            ...post,
            Like: [],
            _count: {
              ...post._count,
              Like: (post._count.Like || 0) - 1,
            },
          });
          setIsLiked(false);
        })
        .catch((err) => {
          setIsLiked(true);
          toast({
            title: 'Failed to unlike post.',
            description: err?.message,
            status: 'error',
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          });
        });
    }
  };

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
              <PostHeader
                isAdmin={isAdmin}
                ngo={ngo}
                post={post}
                className='flex md:hidden mb-5'
              />
              <h2 className='text-2xl font-medium mb-5'>{post.text}</h2>
              {post.media && (
                <img className='w-full  object-cover' src={post.media} />
              )}
            </div>
            <div className='mx-0 md:mx-2' />
            <div className='w-full md:w-1/2 flex flex-col justify-between'>
              <PostHeader
                isAdmin={isAdmin}
                ngo={ngo}
                post={post}
                className='hidden md:flex'
              />
              <div className='h-full my-2 w-full bg-white'></div>
              <Flex alignItems='center'>
                {user && (
                  <Button
                    variant={isLiked ? 'solid' : 'outline'}
                    colorScheme={isLiked ? 'blue' : undefined}
                    rightIcon={<BiLike />}
                    onClick={handleLikePost}
                  >
                    Like {post._count.Like || 0}
                  </Button>
                )}
                {navigator?.share && (
                  <Button
                    ml={user ? 2 : 0}
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
