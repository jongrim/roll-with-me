import * as React from 'react';
import { NavLink as ReactRouterLink, Route } from 'react-router-dom';
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../AuthProvider';
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Link,
  useColorMode,
} from '@chakra-ui/react';
import UserInfo from './UserInfo';
import { RiHomeHeartLine } from 'react-icons/ri';
import DeactivateAccount from './DeactivateAccount';

const Profile: React.FC = () => {
  const { colorMode } = useColorMode();
  const { user, authState } = React.useContext(AuthContext);

  if (authState === AuthState.Loading) {
    return <div>'loading'</div>;
  }

  if (!user) {
    Auth.federatedSignIn();
    return null;
  }

  return (
    <>
      <Flex p={2}>
        <Link as={ReactRouterLink} to="/">
          <IconButton
            aria-label="home"
            icon={<RiHomeHeartLine />}
            fontSize="28px"
            variant="ghost"
          />
        </Link>
      </Flex>
      <Grid
        templateColumns={['1fr', '1fr', '250px 1fr']}
        templateRows={['60px 1fr', '60px 1fr', '1fr']}
        h="full"
      >
        <Flex
          flexDirection={['row', 'row', 'column']}
          alignItems={['center', 'center', 'stretch']}
          justifyContent={['center', 'center', 'start']}
        >
          <Link
            rounded="lg"
            m={3}
            py={3}
            px={4}
            as={ReactRouterLink}
            to="/profile/settings"
            _activeLink={{
              fontWeight: 600,
              backgroundColor: colorMode === 'dark' ? 'blue.700' : 'blue.50',
            }}
          >
            Account Settings
          </Link>
          <Link
            rounded="lg"
            m={3}
            py={3}
            px={4}
            as={ReactRouterLink}
            to="/profile/rolls"
            _activeLink={{
              fontWeight: 600,
              backgroundColor: colorMode === 'dark' ? 'blue.700' : 'blue.50',
            }}
          >
            Your Rolls
          </Link>
          <Link
            rounded="lg"
            m={3}
            py={3}
            px={4}
            as={ReactRouterLink}
            to="/profile/rooms"
            _activeLink={{
              fontWeight: 600,
              backgroundColor: colorMode === 'dark' ? 'blue.700' : 'blue.50',
            }}
          >
            Active Rooms
          </Link>
        </Flex>
        <Box>
          <Route exact path="/profile/settings">
            <MainContent>
              <UserInfo />
            </MainContent>
          </Route>
          <Route path="/profile/settings/deactivate">
            <MainContent>
              <DeactivateAccount />
            </MainContent>
          </Route>
          <Route path="/profile/rolls">
            <MainContent>Saved rolls</MainContent>
          </Route>
          <Route path="/profile/rooms">
            <MainContent>Active rooms</MainContent>
          </Route>
        </Box>
      </Grid>
    </>
  );
};

const MainContent: React.FC = ({ children }) => (
  <Box py={3} px={4}>
    {children}
  </Box>
);

export default Profile;
