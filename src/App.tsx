import React, { ReactElement } from 'react';
import Routing from './components/Routing';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Providers from './components/Providers';

const App = (): ReactElement => (
  <ChakraProvider>
    <Providers>
      <Container>
        <Routing />
      </Container>
    </Providers>
  </ChakraProvider>
);

export default App;
