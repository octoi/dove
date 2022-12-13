import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { AuthWrapper } from '@/components/AuthWrapper';
import { userStore } from '@/store/user.store';
import { LogoutWrapper } from '@/components/account/LogoutWrapper';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/graphql/account/account.mutation';
import { setUser } from '@/utils/user';
import { Paths } from '@/utils/paths';
import {
  Avatar,
  Button,
  Center,
  Flex,
  Input,
  Link,
  Textarea,
  useToast,
} from '@chakra-ui/react';

export default function SettingsPage() {
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = userStore.getState().user;
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setProfile(user.profile);
    setBio(user.bio || '');
  }, []);

  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    updateUser({
      variables: {
        name,
        email,
        password,
        profile,
        bio,
      },
    })
      .then(({ data }) => {
        const updateData = data?.updateUser;
        setUser(updateData);
        toast({
          title: 'Looking good',
          description: 'Updated profile successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: 'Failed to update profile',
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
    <Layout title='Settings'>
      <AuthWrapper>
        <Center mt={10}>
          <Flex direction='column' p={8} className='w-full max-w-xl'>
            <form onSubmit={handleFormSubmit}>
              <h2 className='text-3xl font-bold mb-5'>Update profile</h2>
              <Flex alignItems='center'>
                <Input
                  placeholder='Profile'
                  type='text'
                  size='lg'
                  variant='filled'
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  disabled={loading}
                  required
                />
                <Avatar src={profile} ml={2} />
              </Flex>
              <Input
                placeholder='Name'
                type='text'
                size='lg'
                variant='filled'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                mt={3}
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
              />
              <Textarea
                placeholder='Bio'
                size='lg'
                variant='filled'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                mt={3}
                disabled={loading}
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
                Update profile
              </Button>
              <LogoutWrapper>
                <Button
                  mt={2}
                  size='lg'
                  colorScheme='red'
                  disabled={loading}
                  isLoading={loading}
                  w='full'
                >
                  Logout
                </Button>
              </LogoutWrapper>
              <Link href={Paths.home}>
                <p className='mt-3 opacity-90 cursor-pointer transition duration-500 hover:underline'>
                  Never mind, take me home
                </p>
              </Link>
            </form>
          </Flex>
        </Center>
      </AuthWrapper>
    </Layout>
  );
}
