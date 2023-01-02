import React, { useEffect, useState } from 'react';
import { NgoType } from '@/types/ngo.type';
import { PostType } from '@/types/post.type';
import { useQuery } from '@apollo/client';
import { GET_POST } from '@/graphql/post/post.query';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { UserType } from '@/types/user.type';
import { userStore } from '@/store/user.store';
import { BiCommentDetail, BiShareAlt } from 'react-icons/bi';
import { Container, Flex, Button } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { CreateCommentWrapper } from './CreateCommentWrapper';
import { GET_POST_COMMENTS } from '@/graphql/comment/comment.query';
import { CommentSection } from './CommentSection';
import { LikeButton } from './LikeButton';

interface Props {
  ngo: NgoType;
  postId: number;
}

export const PostPageContent: React.FC<Props> = ({ postId, ngo }) => {
  const router = useRouter();

  const [post, setPost] = useState<PostType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
    refetch,
  } = useQuery(GET_POST_COMMENTS, {
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
        admins = admins.filter((admin) => admin.id == user?.id);
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
              <PostHeader
                isAdmin={isAdmin}
                ngo={ngo}
                post={post}
                className='flex md:hidden'
              />
              <h2 className='text-2xl font-medium'>{post.text}</h2>
              {post.media && (
                <img className='mt-5 w-full object-cover' src={post.media} />
              )}
            </div>
            <div className='mx-0 md:mx-2' />
            <div className='mt-5 md:mt-0 w-full md:w-1/2 flex flex-col-reverse md:flex-col justify-between'>
              <PostHeader
                isAdmin={isAdmin}
                ngo={ngo}
                post={post}
                className='hidden md:flex'
              />
              <CommentSection
                user={user}
                isAdmin={isAdmin}
                loading={commentsLoading}
                error={commentsError}
                data={commentsData}
                refetch={refetch}
              />
              <Flex alignItems='center'>
                <LikeButton post={post} user={user} />
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
                {user && (
                  <CreateCommentWrapper refetch={refetch} postId={postId}>
                    <Button
                      ml={2}
                      variant='outline'
                      rightIcon={<BiCommentDetail />}
                    >
                      Comment
                    </Button>
                  </CreateCommentWrapper>
                )}
              </Flex>
            </div>
          </Flex>
        </Container>
      )}
    </div>
  );
};
