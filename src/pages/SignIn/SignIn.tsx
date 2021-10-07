import React, { ReactElement, useContext } from 'react';
import {
  Heading,
  SimpleGrid,
  Box,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { AIVOI_ROLES } from '../../utils/roles';
import { useHistory } from 'react-router';
import { AuthContext } from '../../store/auth.context';
import { ProfileContext } from '../../store/profile.context';
import { doLogin } from '../../services/auth.service';

import './SignIn.css';

const SignIn = (): ReactElement => {
  const history = useHistory();
  const toast = useToast();
  const context = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password, role }: ISignInFormData) => {
    try {
      const {
        data: { data },
      } = await doLogin(email, password, role);
      const { token, user } = data;
      if (token && user) {
        sessionStorage.setItem('role', String(role));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', String(user.user_id || ''));

        context.setToken(token);
        profileContext.setProfile(user, role);
        history.push('/profile');
      } else {
        toast({
          status: 'error',
          title: 'No te hemos podido reconocer :(',
          description: 'Error de aplicacion (2007).',
        });
      }
    } catch (ex) {
      toast({
        status: 'error',
        title: 'No te hemos podido reconocer :(',
        description: 'Verifica que tus credenciales esten correctas.',
      });
    }
  };

  return (
    <div className="signin__content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={1} spacing={5}>
          <Box>
            <Heading>Iniciar sesion</Heading>
          </Box>
          <Box>
            <FormControl id="email" isRequired isInvalid={errors.email}>
              <FormLabel>Correo electronico</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                {...register('email', {
                  required: true,
                })}
              />
              <FormHelperText>
                Ingresa el correo electronico asociado a tu cuenta.
              </FormHelperText>
              <FormErrorMessage>
                {errors.email && 'Debe ser un correo electronico valido.'}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="password" isRequired isInvalid={errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                autoComplete="off"
                type="password"
                {...register('password', {
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.password && 'Debe ser una contraseña valida.'}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl id="role" isRequired>
              <FormLabel>Tipo de consumidor</FormLabel>
              <Select
                {...register('role', {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="Seleccionar..."
                defaultValue={AIVOI_ROLES.CLIENT}
              >
                <option value={AIVOI_ROLES.CLIENT}>Usuario</option>
                <option value={AIVOI_ROLES.DRIVER}>Conductor</option>
              </Select>
              <FormErrorMessage>
                {errors.role && 'Debes escoger un rol.'}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <Button
              colorScheme="cyan"
              textColor="white"
              type="submit"
              width="100%"
              fontWeight="bold"
              textTransform="uppercase"
              isLoading={isSubmitting}
            >
              Iniciar sesion
            </Button>
          </Box>
        </SimpleGrid>
      </form>
    </div>
  );
};

export interface ISignInFormData {
  email: string;
  password: string;
  role: AIVOI_ROLES;
}

export default SignIn;
