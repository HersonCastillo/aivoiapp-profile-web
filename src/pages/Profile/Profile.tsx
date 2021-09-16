import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  SimpleGrid,
  Box,
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import './Profile.css';
import { ProfileContext } from '../../store/profile.context';
import ProfileTabs from '../../components/Profile/Tabs';
import { IBasicInfoFormData } from '../../components/Profile/BasicInfo';
import {
  getUserData,
  updateDriverDocumentData,
  updateProfile,
} from '../../services/profile.service';
import { AIVOI_ROLES } from '../../utils/roles';
import { useFilePicker } from 'use-file-picker';
import { IBankInfoFormData } from '../../components/Profile/BankInfo';
import { IDocumentsFormData } from '../../components/Profile/Documents';

const Profile = (): ReactElement => {
  const toast = useToast();
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userRole, setProfile } = useContext(ProfileContext);
  const [showCompleteConfiguration, setShowCompleteConfiguration] =
    useState(false);
  const [isBankDataCompleted, setIsBankDataCompleted] = useState(false);

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
      user?.user_id!,
    );
    setIsLoading(false);
    if (response) {
      retrieveUserInfo();
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
      user?.user_id!,
    );
    setIsLoading(false);
    if (response) {
      retrieveUserInfo();
      toast({
        title: 'Datos guardados',
        description: 'Tu informacion fue actualizada sin problemas!',
        status: 'success',
      });
    }
  };

  const onBankInfoEdit = async ({
    bankId,
    accountNumber,
    accountType,
  }: IBankInfoFormData) => {
    setIsLoading(true);
    const response = await updateDriverDocumentData(
      {
        bank_id: bankId,
        num_account: accountNumber,
        type_account: accountType,
      },
      user?.user_id!,
    );
    setIsLoading(false);
    if (response) {
      retrieveUserInfo();
      toast({
        title: 'Datos guardados',
        description: 'Tu informacion fue actualizada sin problemas!',
        status: 'success',
      });
    }
  };

  const onDocumentsEdit = async ({
    circulationCard,
    drivingCard,
    files,
  }: IDocumentsFormData) => {
    setIsLoading(true);
    let dataFiles = {};
    if (files.length) {
      const [
        duiImage,
        circulationCardImage,
        licenseCardImage,
        solvencyPncImage,
      ] = files;
      dataFiles = {
        photo_dui: duiImage.content,
        photo_licence: licenseCardImage.content,
        photo_solvency_pnc: solvencyPncImage.content,
        photo_background: circulationCardImage.content,
      };
    }
    const response = await updateDriverDocumentData(
      {
        num_card_circulation: circulationCard,
        num_licence: drivingCard,
        ...dataFiles,
      },
      user?.user_id!,
    );
    setIsLoading(false);
    if (response) {
      retrieveUserInfo();
      toast({
        title: 'Datos guardados',
        description: 'Tu informacion fue actualizada sin problemas!',
        status: 'success',
      });
    }
  };

  const retrieveUserInfo = useCallback(() => {
    if (user) {
      getUserData(user.user_id!).then((response) => {
        setProfile(response.data?.data, userRole ?? AIVOI_ROLES.CLIENT);
      });
    }
  }, [user, userRole, setProfile]);

  useEffect(() => {
    if (user && isFirstLoad) {
      setFirstLoad(false);
      retrieveUserInfo();
    }
  }, [user, isFirstLoad, setFirstLoad, retrieveUserInfo]);

  useEffect(() => {
    if (user && 'data_bank_complete' in user) {
      setShowCompleteConfiguration(true);
      setIsBankDataCompleted(Boolean(user?.data_bank_complete));
    }
  }, [user, setIsBankDataCompleted, setShowCompleteConfiguration]);

  return (
    <div className="profile__content">
      <SimpleGrid columns={1} spacing={5}>
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
        {showCompleteConfiguration && !isBankDataCompleted && (
          <Box>
            <Alert status="warning" variant="left-accent">
              <AlertIcon />
              Al parecer aun necesitas llenar unos campos para completar tu
              perfil
            </Alert>
          </Box>
        )}
        <Box>
          <Heading>{user?.name}</Heading>
        </Box>
        <Box>
          <ProfileTabs
            onBankInfoEdit={onBankInfoEdit}
            onBasicInfoEdit={onBasicInfoEdit}
            onDocumentsEdit={onDocumentsEdit}
            isLoading={isLoading}
            showCompleteConfiguration={showCompleteConfiguration}
          />
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Profile;
