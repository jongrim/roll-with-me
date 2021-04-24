import * as React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export default function Fallback() {
  return (
    <Flex
      position="fixed"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Flex>
  );
}
