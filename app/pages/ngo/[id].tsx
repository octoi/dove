import { GetServerSideProps, NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { Layout } from '@/components/Layout';
import { GET_NGO_DETAILS } from '@/graphql/ngo/ngo.query';
import { useRouter } from 'next/router';
import { NgoPageContent } from '@/components/ngoPage';
import { useEffect, useState } from 'react';
import { NgoType } from '@/types/ngo.type';
import { Paths } from '@/utils/paths';

interface Props {
  ngoId: string;
}

const NgoPage: NextPage<Props> = ({ ngoId }) => {
  const [ngo, setNgo] = useState<NgoType | null>(null);

  const router = useRouter();
  const { loading, error, data } = useQuery(GET_NGO_DETAILS, {
    variables: { ngoId },
  });

  useEffect(() => {
    if (loading || error) return;

    if (data?.getNgoDetails) {
      setNgo(data?.getNgoDetails);
      return;
    }
    router.push(Paths.notFound);
  }, [data]);

  return (
    <Layout
      title={ngo ? ngo.name : loading ? 'Loading..' : 'Error'}
      description={ngo ? ngo.description : undefined}
      image={ngo ? ngo.profile : undefined}
    >
      {loading && <p>Loading ...</p>}
      {error && <p>{error.message}</p>}
      {ngo && <NgoPageContent ngo={ngo} setNgo={setNgo} />}
    </Layout>
  );
};

export default NgoPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ngoId = params?.id;

  return {
    props: {
      ngoId,
    },
  };
};
