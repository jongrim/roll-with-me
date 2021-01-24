import * as React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../AuthProvider';

const DeactivateAccount = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <Box>
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/profile/settings">
            Account Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            as={ReactRouterLink}
            to="/profile/settings/deactivate"
          >
            Deactivate Account
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {user?.attributes.identities ? (
        <RevokAccessInstructions />
      ) : (
        <DeactivateInstructions />
      )}
    </Box>
  );
};

const RevokAccessInstructions = () => {
  return (
    <Box mt={6}>
      <Text>
        You have signed in with Google. You can revoke access to Roll With Me by
        following{' '}
        <Link
          href="https://support.google.com/accounts/answer/112802?hl=en&ref_topic=7188760"
          color="brand.500"
          isExternal
        >
          these instructions from Google.
        </Link>
      </Text>
    </Box>
  );
};

const DeactivateInstructions = () => {
  const history = useHistory();

  const deactivateUser = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        user.deleteUser((err: Error, data: any) => {
          if (err) {
            console.warn(err);
          }
          Auth.signOut();
          history.push('/');
        });
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  return (
    <Box mt={6}>
      <Text>
        You can deactivate your account by clicking the button below. After,
        your account will not be usable and your data will not be available. You
        will have to create a new account if you would like to sign in again.
      </Text>
      <Text mt={4}>Click Deactivate Account if you wish to proceed.</Text>
      <Button mt={3} colorScheme="blue" onClick={deactivateUser}>
        Deactivate Account
      </Button>
    </Box>
  );
};

export default DeactivateAccount;
