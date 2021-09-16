import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Select,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { getBanks } from '../../services/profile.service';
import { IBank } from '../../interfaces/bank';
import { ProfileContext } from '../../store/profile.context';

const BankInfo = ({ onSubmit, isLoading }: IBankInfoProps): ReactElement => {
  const { user } = useContext(ProfileContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [banks, setBanks] = useState<IBank[]>([]);

  useEffect(() => {
    getBanks().then(({ data: response }) => {
      setBanks(response.data);
    });
  }, [setBanks]);

  useEffect(() => {
    if (user && banks.length) {
      setValue('bankId', user?.bank_id);
    }
  }, [setValue, banks, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={1} spacing={5}>
        <Box>
          <FormControl id="bank" isRequired isInvalid={errors.bankId}>
            <FormLabel>Banco</FormLabel>
            <Select
              placeholder="Selecciona un banco"
              {...register('bankId', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={user?.bank_id}
            >
              {banks.map(({ name, id }, index) => (
                <option key={`bank-item-id-${index}`} value={id}>
                  {name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.bankId &&
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
              defaultValue={user?.type_account}
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
              autoComplete="off"
              {...register('accountNumber', {
                required: true,
              })}
              defaultValue={user?.num_account}
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
  bankId: number;
  accountType: string;
  accountNumber: string;
}

interface IBankInfoProps {
  onSubmit: (formData: IBankInfoFormData) => void;
  isLoading: boolean;
}

export default BankInfo;
