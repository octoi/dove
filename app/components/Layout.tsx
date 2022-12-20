import React from 'react';
import Head from 'next/head';
import { ReactComponent } from '@/types/react.type';
import { Header } from './header';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export const Layout: ReactComponent<Props> = ({
  children,
  title,
  description,
  image,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href={image || '/favicon.png'} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      <div className='p-5'>{children}</div>
    </>
  );
};
