import * as React from 'react';
import { NavLink as ReactRouterLink, Route } from 'react-router-dom';
import { AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

import { AuthContext } from '../AuthProvider';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Link,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import UserInfo from './UserInfo';
import { RiHomeHeartLine } from 'react-icons/ri';
import DeactivateAccount from './DeactivateAccount';
import UserSavedRolls from './UserSavedRolls';
import ActiveRooms from './ActiveRooms';
import SafetyItems from './SafetyItems';

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

  const activeLinkStyle = {
    fontWeight: 600,
    backgroundColor: colorMode === 'dark' ? 'blue.700' : 'blue.50',
  };

  return (
    <Grid templateRows="auto minmax(0, 1fr)" h="full">
      <GridItem>
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
      </GridItem>
      <GridItem h="full">
        <Grid
          templateColumns={['1fr', '1fr', '250px 1fr']}
          templateRows={['60px 1fr', '60px 1fr', '1fr']}
          h="full"
          py={4}
        >
          <Flex
            flexDirection={['row', 'row', 'column']}
            alignItems={['center', 'center', 'stretch']}
            justifyContent={['center', 'center', 'start']}
            px={3}
          >
            <Link
              rounded="lg"
              py={3}
              px={4}
              as={ReactRouterLink}
              to="/profile/settings"
              _activeLink={activeLinkStyle}
            >
              Account Settings
            </Link>
            <Link
              rounded="lg"
              py={3}
              px={4}
              as={ReactRouterLink}
              to="/profile/rolls"
              _activeLink={activeLinkStyle}
            >
              Your Rolls
            </Link>
            <Link
              rounded="lg"
              py={3}
              px={4}
              as={ReactRouterLink}
              to="/profile/safety"
              _activeLink={activeLinkStyle}
            >
              Your Safety List
            </Link>
            <Link
              rounded="lg"
              py={3}
              px={4}
              as={ReactRouterLink}
              to="/profile/rooms"
              _activeLink={activeLinkStyle}
            >
              Active Rooms
            </Link>
            <Spacer />
            <Button variant="ghost" onClick={() => Auth.signOut()}>
              Sign Out
            </Button>
          </Flex>
          <Box h="full" overflow="auto">
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
              <MainContent>
                <UserSavedRolls />
              </MainContent>
            </Route>
            <Route path="/profile/safety">
              <MainContent>
                <SafetyItems />
              </MainContent>
            </Route>
            <Route path="/profile/rooms">
              <MainContent>
                <ActiveRooms />
              </MainContent>
            </Route>
          </Box>
        </Grid>
      </GridItem>
    </Grid>
  );
};

const MainContent: React.FC = ({ children }) => (
  <Box py={3} px={4} h="full">
    {children}
  </Box>
);

export default Profile;
