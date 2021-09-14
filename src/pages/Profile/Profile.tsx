import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  SimpleGrid,
  Box,
  SkeletonCircle,
  SkeletonText,
  Center,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
} from '@chakra-ui/react';
import './Profile.css';
import { ProfileContext } from '../../store/profile.context';
import { API_URL } from '../../config/environments';
import { AuthContext } from '../../store/auth.context';

const Profile = (): ReactElement => {
  // const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [, setProfile] = useState<any>(null);
  const { user, userRole } = useContext(ProfileContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    try {
      fetch(
        `${API_URL}/get_user_info`,
        {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((responseType) => responseType.json())
        .then((response) => {
          setIsFirstLoad(false);
          setProfile(response);
        });
    } catch (ex) {
      setIsFirstLoad(false);
    }
  }, [user, userRole, token, setIsFirstLoad]);
  return (
    <div className="profile__content">
      <SimpleGrid columns={1} spacing={5}>
        {isFirstLoad && (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        )}
        {!isFirstLoad && (
          <>
            <Box>
              <Center>
                <Avatar size="2xl" name={user?.name} src={user?.photo} />
              </Center>
            </Box>
            <Box>
              <Heading>{user?.name}</Heading>
            </Box>
            <Box>
              <Tabs>
                <TabList>
                  <Tab>Informacion basica</Tab>
                  <Tab>Informacion bancaria</Tab>
                  <Tab>Soporte</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </>
        )}
      </SimpleGrid>
    </div>
  );
};

export default Profile;
