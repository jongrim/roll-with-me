import * as React from 'react';
import {
  Grid,
  GridItem,
  Container,
  Text,
  Stack,
  Link,
  Heading,
  Img,
  Flex,
  Button,
  IconButton,
} from '@chakra-ui/core';
import { FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa';
import { API } from 'aws-amplify';
import logo from './images/personWithCoffee.svg';

function Home() {
  const [roomName, setRoomName] = React.useState('');
  React.useEffect(() => {
    API.get('randomNameAPI', '/random-room-name', {}).then(({ result }) => {
      setRoomName(result);
    });
  }, []);
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6} bg="gray.800">
        <Container centerContent py={2}>
          <Stack spacing={2}>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              color="gray.100"
              textAlign="center"
            >
              Black Lives Matter
            </Text>
            <Text fontSize="md" color="gray.100" textAlign="center">
              Please support initiatives like the{' '}
              <Link href="https://eji.org/" isExternal color="teal.200">
                Equal Justice Initiative
              </Link>
            </Text>
          </Stack>
        </Container>
      </GridItem>
      <GridItem py={6} colStart={2} colEnd={6}>
        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2} mt={[3, 3, 0]} mr={[0, 0, 3]}>
            <Heading
              as="h1"
              fontFamily="title"
              fontSize={['5xl', '6xl', '7xl']}
            >
              Roll With Me
            </Heading>
            <Text fontSize="lg" w="80">
              Digital tools for playing great roleplaying games online
            </Text>
          </Stack>
          <Img w="40" src={logo} alt="Person holding cup of coffee" />
        </Flex>
        <Grid mt={5} templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']} gap={4}>
          <GridItem>
            <Heading as="h3" fontSize="xl">
              Dice Rooms
            </Heading>
            <Text>
              Make a room and share the URL with friends to roll dice together
            </Text>
            <Stack spacing={3} mt={3}>
              <Link href={`/r/${roomName}`}>
                <Button variant="outline" colorScheme="purple" w="full">
                  New Text Room
                </Button>
              </Link>
              <Link href={`/i/${roomName}`}>
                <Button variant="outline" colorScheme="blue" w="full">
                  New Interactive Room
                </Button>
              </Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Heading as="h3" fontSize="xl">
              Game Rooms
            </Heading>
            <Text>
              Everything you need to play a game including character sheets,
              dice, and safety tools
            </Text>
            <Stack spacing={3} mt={3}>
              <Link href={`/trophy-dark/${roomName}`}>
                <Button variant="outline" colorScheme="black" w="full">
                  Trophy Dark
                </Button>
              </Link>
            </Stack>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem h="xl" colSpan={6} bg="teal.50">
        First call out
      </GridItem>
      <GridItem h="xl" colSpan={6} bg="black.200">
        Trophy Dark
      </GridItem>
      <GridItem
        colSpan={6}
        border="1px"
        borderColor="gray.100"
        pt={3}
        px={3}
        pb={1}
      >
        <Flex justifyContent="center">
          <Text>Designed and Developed by Jon Grim</Text>
        </Flex>
        <Flex justifyContent="center" mt={2}>
          <Link href="https://github.com/jongrim/roll-with-me" isExternal>
            <IconButton
              icon={<FaGithub />}
              aria-label="Github icon"
              variant="link"
              colorScheme="black"
              mr={2}
            />
          </Link>
          <Link href="https://twitter.com/jonjongrim" isExternal>
            <IconButton
              icon={<FaTwitter />}
              aria-label="Twitter icon"
              variant="link"
              colorScheme="black"
              mr={2}
            />
          </Link>
          <Link href="mailto:jonjongrim@gmail.com" isExternal>
            <IconButton
              icon={<FaEnvelope />}
              aria-label="mail envelope"
              variant="link"
              colorScheme="black"
            />
          </Link>
        </Flex>
        <Heading as="h4" fontFamily="title" fontSize="lg">
          Roll With Me
        </Heading>
      </GridItem>
    </Grid>
  );
}

export default Home;
