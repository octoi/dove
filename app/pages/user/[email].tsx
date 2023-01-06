import { Layout } from '@/components/Layout';
import { GET_USER_DATA } from '@/graphql/user/user.query';
import { useQuery } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  email: string;
}

const UserPage: NextPage<Props> = ({ email }) => {
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { email },
  });

  return (
    <Layout
      title={
        data?.getUser ? data?.getUser?.name : loading ? 'Loading..' : 'Error'
      }
      image={data?.getUser ? data.getUser.profile : undefined}
    >
      {loading && <p className='text-lg'>Loading ...</p>}
      {error && <p className='text-red-600 text-lg'>{error.message}</p>}
    </Layout>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const email = params?.email;

  return {
    props: {
      email,
    },
  };
};
