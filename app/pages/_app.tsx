import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraWrap } from '@/components/ChakraWrap';
import { ApolloWrapper } from '@/components/ApolloWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <ChakraWrap>
        <Component {...pageProps} />
      </ChakraWrap>
    </ApolloWrapper>
  );
}
