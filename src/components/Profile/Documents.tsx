import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SimpleGrid,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Tag,
  Avatar,
  TagLabel,
  CloseButton,
  Alert,
  AlertIcon,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { NIT_PATTERN } from '../../utils/patterns';
import { useFilePicker } from 'use-file-picker';
import { FileContent } from 'use-file-picker/dist/interfaces';
import { ProfileContext } from '../../store/profile.context';

const Documents = ({ onSubmit, isLoading }: IDocumentsProps): ReactElement => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.png,.jpg,.jpeg',
    readAs: 'DataURL',
    multiple: true,
  });
  const { user } = useContext(ProfileContext);
  const [files, setFiles] = useState<FileContent[]>([]);

  const deleteFile = (index: number) => {
    const filesListUpdated = files.filter((_, _index) => _index !== index);
    setFiles(filesListUpdated);
  };

  useEffect(() => {
    setFiles(filesContent);
  }, [filesContent, setFiles]);

  const onSubmitData = (data: IDocumentsFormData) => {
    // 3 files allowed only
    if (files.length === 4 || files.length === 0) {
      onSubmit({
        ...data,
        files,
      });
    } else {
      toast({
        status: 'warning',
        title: 'Numero de archivos incorrecto',
        description:
          'Debes de adjuntar un total de 4 fotos: DUI, tarjeta de circulacion, licencia de conducir y solvencia policial.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <SimpleGrid columns={1} spacing={5}>
        <Box>
          <FormControl
            id="drivingCard"
            isRequired
            isInvalid={errors.drivingCard}
          >
            <FormLabel>Tarjeta de conducir</FormLabel>
            <Input
              autoComplete="off"
              type="text"
              {...register('drivingCard', {
                required: true,
                pattern: new RegExp(NIT_PATTERN),
              })}
              defaultValue={user?.num_licence}
            />
            <FormHelperText>
              El documento debe estar vigente para poder aplicar.
            </FormHelperText>
            <FormErrorMessage>
              {errors.drivingCard && 'El numero de documento debe ser valido.'}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="circulationCard"
            isRequired
            isInvalid={errors.circulationCard}
          >
            <FormLabel>Tarjeta de circulacion</FormLabel>
            <Input
              autoComplete="off"
              type="text"
              {...register('circulationCard', {
                required: true,
                pattern: new RegExp(NIT_PATTERN),
              })}
              defaultValue={user?.num_card_circulation}
            />
            <FormHelperText>
              El documento debe estar vigente para poder aplicar.
            </FormHelperText>
            <FormErrorMessage>
              {errors.circulationCard &&
                'El numero de documento debe ser valido.'}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <Wrap>
            {user?.photo_licence && (
              <WrapItem>
                <Avatar name="Licencia de conducir" src={user.photo_licence} />
              </WrapItem>
            )}
            {user?.photo_background && (
              <WrapItem>
                <Avatar name="Tarjeta de circulacion" src={user.photo_background} />
              </WrapItem>
            )}
            {user?.photo_dui && (
              <WrapItem>
                <Avatar name="DUI" src={user.photo_dui} />
              </WrapItem>
            )}
            {user?.photo_solvency_pnc && (
              <WrapItem>
                <Avatar name="Solvencia PNC" src={user.photo_solvency_pnc} />
              </WrapItem>
            )}
          </Wrap>
        </Box>
        <Box>
          <Alert status="info" marginBottom={5}>
            <AlertIcon />
            <p>
              Para hacer una correcta validacion de los datos anteriores, te
              solicitamos que agregues una foto de tus documentos en el
              siguiente orden:&nbsp;
              <b>
                DUI, tarjeta de circulacion, licencia de conducir y solvencia
                policial.
              </b>
            </p>
          </Alert>
          <Button
            leftIcon={<AttachmentIcon />}
            size="lg"
            isLoading={loading || isLoading}
            onClick={openFileSelector}
            width="100%"
          >
            Adjuntar documentos
          </Button>
        </Box>
        <Box>
          {files.map((file, index) => (
            <Tag
              size="lg"
              marginBottom={1}
              marginLeft={1}
              key={`file-item-id-${index}`}
            >
              <Avatar
                src={file.content}
                size="xs"
                name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
              <TagLabel>{file.name}</TagLabel>
              <CloseButton onClick={() => deleteFile(index)} />
            </Tag>
          ))}
        </Box>
        <Box className="actions">
          <Button isLoading={isLoading} colorScheme="teal" type="submit">
            Guardar
          </Button>
        </Box>
      </SimpleGrid>
    </form>
  );
};

export interface IDocumentsFormData {
  circulationCard: string;
  drivingCard: string;
  files: FileContent[];
}

interface IDocumentsProps {
  onSubmit: (formData: IDocumentsFormData) => void;
  isLoading: boolean;
}

export default Documents;
