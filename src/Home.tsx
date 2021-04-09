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
  Input,
  InputGroup,
  Box,
  Center,
  HStack,
  LightMode,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa';
import { RiArrowRightLine } from 'react-icons/ri';
import { Auth } from 'aws-amplify';
import logo from './images/personWithCoffee.svg';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { handleNewRoomRequest } from './NewRoom/handleNewRoomRequest';
import getNewRoomNames from './functions/randomNames';
import devEnabled from './utils/devEnabled';

function Home() {
  const [name, setName] = React.useState<string>('');
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    async function starterName() {
      const [name] = await getNewRoomNames(1);
      setName(name);
    }
    starterName();
  }, []);
  const history = useHistory();
  const requestRoom = (type: 'r' | 'i' | 'trophy-dark') => {
    handleNewRoomRequest(type, name)
      .then(() => {
        history.push(`/${type}/${name}`);
      })
      .catch((e) => {
        if (e.message === 'room exists') {
          history.push(`/new-room?name=${name}&roomExists=true`);
        }
      });
  };
  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="auto 1fr 1fr auto"
      bg="white"
      h="full"
    >
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
      <GridItem
        py={5}
        px={[2, 2, 0]}
        colStart={[1, 1, 2]}
        colEnd={[7, 7, 6]}
        bg="white"
      >
        <Box mt={10} mb={16}>
          <Heading as="h2" fontSize="xl" color="black">
            Start using the text dice app now
          </Heading>
          <Flex>
            <InputGroup>
              <Input
                borderColor="gray.400"
                color="gray.600"
                variant="flushed"
                value={name}
                onChange={({ target }) => setName(target.value)}
                mr={4}
                _placeholder={{
                  color: 'gray.400',
                }}
                placeholder="Loading..."
              />
            </InputGroup>
            <LightMode>
              <Button
                rightIcon={<RiArrowRightLine />}
                colorScheme="brand"
                variant="outline"
                onClick={() => requestRoom('r')}
              >
                Go
              </Button>
            </LightMode>
          </Flex>
          <Text color="gray.600" mt={2} fontSize="sm">
            This name identifies your room. Change it to whatever you like!
          </Text>
        </Box>
        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
          justifyContent="center"
          alignItems="center"
        >
          <Box mt={[3, 3, 0]} mr={[0, 0, 3]}>
            <Heading
              as="h1"
              fontFamily="title"
              fontSize={['5xl', '6xl', '7xl']}
              color="black"
              textAlign={['center', 'center', 'left']}
            >
              Roll With Me
            </Heading>
            <Text
              fontSize="lg"
              w={['auto', 'auto', 'lg']}
              color="black"
              textAlign={['center', 'center', 'left']}
            >
              Digital tools for playing great games online
            </Text>
            <Text
              color="gray.900"
              textAlign={['center', 'center', 'left']}
              mt={3}
            >
              Start an app and share the URL with friends to roll dice together
              <br />
              Come back to it later and pick up where you left off
            </Text>
          </Box>
          <Img w={40} src={logo} alt="Person holding cup of coffee" />
        </Flex>
      </GridItem>
      <GridItem pt={14} pb={8} colSpan={6} px={[2, 2, 5]} bg="white">
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          gap={4}
          bg="white"
        >
          <GridItem>
            <Heading as="h2" size="md" color="black">
              Dice Apps
            </Heading>
            <Stack spacing={3} mt={3}>
              <Link
                as={ReactRouterLink}
                color="purple.700"
                w="full"
                to="/new-room?type=Text"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="purple.700"
                borderRadius="md"
                py={2}
                _hover={{
                  backgroundColor: 'purple.50',
                }}
              >
                Text Dice Roller
              </Link>
              <Link
                as={ReactRouterLink}
                color="purple.700"
                w="full"
                to="/new-room?type=Visual"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="purple.700"
                borderRadius="md"
                py={2}
                _hover={{
                  backgroundColor: 'purple.50',
                }}
              >
                Visual Dice Table
              </Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Heading as="h2" size="md" color="black">
              Game Rooms
            </Heading>
            <Stack spacing={3} mt={3}>
              <Link
                as={ReactRouterLink}
                color="green.700"
                w="full"
                to="/new-room?type=trophy-dark"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="green.700"
                borderRadius="md"
                py={2}
                _hover={{
                  backgroundColor: 'green.50',
                }}
              >
                Trophy Dark
              </Link>
              {devEnabled() && (
                <Link
                  as={ReactRouterLink}
                  color="yellow.700"
                  w="full"
                  to="/new-room?type=trophy-gold"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid"
                  borderColor="yellow.700"
                  borderRadius="md"
                  py={2}
                  _hover={{
                    backgroundColor: 'yellow.50',
                  }}
                >
                  Trophy Gold
                </Link>
              )}
              {devEnabled() && (
                <Link
                  as={ReactRouterLink}
                  color="red.700"
                  w="full"
                  to="/new-room?type=Heart"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid"
                  borderColor="red.700"
                  borderRadius="md"
                  py={2}
                  _hover={{
                    backgroundColor: 'red.50',
                  }}
                >
                  Heart
                </Link>
              )}
            </Stack>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem
        colSpan={6}
        border="1px"
        borderColor="gray.100"
        bg="white"
        p={3}
      >
        <Center mb={4}>
          <HStack
            mt={3}
            spacing={3}
            divider={
              <Box color="gray.700" borderLeft="none">
                •
              </Box>
            }
          >
            {user ? (
              <Link
                as={ReactRouterLink}
                to="/profile/settings"
                color="gray.600"
                _hover={{
                  color: 'brand.500',
                }}
              >
                Manage profile
              </Link>
            ) : (
              <Button
                variant="link"
                color="gray.600"
                _hover={{
                  color: 'brand.500',
                }}
                onClick={() => Auth.federatedSignIn()}
                fontWeight="400"
              >
                Sign up or sign in
              </Button>
            )}
            <Link
              as={ReactRouterLink}
              to="/feedback"
              color="gray.600"
              _hover={{
                color: 'brand.500',
              }}
            >
              Provide feedback
            </Link>
            <Link
              as={ReactRouterLink}
              to="/privacy"
              color="gray.600"
              _hover={{
                color: 'brand.500',
              }}
            >
              Privacy policy
            </Link>
            <Link
              as={ReactRouterLink}
              to="/guide"
              color="gray.600"
              _hover={{
                color: 'brand.500',
              }}
            >
              Usage guide
            </Link>
          </HStack>
        </Center>
        <Flex justifyContent="center">
          <Text color="gray.600">Designed and Developed by Jon Grim</Text>
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <Link href="https://github.com/jongrim/roll-with-me" isExternal>
            <IconButton
              icon={<FaGithub />}
              aria-label="Github icon"
              variant="link"
              color="brand.600"
              size="lg"
              mr={2}
            />
          </Link>
          <Link href="https://twitter.com/jonjongrim" isExternal>
            <IconButton
              icon={<FaTwitter />}
              aria-label="Twitter icon"
              variant="link"
              color="brand.600"
              size="lg"
              mr={2}
            />
          </Link>
          <Link href="mailto:jonjongrim@gmail.com" isExternal>
            <IconButton
              icon={<FaEnvelope />}
              aria-label="mail envelope"
              variant="link"
              color="brand.600"
              size="lg"
            />
          </Link>
        </Flex>
        <Text color="gray.600" mt={4} fontSize="sm" textAlign="center">
          Prefer the
          <Link
            isExternal
            color="brand.500"
            href="https://obscure-ridge-20711.herokuapp.com/"
            ml={1}
            mr={1}
          >
            the old version?
          </Link>
          Follow that link!
        </Text>
      </GridItem>
    </Grid>
  );
}

export default Home;
