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
} from '@chakra-ui/react';
import {
  RiHomeHeartLine,
  RiUserSmileLine,
  RiFileCopyLine,
} from 'react-icons/ri';
import { Link as ReactRouterLink } from 'react-router-dom';

const SettingsBar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex p={2}>
      <Box>
        <Link as={ReactRouterLink} to="/">
          <IconButton
            aria-label="home"
            icon={<RiHomeHeartLine />}
            fontSize="28px"
            variant="clear"
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
          variant="clear"
          mr={3}
        />
        <IconButton
          aria-label="log in or sign up"
          icon={<RiUserSmileLine />}
          fontSize="28px"
          variant="clear"
        />
      </HStack>
    </Flex>
  );
};

export default SettingsBar;
