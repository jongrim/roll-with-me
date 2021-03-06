import * as React from 'react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Link,
  IconButton,
  Flex,
  Stack,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { RiHomeHeartLine } from 'react-icons/ri';

function Guide() {
  const linkColor = useColorModeValue('blue.500', 'blue.200');
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
        <Container maxW="4xl">
          <Heading>Usage Guide</Heading>
          <UnorderedList spacing={3} mt={3}>
            <ListItem>
              <Link color={linkColor} href="#room-lifetime">
                How long are rooms saved?
              </Link>
            </ListItem>
          </UnorderedList>
          <Divider my={12} />
          <Stack direction="column" spacing={8}>
            <Box id="room-lifetime">
              <Heading as="h3" size="lg" mb={2}>
                How long are rooms saved?
              </Heading>
              <Text>
                Room data is not automatically deleted at this time. However,
                after six months of inactivity, a room is eligible to be deleted
                if a room of the same name is requested. You can also delete a
                room yourself by using the Room Controls area within it.
              </Text>
              <Text mt={3}>
                Note that not all actions count as room activity. In general,
                only rolling dice count as room activity, so updating other
                items like characters, clocks, etc will not update a room's
                recent activity timestamp.
              </Text>
            </Box>
          </Stack>
        </Container>
      </GridItem>
    </Grid>
  );
}

export default Guide;
