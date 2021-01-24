import { Container } from '@chakra-ui/react';
import * as React from 'react';

const Feedback = () => {
  return (
    <Container h="full" w="full" maxW="4xl">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScIpE3NI--ld-5qPwvBN-KVEGQZ7wQneAiedDfEoxeZLaTbQg/viewform?embedded=true"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="feedback-form"
      >
        Loading…
      </iframe>
    </Container>
  );
};

export default Feedback;
