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
  LightMode,
  Input,
  InputGroup,
  Box,
  Center,
  HStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa';
import { RiArrowRightLine } from 'react-icons/ri';
import { API, Auth } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import logo from './images/personWithCoffee.svg';
import { useHistory } from 'react-router-dom';
import {
  CreateTextRoomMutation,
  CreateSafetyModuleMutation,
  CreateInteractiveRoomMutation,
} from './API';
import gql from './gql';
import { AuthContext } from './AuthProvider';

async function getNewRoomName() {
  const { result } = await API.get('randomNameAPI', '/random-room-name', {});
  return result;
}

function Home() {
  const [name, setName] = React.useState<string>('');
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    async function starterName() {
      const name = await getNewRoomName();
      setName(name);
    }
    starterName();
  }, []);
  const history = useHistory();
  const handleNewRoomRequest = async (type: 'r' | 'i' | 'trophy-dark') => {
    try {
      // check if room exists?
      const newSafetyModule = await gql<CreateSafetyModuleMutation>(
        mutations.createSafetyModule,
        {
          xCardActive: false,
          linesAndVeils: [],
        }
      );
      if (type === 'r') {
        await gql<CreateTextRoomMutation>(mutations.createTextRoom, {
          name,
          rolls: [],
          textRoomSafetyModuleId: newSafetyModule.data?.createSafetyModule?.id,
        });
      }
      if (type === 'i') {
        await gql<CreateInteractiveRoomMutation>(
          mutations.createInteractiveRoom,
          {
            name,
            interactiveRoomSafetyModuleId:
              newSafetyModule.data?.createSafetyModule?.id,
          }
        );
      }
      history.push(`/${type}/${name}`);
    } catch (e) {
      console.warn('could not create room', e);
    }
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
            Make a new text room now
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
                onClick={() => handleNewRoomRequest('r')}
              >
                Go
              </Button>
            </LightMode>
          </Flex>
        </Box>
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
              color="black"
              textAlign={['center', 'center', 'left']}
            >
              Roll With Me
            </Heading>
            <Text
              fontSize="lg"
              w={['auto', 'sm', 'lg']}
              color="black"
              textAlign={['center', 'center', 'left']}
            >
              Digital tools for playing great games online
            </Text>
            <Text color="gray.900" fontSize="sm">
              Make a room and share the URL with friends to roll dice together
              <br />
              Come back to it later and pick up where you left off
            </Text>
          </Stack>
          <Img w="40" src={logo} alt="Person holding cup of coffee" />
        </Flex>
      </GridItem>
      <GridItem pt={14} pb={8} colSpan={6} px={[2, 2, 5]} bg="white">
        <Grid
          templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          gap={4}
          bg="white"
        >
          <GridItem>
            <Heading as="h3" fontSize="xl" color="black">
              Dice Rooms
            </Heading>
          </GridItem>
          <GridItem>
            <Heading as="h3" fontSize="xl" color="black">
              Game Rooms
            </Heading>
          </GridItem>
          <GridItem>
            <Stack spacing={3}>
              <LightMode>
                <Button
                  variant="outline"
                  colorScheme="purple"
                  w="full"
                  onClick={() => handleNewRoomRequest('r')}
                >
                  Text Room
                </Button>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                  onClick={() => handleNewRoomRequest('i')}
                >
                  Visual Dice Room
                </Button>
              </LightMode>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack spacing={3}>
              <LightMode>
                <Button
                  disabled
                  variant="outline"
                  colorScheme="green"
                  w="full"
                  onClick={() => handleNewRoomRequest('trophy-dark')}
                >
                  Trophy Dark - Coming Soon
                </Button>
              </LightMode>
            </Stack>
          </GridItem>
        </Grid>
      </GridItem>
      {/* <GridItem h="xl" colSpan={6} bg="teal.50">
        First call out
      </GridItem>
      <GridItem h="xl" colSpan={6} bg="black.200">
        Trophy Dark
      </GridItem> */}
      <GridItem
        colSpan={6}
        border="1px"
        borderColor="gray.100"
        bg="white"
        p={3}
      >
        <Center mb={6}>
          <HStack spacing={3} divider={<Box color="gray.700">•</Box>}>
            {user ? (
              <Link
                as={ReactRouterLink}
                to="/profile/settings"
                color="brand.500"
              >
                Manage profile
              </Link>
            ) : (
              <Button
                variant="link"
                color="brand.500"
                onClick={() => Auth.federatedSignIn()}
                fontWeight="400"
              >
                Sign up or sign in
              </Button>
            )}
            <Link as={ReactRouterLink} to="/feedback" color="brand.500">
              Provide feedback
            </Link>
            <Link as={ReactRouterLink} to="/privacy" color="brand.500">
              Privacy policy
            </Link>
          </HStack>
        </Center>
        <Flex justifyContent="center">
          <Text color="gray.600">Designed and Developed by Jon Grim</Text>
        </Flex>
        <Flex justifyContent="center" mt={2}>
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
      </GridItem>
    </Grid>
  );
}

export default Home;
