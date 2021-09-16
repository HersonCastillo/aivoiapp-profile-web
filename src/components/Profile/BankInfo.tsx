import React, { ReactElement, useEffect, useState } from 'react';
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
import { getBanks } from '../../services/profile.service';
import { IBank } from '../../interfaces/bank';

const BankInfo = ({ onSubmit, isLoading }: IBankInfoProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [banks, setBanks] = useState<IBank[]>([]);

  useEffect(() => {
    getBanks().then(({ data: response }) => {
      setBanks(response.data);
    });
  }, [setBanks]);

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
                valueAsNumber: true,
              })}
            >
              {banks.map(({ name, id }, index) => (
                <option key={`bank-item-id-${index}`} value={id}>
                  {name}
                </option>
              ))}
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
              <option value="Ahorro">Ahorro</option>
              <option value="Corriente">Corriente</option>
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
            <FormLabel>Numero de cuenta</FormLabel>
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
