import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraWrap } from '@/components/ChakraWrap';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrap>
      <Component {...pageProps} />
    </ChakraWrap>
  );
}
