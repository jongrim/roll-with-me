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
} from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';
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
                  <div>Show rolls and stuff</div>
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
                  <AmplifySignOut button-text="Custom Text">
                    Sign Out
                  </AmplifySignOut>
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