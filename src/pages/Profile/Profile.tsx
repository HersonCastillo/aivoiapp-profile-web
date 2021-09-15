import React, { ReactElement, useContext, useState } from 'react';
import {
  SimpleGrid,
  Box,
  SkeletonCircle,
  SkeletonText,
  Center,
  Heading,
  Avatar,
} from '@chakra-ui/react';
import './Profile.css';
import { ProfileContext } from '../../store/profile.context';
// import { AuthContext } from '../../store/auth.context';
import ProfileTabs from '../../components/Profile/Tabs';

const Profile = (): ReactElement => {
  const [isLoading] = useState(false);
  const { user } = useContext(ProfileContext);
  // const { token } = useContext(AuthContext);

  const onBasicInfoEdit = () => null;

  const onBankInfoEdit = () => null;

  const onDocumentsEdit = () => null;

  return (
    <div className="profile__content">
      <SimpleGrid columns={1} spacing={5}>
        {isLoading && (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        )}
        {!isLoading && (
          <>
            <Box>
              <Center>
                <Avatar size="xl" name={user?.name} src={user?.photo} />
              </Center>
            </Box>
            <Box>
              <Heading>{user?.name}</Heading>
            </Box>
            <Box>
              <ProfileTabs
                onBankInfoEdit={onBankInfoEdit}
                onBasicInfoEdit={onBasicInfoEdit}
                onDocumentsEdit={onDocumentsEdit}
                isLoading={isLoading}
              />
            </Box>
          </>
        )}
      </SimpleGrid>
    </div>
  );
};

export default Profile;
