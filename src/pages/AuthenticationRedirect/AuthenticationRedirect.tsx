import React, { ReactElement, useEffect, useState } from 'react';
import { CircularProgress } from '@chakra-ui/progress';
import { Center } from '@chakra-ui/layout';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';
import { useQueryParams } from '../../utils/useQueryParams';

import './AuthenticationRedirect.css';

const AuthenticationRedirect = (): ReactElement => {
  const query = useQueryParams();
  const [isRejected, setIsRejected] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const token = query.get('token');
    const user = query.get('user');
    const role = query.get('role');
    const expired = query.get('expired');

    if (!expired) {
      if (token && user && role) {
        try {
          const userDecoded = JSON.parse(atob(user));
          const userParsedToString = JSON.stringify(userDecoded);
          setTimeout(() => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', userParsedToString);
            sessionStorage.setItem('role', role);
            window.location.href = '#/profile';
          }, 1000);
        } catch (ex) {
          setIsRejected(true);
        }
      } else {
        setIsRejected(true);
      }
    } else {
      setIsExpired(true);
    }
  }, [query, setIsRejected, setIsExpired]);

  return (
    <div className="authentication-redirect__container">
      {isExpired ? (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Sesion expirada!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Debes volver a iniciar sesion para poder acceder al portal.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Alert
            status={isRejected ? 'error' : 'info'}
            variant="left-accent"
            className="alert__container"
          >
            <AlertIcon />
            {!isRejected
              ? 'Cargando datos, espere un momento...'
              : 'Los datos no se pudieron leer con exito.'}
          </Alert>
          {!isRejected && (
            <Center>
              <CircularProgress isIndeterminate color="cyan.300" />
            </Center>
          )}
        </>
      )}
    </div>
  );
};

export default AuthenticationRedirect;
