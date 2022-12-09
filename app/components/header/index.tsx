import React from 'react';
import Link from 'next/link';
import { Button, Flex } from '@chakra-ui/react';
import { Paths } from '@/utils/paths';

export const Header: React.FC = () => {
  return (
    <Flex alignItems='center' justifyContent='space-between' className='p-5'>
      <Link href='/'>
        <Flex
          alignItems='center'
          className='transition-all duration-200 hover:opacity-80'
        >
          <img src='/dove.svg' alt='dove' className='w-10 h-10' />
          <h1 className='hidden md:block ml-2 text-2xl font-medium'>Dove</h1>
        </Flex>
      </Link>
      <Flex alignItems='center'>
        <Link href={Paths.register}>
          <Button size='lg' colorScheme='teal'>
            Register
          </Button>
        </Link>
        <Link href={Paths.login}>
          <Button size='lg' colorScheme='teal' variant='ghost' ml={2}>
            Login
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
