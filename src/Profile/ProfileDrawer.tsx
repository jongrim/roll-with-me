import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Link,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../AuthProvider';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = React.forwardRef<HTMLButtonElement, ProfileDrawerProps>(
  ({ isOpen, onClose }, btnRef) => {
    const { user } = React.useContext(AuthContext);
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          // @ts-ignore
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your profile</DrawerHeader>
              <DrawerBody>
                {user ? (
                  <Stack spacing={6} divider={<Divider />}>
                    <Link
                      as={ReactRouterLink}
                      to="/profile/settings"
                      color="brand.500"
                    >
                      Manage profile
                    </Link>
                    <Link as={ReactRouterLink} to="/feedback" color="brand.500">
                      Provide feedback
                    </Link>
                  </Stack>
                ) : (
                  <Button
                    onClick={() =>
                      // @ts-ignore
                      Auth.federatedSignIn({
                        customState: `return=${window.location.pathname}`,
                      })
                    }
                    colorScheme="brand"
                  >
                    Sign In or Create an Account
                  </Button>
                )}
              </DrawerBody>
              <DrawerFooter>
                {user && (
                  <Button
                    variant="ghost"
                    w="full"
                    colorScheme="gray"
                    onClick={() => Auth.signOut()}
                  >
                    Sign Out
                  </Button>
                )}
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  }
);

export default ProfileDrawer;
