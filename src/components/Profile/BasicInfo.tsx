import React, { ReactElement, useContext, useState } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Heading,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ProfileContext } from '../../store/profile.context';

const BasicInfo = ({ onSubmit, isLoading }: IBasicInfoProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const { user } = useContext(ProfileContext);

  return (
    <>
      {isEditable ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={1} spacing={5}>
            <Box>
              <FormControl id="name" isRequired isInvalid={errors.name}>
                <FormLabel>Nombre completo</FormLabel>
                <Input
                  autoComplete="off"
                  type="text"
                  {...register('name', {
                    required: true,
                    pattern: new RegExp(
                      '^([a-zA-ZÁÉÍÓÚÜáéíóúü]{3,}[\\W]?){1,6}$',
                    ),
                  })}
                  defaultValue={user?.name}
                />
                <FormHelperText>Debe ser tu nombre real.</FormHelperText>
                <FormErrorMessage>
                  {errors.name && 'El nombre debe ser uno valido.'}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="phone" isRequired isInvalid={errors.phone}>
                <FormLabel>Telefono</FormLabel>
                <Input
                  autoComplete="off"
                  type="number"
                  {...register('phone', {
                    required: true,
                    pattern: new RegExp('^[276][0-9]{7}$'),
                  })}
                  defaultValue={user?.phone}
                />
                <FormHelperText>
                  Debe ser un numero real al que podamos contactarte en una
                  emergencia.
                </FormHelperText>
                <FormErrorMessage>
                  {errors.phone && 'Debe ser un numero valido.'}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box className="actions">
              <Button onClick={() => setIsEditable(false)}>Cancelar</Button>
              <Button isLoading={isLoading} type="submit" colorScheme="teal">
                Guardar
              </Button>
            </Box>
          </SimpleGrid>
        </form>
      ) : (
        <SimpleGrid columns={1} spacing={3}>
          <Box>
            <Text fontSize="xs">Nombre</Text>
            <Heading fontSize="lg">{user?.name}</Heading>
          </Box>
          <Box>
            <Text fontSize="xs">Correo electronico</Text>
            <Heading fontSize="lg">{user?.email}</Heading>
          </Box>
          <Box>
            <Text fontSize="xs">Telefono</Text>
            <Heading fontSize="lg">{user?.phone || 'Sin asignar'}</Heading>
          </Box>
          <Box>
            <Text fontSize="xs">DUI</Text>
            <Heading fontSize="lg">{user?.dui || 'Sin asignar'}</Heading>
          </Box>
          <Box className="actions">
            <Button onClick={() => setIsEditable(true)}>Editar</Button>
          </Box>
        </SimpleGrid>
      )}
    </>
  );
};

export interface IBasicInfoFormData {
  name: string;
  phone: string;
}

interface IBasicInfoProps {
  onSubmit: (formData: IBasicInfoFormData) => void;
  isLoading: boolean;
}

export default BasicInfo;
