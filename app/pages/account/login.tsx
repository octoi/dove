import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Paths } from '@/utils/paths';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/account/account.mutation';
import { useRouter } from 'next/router';
import { setUser } from '@/utils/user';
import { Button, Center, Flex, Input, Link, useToast } from '@chakra-ui/react';

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const urlSearchParams = new URLSearchParams(window.location.search);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    loginUser({ variables: { email, password } })
      .then(({ data }) => {
        const loginData = data?.login;
        setUser(loginData);
        toast({
          title: `Welcome back ${loginData?.name} 🥳`,
          description: 'Logged in successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });

        // redirect to next path, if it is given
        let nextPath = urlSearchParams.get('next');

        if (nextPath) {
          router.push(nextPath);
          return;
        }

        router.push(Paths.home);
      })
      .catch((err) => {
        toast({
          title: 'Failed to login',
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
    <Layout title='Login'>
      <Center mt={10}>
        <Flex direction='column' p={8} className='w-full max-w-xl'>
          <form onSubmit={handleFormSubmit}>
            <h2 className='text-3xl font-bold mb-5'>Login</h2>
            <Input
              placeholder='Email'
              type='email'
              size='lg'
              variant='filled'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Login
            </Button>
            <Link href={Paths.register}>
              <p className='mt-3 opacity-90 cursor-pointer transition duration-500 hover:underline'>
                Dont have an account ? Register
              </p>
            </Link>
          </form>
        </Flex>
      </Center>
    </Layout>
  );
}
