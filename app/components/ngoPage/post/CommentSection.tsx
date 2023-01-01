import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { UserType } from '@/types/user.type';
import { CommentType } from '@/types/comment.type';
import { Paths } from '@/utils/paths';
import { PermissionWrapper } from '@/components/PermissionWrapper';
import { BiTrash } from 'react-icons/bi';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '@/graphql/comment/comment.mutation';
import {
  Avatar,
  Flex,
  IconButton,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';

interface Props {
  user: UserType | null;
  isAdmin: boolean;
  loading: boolean;
  error: any;
  data: any;
  refetch: () => void;
}

export const CommentSection: React.FC<Props> = ({
  user,
  isAdmin,
  loading,
  error,
  data,
  refetch,
}) => {
  const toast = useToast();
  const [comments, setComments] = useState<CommentType[]>([]);

  const [deleteComment] = useMutation(DELETE_COMMENT);

  useEffect(() => {
    if (loading || error) return;
    setComments(data?.getPostComments || []);
  }, [data]);

  const handleDeleteComment = (commentId: number) => {
    deleteComment({ variables: { commentId } })
      .then(() => {
        toast({
          title: 'Deleted comment successfully.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
        refetch();
      })
      .catch((err) => {
        toast({
          title: 'Failed to delete comment.',
          description: err?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      });
  };

  return comments.length === 0 ? (
    <div className='my-5 w-full overflow-y-scroll bg-gray-100 h-full py-10 flex items-center justify-center'>
      {!loading && !error && <p className='text-lg'>No Comments</p>}
      {loading && <p className='text-lg'>Loading ...</p>}
      {error && <p className='text-lg text-red-500'>{error?.message}</p>}
    </div>
  ) : (
    <div className='my-5 p-5 w-full bg-gray-100 overflow-y-scroll h-full'>
      {comments.map((comment) => (
        <Flex
          key={comment.id}
          justifyContent='space-between'
          className='bg-gray-50 p-5 mb-3 rounded'
        >
          <Flex>
            <Avatar src={comment.user.profile} name={comment.user.name} />
            <div className='ml-3'>
              <Link href={`${Paths.user}/${comment.user.email}`}>
                <Text fontSize='lg' fontWeight='medium'>
                  {comment.user.name}
                </Text>
              </Link>
              <Text className='opacity-80'>
                {moment(new Date(Number(comment.createdAt))).fromNow()}
              </Text>
              <Text>{comment.comment}</Text>
            </div>
          </Flex>
          {(isAdmin || user?.id == comment.user.id) && (
            <PermissionWrapper
              description="Are you sure you want to delete this comment, this action can't be undone."
              placeholder='Delete Comment'
              onClick={() => handleDeleteComment(Number(comment.id))}
            >
              <IconButton
                variant='ghost'
                colorScheme='red'
                aria-label='Delete comment'
                icon={<BiTrash className='text-lg' />}
              />
            </PermissionWrapper>
          )}
        </Flex>
      ))}
    </div>
  );
};
