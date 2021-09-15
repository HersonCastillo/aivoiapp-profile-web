import React, { ReactElement } from 'react';
import {
  Select,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  SimpleGrid,
  Text,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const BankInfo = ({ onSubmit, isLoading }: IBankInfoProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={1} spacing={5}>
        <Box>
          <Alert status="info">
            <AlertIcon />
            <Text fontSize="xs">
              Por terminos de seguridad, no mostraremos la informacion completa.
              Si necesitas cambiar algun dato deberas actualizar todo el
              formulario.
            </Text>
          </Alert>
        </Box>
        <Box>
          <FormControl id="bank" isRequired isInvalid={errors.bankName}>
            <FormLabel>Banco</FormLabel>
            <Select
              placeholder="Selecciona un banco"
              {...register('bankName', {
                required: true,
              })}
            >
              <option value="option1">BANCO DE AMERICA CENTRAL</option>
              <option value="option2">BANCO CUSCATLAN</option>
              <option value="option3">BANCO DAVIVIENDA</option>
            </Select>
            <FormErrorMessage>
              {errors.bankName &&
                'Debes seleccionar un banco al cual realizar depositos.'}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="accountType"
            isRequired
            isInvalid={errors.accountType}
          >
            <FormLabel>Tipo de cuenta</FormLabel>
            <Select
              placeholder="Selecciona un tipo de cuenta"
              {...register('accountType', {
                required: true,
              })}
            >
              <option value="option1">Ahorro</option>
              <option value="option2">Corriente</option>
            </Select>
            <FormErrorMessage>
              {errors.accountType &&
                'Debes seleccionar un tipo de cuenta valido.'}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="accountNumber"
            isRequired
            isInvalid={errors.accountNumber}
          >
            <FormLabel>Tipo de cuenta</FormLabel>
            <Input
              placeholder="Numero de cuenta"
              {...register('accountNumber', {
                required: true,
              })}
            />
            <FormHelperText>
              Numero de cuenta la cual recibira depositos.
            </FormHelperText>
            <FormErrorMessage>
              {errors.accountNumber && 'Debe ser un numero de cuenta valido.'}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box className="actions">
          <Button isLoading={isLoading} type="submit" colorScheme="teal">
            Guardar
          </Button>
        </Box>
      </SimpleGrid>
    </form>
  );
};

export interface IBankInfoFormData {
  bankType: string;
  accountType: string;
  accountNumber: string;
}

interface IBankInfoProps {
  onSubmit: (formData: IBankInfoFormData) => void;
  isLoading: boolean;
}

export default BankInfo;
