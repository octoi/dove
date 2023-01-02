import React, { useContext, useEffect, useState } from 'react';
import { NgoType } from '@/types/ngo.type';
import { useQuery } from '@apollo/client';
import { LOAD_NGO_POSTS } from '@/graphql/post/post.query';
import { PostType } from '@/types/post.type';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { RxReload } from 'react-icons/rx';
import { Post } from './post/Post';
import { NgoUserContext } from './NgoUserContext';

interface Props {
  ngo: NgoType;
}

export const Posts: React.FC<Props> = ({ ngo }) => {
  const { user } = useContext(NgoUserContext);

  const { loading, error, data, refetch } = useQuery(LOAD_NGO_POSTS, {
    variables: { ngoId: ngo.id },
  });

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (loading || error) return;

    setPosts(data?.loadNgoPosts);
  }, [data]);

  return (
    <div>
      {loading && (
        <Text fontSize='xl' fontWeight='semibold'>
          Loading ...
        </Text>
      )}
      {error && (
        <Text fontSize='xl' fontWeight='semibold' color='red.500'>
          {error?.message}
        </Text>
      )}
      {!loading && !error && (
        <div>
          <Flex mb={5} alignItems='center'>
            <Text fontSize='xl' fontWeight='semibold'>
              Posts ({posts.length})
            </Text>
            <IconButton
              ml={3}
              aria-label='refetch'
              variant='outline'
              onClick={() => refetch()}
              icon={<RxReload className='text-lg' />}
            />
          </Flex>
          {posts.map((post) => (
            <Post key={post.id} post={post} ngo={ngo} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
