import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { Paths } from '@/utils/paths';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/account/account.mutation';
import { setUser } from '@/utils/user';
import { Button, Center, Flex, Input, useToast, Link } from '@chakra-ui/react';

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [registerUser] = useMutation(REGISTER_USER);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    registerUser({
      variables: {
        name,
        email,
        password,
        profile: encodeURI(
          `https://avatars.dicebear.com/api/identicon/${name}.svg`
        ),
      },
    })
      .then(({ data }) => {
        const registerData = data?.register;
        setUser(registerData);
        toast({
          title: `Welcome ${name} to dove 🥳`,
          description: 'Account registered successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
        router.push(Paths.home);
      })
      .catch((err) => {
        toast({
          title: 'Failed to register',
          description: err?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
          duration: 5000,
        });
      })
      .finally(() => {
        setPassword('');
        setLoading(false);
      });
  };

  return (
    <Layout title='Register'>
      <Center mt={10}>
        <Flex direction='column' p={8} className='w-full max-w-xl'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-3xl font-bold mb-5'>Register</h2>
            <Input
              placeholder='Name'
              type='text'
              size='lg'
              variant='filled'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
            <Input
              placeholder='Email'
              type='email'
              size='lg'
              variant='filled'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mt={3}
              disabled={loading}
              required
            />
            <Input
              placeholder='Password'
              type='password'
              size='lg'
              variant='filled'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mt={3}
              disabled={loading}
              required
            />
            <Button
              mt={3}
              size='lg'
              colorScheme='teal'
              disabled={loading}
              isLoading={loading}
              type='submit'
              w='full'
            >
              Register
            </Button>
            <Link href={Paths.login}>
              <p className='mt-3 opacity-90 cursor-pointer transition duration-500 hover:underline'>
                Already have an account ? Login
              </p>
            </Link>
          </form>
        </Flex>
      </Center>
    </Layout>
  );
}
