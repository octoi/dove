import React from 'react';
import { PostType } from '@/types/post.type';
import { UserType } from '@/types/user.type';
import { Button, Flex, Link } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { LikeButton } from './LikeButton';
import { BiCommentDetail, BiShareAlt } from 'react-icons/bi';
import { NgoType } from '@/types/ngo.type';
import { Paths } from '@/utils/paths';

interface Props {
  post: PostType;
  ngo: NgoType;
  user: UserType | null;
}

export const Post: React.FC<Props> = ({ post, ngo, user }) => {
  return (
    <Flex direction='column' mb={5} className='rounded-md bg-gray-50 p-5'>
      <PostHeader isAdmin={false} ngo={ngo} post={post} className='flex' />
      <h2 className='mt-5 text-2xl font-medium'>
        <Link href={`${Paths.ngo}/${ngo.id}/${post.id}`}>{post.text}</Link>
      </h2>
      {post.media && (
        <img className='mt-5 w-full object-cover' src={post.media} />
      )}
      <Flex mt={5} alignItems='center'>
        <LikeButton post={post} user={user} />
        {navigator?.share && (
          <Button
            ml={2}
            variant='outline'
            rightIcon={<BiShareAlt />}
            onClick={() => {
              navigator.share({
                title: 'Share post',
                text: `${window.location.origin}/${Paths.ngo}/${ngo.id}/${post.id}`,
              });
            }}
          >
            Share
          </Button>
        )}

        <Link href={`${Paths.ngo}/${ngo.id}/${post.id}`}>
          <Button ml={2} variant='outline' rightIcon={<BiCommentDetail />}>
            Comment ({post._count.Comment || 0})
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
