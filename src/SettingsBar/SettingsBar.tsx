import * as React from 'react';
import {
  Box,
  Flex,
  Switch,
  useColorMode,
  Spacer,
  IconButton,
  Link,
  HStack,
  useDisclosure,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import {
  RiHomeHeartLine,
  RiUserSmileLine,
  RiFileCopyLine,
} from 'react-icons/ri';
import { Link as ReactRouterLink } from 'react-router-dom';
import ProfileDrawer from '../Profile/ProfileDrawer';

interface SettingsBarProps {
  username: string;
  setUsername: (val: string) => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ username, setUsername }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Copied!',
        status: 'success',
        duration: 5000,
      });
    }
  }, [hasCopied, toast]);

  return (
    <Flex p={2}>
      <Box>
        <Link as={ReactRouterLink} to="/">
          <IconButton
            aria-label="home"
            icon={<RiHomeHeartLine />}
            fontSize="28px"
            variant="ghost"
          />
        </Link>
      </Box>
      <Spacer />
      <HStack spacing={1} align="center">
        <Switch
          colorScheme="purple"
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          mr={3}
        />
        <IconButton
          aria-label="copy URL"
          icon={<RiFileCopyLine />}
          fontSize="28px"
          variant="ghost"
          onClick={onCopy}
          mr={3}
        />
        <IconButton
          aria-label="log in or sign up"
          icon={<RiUserSmileLine />}
          fontSize="28px"
          variant="ghost"
          ref={btnRef}
          onClick={onOpen}
        />
      </HStack>
      <ProfileDrawer
        isOpen={isOpen}
        onClose={onClose}
        username={username}
        setUsername={setUsername}
      />
    </Flex>
  );
};

export default SettingsBar;
