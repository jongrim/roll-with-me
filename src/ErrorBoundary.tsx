import { Button, Container, Heading, Link, Text } from '@chakra-ui/react';
import * as React from 'react';
import rollbar from './utils/logger';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    rollbar.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container maxW="4xl" mt={12} p={3}>
          <Heading as="h1" mb={6}>
            We Rolled a Miss
          </Heading>
          <Text mb={3}>
            Oh no! It's frustrating when technology fails, and Roll With Me is
            sorry this happened to you. The error has been logged and reported
            already, but you can also{' '}
            <Link
              textDecoration="underline"
              color="brand.500"
              href="https://rollwithme.xyz/feedback"
              isExternal
            >
              provide feedback
            </Link>{' '}
            to help us narrow down the cause.
          </Text>
          <Button colorScheme="teal" onClick={() => window.location.reload()}>
            Refresh the page to dismiss this error
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}
