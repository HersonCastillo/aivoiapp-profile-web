import React, { ReactElement, useEffect, useState } from 'react';
import { CircularProgress } from '@chakra-ui/progress';
import { Center } from '@chakra-ui/layout';
import { useHistory, useParams } from 'react-router';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';
import { useQueryParams } from '../../utils/useQueryParams';

import './AuthenticationRedirect.css';

const AuthenticationRedirect = (): ReactElement => {
  const history = useHistory();
  const query = useQueryParams();
  const { role, userId } = useParams<{ userId: string; role: string }>();
  const [isRejected, setIsRejected] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const token = query.get('token');
    const expired = query.get('expired');

    if (!expired) {
      if (token && userId && role) {
        try {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('role', role);
          setTimeout(() => history.push('/profile'), 1000);
        } catch (ex) {
          setIsRejected(true);
        }
      } else {
        setIsRejected(true);
      }
    } else {
      setIsExpired(true);
    }
  }, [query, role, userId, setIsRejected, setIsExpired, history]);

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
