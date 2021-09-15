import React, { ReactElement, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { NIT_PATTERN } from '../../utils/patterns';
import { useFilePicker } from 'use-file-picker';
import { FileContent } from 'use-file-picker/dist/interfaces';

const Documents = ({ onSubmit, isLoading }: IDocumentsProps): ReactElement => {
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
  const [files, setFiles] = useState<FileContent[]>([]);

  const deleteFile = (index: number) => {
    const filesListUpdated = files.filter((_, _index) => _index !== index);
    setFiles(filesListUpdated);
  };

  useEffect(() => {
    setFiles(filesContent);
  }, [filesContent, setFiles]);

  const onSubmitData = (data: IDocumentsFormData) => {
    onSubmit({
      ...data,
      files,
    });
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
          <Alert status="info" marginBottom={5}>
            <AlertIcon />
            <p>
              Para hacer una correcta validacion de los datos anteriores, te
              solicitamos que agregues una foto de tus documentos:&nbsp;
              <b>
                tarjeta de circulacion, tarjeta de conducir y solvencia
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
            <Tag size="lg" marginBottom={1} key={`file-item-id-${index}`}>
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
