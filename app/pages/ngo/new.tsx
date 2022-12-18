import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Paths } from '@/utils/paths';
import { useMutation } from '@apollo/client';
import { CREATE_NGO } from '@/graphql/ngo/ngo.mutation';
import { useRouter } from 'next/router';
import {
  Button,
  Center,
  Flex,
  Input,
  Link,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export default function NewNgoPage() {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createNgo] = useMutation(CREATE_NGO);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    createNgo({
      variables: {
        name,
        description,
        profile: encodeURI(
          `https://avatars.dicebear.com/api/initials/${name}.svg`
        ),
        banner: encodeURI(
          `https://avatars.dicebear.com/api/identicon/${name}.svg`
        ),
      },
    })
      .then(({ data }) => {
        const createNgoData = data?.createNgo;
        toast({
          title: 'Created ngo successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
        router.push(`${Paths.ngo}/${createNgoData?.id}`);
      })
      .catch((err) => {
        toast({
          title: 'Failed to create ngo',
          description: err?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout title='Create new NGO'>
      <Center mt={10}>
        <Flex direction='column' p={8} className='w-full max-w-xl'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-3xl font-bold mb-5'>Create New NGO</h2>
            <Input
              placeholder='NGO name'
              type='text'
              size='lg'
              variant='filled'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
            <Textarea
              placeholder='NGO Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mt={3}
              variant='filled'
              size='lg'
              required
            />
            <Button
              mt={3}
              size='lg'
              colorScheme='teal'
              disabled={
                loading ||
                name.trim().length === 0 ||
                description.trim().length === 0
              }
              isLoading={loading}
              type='submit'
              w='full'
            >
              Create NGO
            </Button>
            <Link href={Paths.home}>
              <p className='mt-3 opacity-90 cursor-pointer transition duration-500 hover:underline'>
                Dont want to create an NGO ? Return to home
              </p>
            </Link>
          </form>
        </Flex>
      </Center>
    </Layout>
  );
}
