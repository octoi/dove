import React from 'react';
import { ReactComponent } from '@/types/react.type';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer } = createStandaloneToast();

export const ChakraWrap: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider>
      {children}
      <ToastContainer />
    </ChakraProvider>
  );
};
