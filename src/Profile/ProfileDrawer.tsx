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
  Editable,
  EditablePreview,
  EditableInput,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../AuthProvider';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  setUsername: (val: string) => void;
}

const ProfileDrawer = React.forwardRef<HTMLButtonElement, ProfileDrawerProps>(
  ({ isOpen, onClose, username, setUsername }, btnRef) => {
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
                <Stack spacing={6} divider={<Divider />}>
                  <Box>
                    <HStack spacing={2}>
                      <Text fontWeight="600">Room Username</Text>
                      <Text fontSize="sm" fontWeight="300">
                        click to edit
                      </Text>
                    </HStack>
                    <Editable
                      defaultValue={username}
                      onSubmit={setUsername}
                      mt={2}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Box>
                  {user ? (
                    <Stack spacing={6} divider={<Divider />}>
                      <Link
                        as={ReactRouterLink}
                        to="/profile/settings"
                        color="brand.500"
                      >
                        Manage profile
                      </Link>
                      <Link
                        as={ReactRouterLink}
                        to="/feedback"
                        color="brand.500"
                      >
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
                </Stack>
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
