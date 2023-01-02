import React, { useEffect, useState } from 'react';
import { UserType } from '@/types/user.type';
import { useMutation } from '@apollo/client';
import { CREATE_LIKE, DELETE_LIKE } from '@/graphql/like/like.mutation';
import { Button, useToast } from '@chakra-ui/react';
import { BiLike } from 'react-icons/bi';
import { PostType } from '@/types/post.type';

interface Props {
  post: PostType;
  user: UserType | null;
}

export const LikeButton: React.FC<Props> = ({ user, post }) => {
  const toast = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post._count.Like || 0);

  const [createLike] = useMutation(CREATE_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  useEffect(() => {
    if (!user) return;
    // set if user liked the post or not
    let filteredLikes = (post.Like || []).filter(
      (like: any) => like.userId == user?.id
    );
    setIsLiked(filteredLikes.length != 0);
  }, [post]);

  const handleLikePost = () => {
    if (!user) return;

    if (!isLiked) {
      createLike({ variables: { postId: Number(post.id) } })
        .then(() => {
          setLikes(likes + 1);
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
      deleteLike({ variables: { postId: Number(post.id) } })
        .then(() => {
          setLikes(likes - 1);
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
    <Button
      variant={isLiked ? 'solid' : 'outline'}
      colorScheme={isLiked ? 'blue' : undefined}
      rightIcon={<BiLike />}
      onClick={handleLikePost}
      disabled={!user}
    >
      Like {likes}
    </Button>
  );
};
