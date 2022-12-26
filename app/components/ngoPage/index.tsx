import React from 'react';
import { NgoType } from '@/types/ngo.type';
import { useQuery } from '@apollo/client';
import { GET_NGO_ADMINS, GET_NGO_MEMBERS } from '@/graphql/ngo/ngo.query';
import { NgoUserContextWrapper } from './NgoUserContext';
import { UserList } from './UserList';
import { NgoOptions } from './NgoOptions';
import {
  Avatar,
  Container,
  Flex,
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

export const NgoPageContent: React.FC<Props> = ({ ngo }) => {
  const {
    loading: membersLoading,
    data: membersData,
    error: membersError,
  } = useQuery(GET_NGO_MEMBERS, { variables: { ngoId: ngo.id } });
  const {
    loading: adminsLoading,
    data: adminsData,
    error: adminsError,
  } = useQuery(GET_NGO_ADMINS, { variables: { ngoId: ngo.id } });

  return (
    <div>
      <img
        src={ngo.banner}
        className='w-full h-52 md:h-72 object-cover rounded'
        alt=''
      />
      <NgoUserContextWrapper
        ngoCreatorId={Number(ngo.creatorId)}
        members={membersData?.getNgoDetails?.members || []}
        admins={adminsData?.getNgoDetails?.admins || []}
      >
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
              <NgoOptions ngoId={ngo.id} />
            </Flex>
            <TabPanels>
              <TabPanel>
                <p>Posts</p>
              </TabPanel>
              <TabPanel>
                {membersLoading && <p>Loading ...</p>}
                {membersError && (
                  <p className='text-red-600'>{membersError.message}</p>
                )}
                {membersData && (
                  <UserList
                    title='Members'
                    users={membersData.getNgoDetails?.members}
                  />
                )}
              </TabPanel>
              <TabPanel>
                {adminsLoading && <p>Loading ...</p>}
                {adminsError && (
                  <p className='text-red-600'>{adminsError.message}</p>
                )}
                {adminsData && (
                  <UserList
                    title='Admins'
                    users={adminsData.getNgoDetails?.admins}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </NgoUserContextWrapper>
    </div>
  );
};
