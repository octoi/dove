import React from 'react';
import { NgoType } from '@/types/ngo.type';
import { useQuery } from '@apollo/client';
import { GET_NGO_ADMINS, GET_NGO_MEMBERS } from '@/graphql/ngo/ngo.query';
import { NgoUserContextWrapper } from './NgoUserContext';
import { UserList } from './UserList';
import { NgoOptions } from './NgoOptions';
import {
  DISMISS_USER_ADMIN,
  MAKE_USER_ADMIN,
} from '@/graphql/ngo/ngoUser.mutation';
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
import { SetState } from '@/types/react.type';

interface Props {
  ngo: NgoType;
  setNgo: SetState<NgoType | null>;
}

export const NgoPageContent: React.FC<Props> = ({ ngo, setNgo }) => {
  const {
    loading: membersLoading,
    data: membersData,
    error: membersError,
    refetch: membersRefetch,
  } = useQuery(GET_NGO_MEMBERS, { variables: { ngoId: ngo.id } });
  const {
    loading: adminsLoading,
    data: adminsData,
    error: adminsError,
    refetch: adminsRefetch,
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
              <NgoOptions
                ngoId={ngo.id}
                ngo={ngo}
                setNgo={setNgo}
                refetch={membersRefetch}
              />
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
                    refetch={membersRefetch}
                    ngoId={ngo.id}
                    userAdminOption={{
                      title: 'Make user admin',
                      mutation: MAKE_USER_ADMIN,
                    }}
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
                    refetch={adminsRefetch}
                    ngoId={ngo.id}
                    userAdminOption={{
                      title: 'Dismiss as admin',
                      mutation: DISMISS_USER_ADMIN,
                    }}
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
