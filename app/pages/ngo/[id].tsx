import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { NgoType } from '@/types/ngo.type';
import { getApolloClient } from '@/utils/apollo';
import { GET_NGO_DETAILS } from '@/graphql/ngo/ngo.query';
import { GSSPRedirectData } from '@/utils/constant';
import { SlOptions } from 'react-icons/sl';
import {
  Avatar,
  Container,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

interface Props {
  ngo: NgoType;
}

const NgoPage: NextPage<Props> = ({ ngo }) => (
  <Layout title={ngo.name} description={ngo.description} image={ngo.profile}>
    <img
      src={ngo.banner}
      className='w-full h-52 md:h-72 object-cover rounded'
      alt=''
    />
    <Container mt={10} maxW='container.xl'>
      <Flex>
        <Avatar src={ngo.profile} size={{ base: 'lg', md: 'xl' }} />
        <Flex ml={5} direction='column'>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight='bold'>
            {ngo.name}
          </Text>
          <Text fontSize={{ base: 'lg', md: 'xl' }}>{ngo.description}</Text>
        </Flex>
      </Flex>
      <Tabs mt={5} size={{ base: 'md', md: 'lg' }} variant='soft-rounded'>
        <Flex alignItems='center' justifyContent='space-between'>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Members</Tab>
            <Tab>Admins</Tab>
          </TabList>
          <IconButton aria-label='options' icon={<SlOptions />} />
        </Flex>
        <TabPanels>
          <TabPanel>
            <p>Posts</p>
          </TabPanel>
          <TabPanel>
            <p>Members</p>
          </TabPanel>
          <TabPanel>
            <p>Admins</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  </Layout>
);

export default NgoPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ngoId = params?.id;

  const client = getApolloClient();

  const responseData: any = await client
    .query({
      query: GET_NGO_DETAILS,
      variables: { ngoId },
    })
    .catch(() => {
      return GSSPRedirectData;
    });

  const ngoData = responseData?.data?.getNgoDetails;

  if (!ngoData) return GSSPRedirectData;

  return {
    props: {
      ngo: ngoData,
    },
  };
};
