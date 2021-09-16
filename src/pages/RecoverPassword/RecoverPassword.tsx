import React, { ReactElement } from 'react';
import {
  SimpleGrid,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react';

import './RecoverPassword.css';
import { useForm } from 'react-hook-form';
import { recoverPassword } from '../../services/auth.service';

const RecoverPassword = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      const response = await recoverPassword(email);
      if (response) {
        toast({
          title: 'Solicitud enviada',
          description:
            'Quedate pendiente de tu correo electronico para los siguientes pasos.',
          status: 'success',
        });
        reset();
      }
    } catch (ex) {
      toast({
        title: 'Ups, tenemos un problema',
        description:
          'No podemos procesar tu solicitud, verifica que este correo electronico sea el correcto.',
        status: 'warning',
      });
    }
  };

  return (
    <div className="recover-password__container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={1} spacing={5}>
          <Box>
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>
                Trataremos de ayudarte a recuperar tu cuenta, necesitamos tu
                correo electronico para gestionar la recuperacion.
              </AlertDescription>
            </Alert>
          </Box>
          <Box>
            <FormControl id="email" isRequired isInvalid={errors.email}>
              <FormLabel>Correo electronico</FormLabel>
              <Input
                placeholder="Correo electronico"
                autoComplete="off"
                {...register('email', {
                  required: true,
                })}
              />
              <FormHelperText>
                Ingrese el correo electronico a recuperar.
              </FormHelperText>
              <FormErrorMessage>
                {errors.email && 'Debe ser un correo electronico valido.'}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box className="actions">
            <Button colorScheme="teal" type="submit">
              Enviar solicitud
            </Button>
          </Box>
        </SimpleGrid>
      </form>
    </div>
  );
};

export default RecoverPassword;
