import React, { ReactElement, useContext, useState } from 'react';
import {
  SimpleGrid,
  Box,
  SkeletonCircle,
  SkeletonText,
  Center,
  Heading,
  Avatar,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Tag,
} from '@chakra-ui/react';
import './Profile.css';
import { ProfileContext } from '../../store/profile.context';
// import { AuthContext } from '../../store/auth.context';
import ProfileTabs from '../../components/Profile/Tabs';
import { IBasicInfoFormData } from '../../components/Profile/BasicInfo';
import { updateProfile } from '../../services/profile.service';
import { AIVOI_ROLES } from '../../utils/roles';
import { useFilePicker } from 'use-file-picker';

const Profile = (): ReactElement => {
  const toast = useToast();
  const [infoLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userRole } = useContext(ProfileContext);
  // const { token } = useContext(AuthContext);

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.png,.jpg,.jpeg',
    readAs: 'DataURL',
    multiple: false,
  });

  const onProfileUpdate = async () => {
    setIsLoading(true);
    const response = await updateProfile(
      {
        photo: filesContent[0].content || user?.photo,
      },
      userRole ?? AIVOI_ROLES.CLIENT,
    );
    setIsLoading(false);
    if (response) {
      toast({
        title: 'Imagen cambiada',
        description: 'Tu foto de perfil ahora esta actualizada.',
        status: 'success',
      });
    }
  };

  const onBasicInfoEdit = async (data: IBasicInfoFormData) => {
    setIsLoading(true);
    const response = await updateProfile(
      {
        ...data,
      },
      userRole ?? AIVOI_ROLES.CLIENT,
    );
    setIsLoading(false);
    if (response) {
      toast({
        title: 'Datos guardados',
        description: 'Tu informacion fue actualizada sin problemas!',
        status: 'success',
      });
    }
  };

  const onBankInfoEdit = () => null;

  const onDocumentsEdit = () => null;

  return (
    <div className="profile__content">
      <SimpleGrid columns={1} spacing={5}>
        {infoLoading && (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        )}
        {!infoLoading && (
          <>
            <Box>
              <Center>
                <Popover>
                  <PopoverTrigger>
                    <Avatar size="xl" name={user?.name} src={user?.photo} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Actualizar foto de perfil</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Button
                        marginBottom={3}
                        width="100%"
                        colorScheme="blue"
                        onClick={openFileSelector}
                        isLoading={loading || isLoading}
                      >
                        Seleccionar imagen
                      </Button>
                      <Button
                        disabled={filesContent.length === 0}
                        width="100%"
                        colorScheme="teal"
                        onClick={onProfileUpdate}
                        isLoading={isLoading}
                      >
                        Guardar imagen
                      </Button>
                    </PopoverBody>
                    <PopoverFooter>
                      {filesContent.length === 0 &&
                        'No hay ninguna imagen seleccionada'}
                      {filesContent.map((file, index) => (
                        <Tag key={`profile-image-id-${index}`}>{file.name}</Tag>
                      ))}
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
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
