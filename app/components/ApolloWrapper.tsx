import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/utils/apollo';
import { ReactComponent } from '@/types/react.type';

export const ApolloWrapper: ReactComponent = ({ children }) => {
  const client = getApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
