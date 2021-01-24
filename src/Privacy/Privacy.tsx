import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const Privacy = () => {
  return (
    <Container maxW="4xl" h="full">
      <Heading mt={3}>Privacy Notice</Heading>
      <Text mt={3}>
        Your privacy is important to Roll With Me, and you should be in control
        of your data.
      </Text>
      <Text mt={3}>
        If you do not create an account, Roll With Me does not collect any
        information about you.
      </Text>
      <Text mt={3}>
        When you create an account, Roll With Me collects your email. This is
        not shared with any outside party aside from Amazon Cognito which
        provides the authentication service. When signing up through Google,
        only your email and information you make public is visible to Roll With
        Me.
      </Text>
      <Heading as="h2" size="lg" mt={6}>
        Cookies
      </Heading>
      <Text mt={3}>
        Roll With Me does not use any cookies for personalization or tracking.
        If you create an account, cookies are used to track your session and
        reauthenticate you on return visits. These cookies are managed as part
        of the Amazon Cognito authentication service, and to the developer's
        knowledge are not used by Amazon for identification or tracking of users
        across sites or properties (if you find otherwise please let me know
        immediately).
      </Text>
      <Heading as="h2" size="lg" mt={6}>
        Ways to protect your privacy
      </Heading>
      <Text mt={3}>
        There are several ways to protect your privacy on Roll With Me and on
        the internet in general:
      </Text>
      <UnorderedList spacing={2} mt={2}>
        <ListItem>
          Use an anonymous email for sign up. You do not need to use your
          primary email address.
        </ListItem>
        <ListItem>
          Use a browser such as{' '}
          <Link href="https://brave.com/" isExternal color="brand.500">
            Brave
          </Link>{' '}
          which automatically blocks trackers and ads.
        </ListItem>
        <ListItem>
          If you prefer a different browser, consider using the{' '}
          <Link href="https://privacybadger.org/" isExternal color="brand.500">
            Privacy Badger
          </Link>{' '}
          extension from the Electronic Frontier Foundation which can block
          trackers.
        </ListItem>
      </UnorderedList>
      <Box mt={8}>
        <Link as={ReactRouterLink} to="/" color="brand.500">
          Go Home
        </Link>
      </Box>
    </Container>
  );
};

export default Privacy;
