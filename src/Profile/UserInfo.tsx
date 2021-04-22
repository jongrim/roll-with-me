import * as React from 'react';
import { Auth, Hub } from 'aws-amplify';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Link,
  Stack,
  Switch,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { RiCheckboxCircleLine, RiPencilLine } from 'react-icons/ri';
import { AuthContext } from '../AuthProvider';

const UserInfo = () => {
  const { user } = React.useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const hasDeclinedNotifications = window.localStorage.getItem(
    'desktop-notifications-declined'
  );

  return (
    <Box>
      <Heading size="md" as="h1">
        Account Settings
      </Heading>
      <Grid
        templateColumns={['1fr', '1fr', '1fr', '1.75fr 1fr']}
        gap={6}
        mt={3}
      >
        <GridItem>
          <Stack direction="column" divider={<Divider />} spacing={6}>
            <Box>
              <Text fontWeight="600">Username</Text>
              <Text mt={2}>{user?.username}</Text>
            </Box>
            <DisplayUsername
              displayName={user?.attributes.preferred_username}
            />
            <Box>
              <Text fontWeight="600">Color mode</Text>
              <HStack spacing={3} mt={2}>
                <Text>Light mode</Text>
                <Switch
                  colorScheme="purple"
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
                <Text>Dark mode</Text>
              </HStack>
            </Box>
            {hasDeclinedNotifications && (
              <Box>
                <Text fontWeight="600">Desktop notifications</Text>
                <Text>Clear your saved dismissal?</Text>
                <Button
                  mt={2}
                  onClick={() =>
                    window.localStorage.removeItem(
                      'desktop-notifications-declined'
                    )
                  }
                >
                  Clear
                </Button>
              </Box>
            )}
            {!user?.attributes.identities && <Password />}
            <Box>
              <Link
                color="red.500"
                as={ReactRouterLink}
                to="/profile/settings/deactivate"
              >
                Deactivate account
              </Link>
            </Box>
          </Stack>
        </GridItem>
        <GridItem>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            px={4}
            py={3}
          >
            <Heading as="h2" mt={2} size="sm">
              Which details can you edit?
            </Heading>
            <Text mt={3}>
              Your username cannot be changed at this time, however you can
              change your display username. While this is not displayed to
              others at this time, future features may display it.
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

const DisplayUsername: React.FC<{ displayName?: string }> = ({
  displayName,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(displayName);
  const toast = useToast();

  const updatePreferredUsername = async () => {
    setIsSubmitting(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(currentUser, {
        preferred_username: nameValue,
      });
      toast({
        description: 'Display name updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
      Hub.dispatch('internal-user-updates', {
        event: 'update-user-display-name',
        data: nameValue,
      });
    } catch (e) {
      console.warn(e);
      toast({
        description: 'Unable to update display name',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return isEditing ? (
    <Box>
      <form>
        <FormControl isRequired>
          <FormLabel fontWeight="600">Display name</FormLabel>
          <Input
            value={nameValue}
            onChange={({ target }) => setNameValue(target.value)}
          />
        </FormControl>
        <ButtonGroup spacing={2} mt={2}>
          <Button
            isLoading={isSubmitting}
            kind="submit"
            colorScheme="teal"
            onClick={updatePreferredUsername}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setNameValue(displayName);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  ) : (
    <Box>
      <Text fontWeight="600">Display name</Text>
      <Text mt={2}>{displayName || 'Not set'}</Text>
      <Button
        variant="link"
        colorScheme="blue"
        mt={2}
        onClick={() => setIsEditing(true)}
        leftIcon={<RiPencilLine />}
      >
        Edit
      </Button>
    </Box>
  );
};

const Password = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [pwDontMatch, setPwDontMatch] = React.useState(false);
  const toast = useToast();

  const [currentPw, setCurrentPw] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [confirmNewPw, setConfirmNewPw] = React.useState('');

  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const specialRegex = /\W|_/;

  const newPwHasLowercase = lowercaseRegex.test(newPw);
  const newPwHasUppercase = uppercaseRegex.test(newPw);
  const newPwHasSpecial = specialRegex.test(newPw);
  const newPwHasLength = newPw.length >= 10;

  const updatePassword = async () => {
    if (newPw !== confirmNewPw) {
      setPwDontMatch(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      await Auth.changePassword(currentUser, currentPw, newPw);
      toast({
        description: 'Password updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (e) {
      console.warn(e);
      toast({
        description: 'Unable to change password',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return isEditing ? (
    <Box>
      <form>
        <FormControl isRequired>
          <FormLabel>Current password</FormLabel>
          <Input
            value={currentPw}
            onChange={({ target }) => setCurrentPw(target.value)}
          />
        </FormControl>
        <Text mt={4} mb={2} fontWeight="500">
          Password complexity requirements
        </Text>
        <List spacing={3}>
          <ListItem display="flex" alignItems="center">
            <ListIcon
              as={RiCheckboxCircleLine}
              color={newPwHasLowercase ? 'green.500' : 'gray.600'}
            />
            Lowercase
          </ListItem>
          <ListItem display="flex" alignItems="center">
            <ListIcon
              as={RiCheckboxCircleLine}
              color={newPwHasUppercase ? 'green.500' : 'gray.600'}
            />
            Uppercase
          </ListItem>
          <ListItem display="flex" alignItems="center">
            <ListIcon
              as={RiCheckboxCircleLine}
              color={newPwHasSpecial ? 'green.500' : 'gray.600'}
            />
            Special character
          </ListItem>
          <ListItem display="flex" alignItems="center">
            <ListIcon
              as={RiCheckboxCircleLine}
              color={newPwHasLength ? 'green.500' : 'gray.600'}
            />
            At least 10 characters
          </ListItem>
        </List>
        <FormControl isRequired mt={3}>
          <FormLabel>New password</FormLabel>
          <Input
            value={newPw}
            onChange={({ target }) => setNewPw(target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={2} isInvalid={pwDontMatch}>
          <FormLabel>Confirm new password</FormLabel>
          <Input
            value={confirmNewPw}
            onChange={({ target }) => setConfirmNewPw(target.value)}
          />
          <FormErrorMessage>
            Password does not match. Please try again.
          </FormErrorMessage>
        </FormControl>
        <ButtonGroup spacing={2} mt={2}>
          <Button
            isLoading={isSubmitting}
            kind="submit"
            colorScheme="teal"
            onClick={updatePassword}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setCurrentPw('');
              setNewPw('');
              setConfirmNewPw('');
              setPwDontMatch(false);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  ) : (
    <Box>
      <Button
        variant="link"
        colorScheme="blue"
        mt={2}
        onClick={() => setIsEditing(true)}
      >
        Update Password
      </Button>
    </Box>
  );
};

export default UserInfo;
