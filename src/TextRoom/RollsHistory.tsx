import * as React from 'react';
import { format, parseISO } from 'date-fns';
import {
  Container,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  HStack,
  VStack,
  Text,
  Tooltip,
  Grid,
  GridItem,
  Spacer,
  Button,
  Flex,
  Collapse,
  useDisclosure,
  Stack,
  useToast,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  RiDeleteBin4Line,
  RiRepeat2Line,
  RiBookmarkLine,
} from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { Roll, SavedRoll } from '../types';
import { savedRollToRoll, createNewRollFromValues } from '../utils/rolls';
import { compose } from '../utils/fnTools';

async function setRolls({ id, rolls }: { id: string; rolls: Roll[] }) {
  await API.graphql({
    query: mutations.updateTextRoom,
    variables: {
      input: {
        id,
        rolls: rolls.map((r) => JSON.stringify(r)),
      },
    },
  });
}

interface RollsHistoryProps {
  roomId: string;
  rolls: Roll[];
  rollAgain: (roll: Roll) => void;
  username: string;
  saveRoll: (roll: SavedRoll) => void;
}

const RollsHistory = ({
  rolls,
  roomId,
  rollAgain,
  username,
  saveRoll,
}: RollsHistoryProps) => {
  const toast = useToast();

  function deleteRoll(id: string) {
    const nextRolls = rolls.filter((r) => r.id !== id);
    setRolls({ id: roomId, rolls: nextRolls })
      .then(() => {
        toast({
          status: 'success',
          title: 'Roll deleted from history',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          status: 'warning',
          title: 'Unable to remove roll',
          duration: 3000,
          isClosable: true,
          description: (
            <Text>
              Please try again. If the problem persists, please{' '}
              <Link
                href="/feedback"
                isExternal
                fontWeight="600"
                textDecoration="underline"
              >
                report an issue
              </Link>
            </Text>
          ),
        });
      });
  }

  return (
    <Container maxW="full" px={0}>
      <Heading as="h3" size="md" textAlign="center" pb={1} mb={2}>
        Roll History
      </Heading>
      <Grid
        templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
        templateRows="minmax(0, 1fr)"
        gap={8}
      >
        {rolls.map((roll) => (
          <RollHistoryEntry
            key={roll.id}
            roll={roll}
            deleteRoll={deleteRoll}
            rollAgain={rollAgain}
            username={username}
            saveRoll={saveRoll}
          />
        ))}
      </Grid>
    </Container>
  );
};

const RollHistoryEntry = ({
  roll,
  deleteRoll,
  rollAgain,
  username,
  saveRoll,
}: {
  roll: Roll;
  deleteRoll: (id: string) => void;
  rollAgain: (roll: Roll) => void;
  username: string;
  saveRoll: (roll: SavedRoll) => void;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');
  const itemBorder = useColorModeValue(
    { boxShadow: 'md', borderColor: 'gray.50' },
    { borderColor: 'inherit' }
  );
  return (
    <GridItem
      key={`${roll.id} - ${roll.createdAt}`}
      rounded="lg"
      p={3}
      border="1px solid"
      {...itemBorder}
    >
      <Flex direction="column" h="full">
        <VStack spacing={2}>
          <Text textAlign="center">{roll.rollName}</Text>
          <HStack spacing={3}>
            <Text fontSize="xl" fontWeight="bold" lineHeight="tall">
              {roll.sum}
            </Text>
            <Text fontSize="sm" color={subtleTextColor}>
              ({roll.dice.map(({ result }) => result).join(' + ')} +{' '}
              {roll.modifier})
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="sm" fontWeight="300" isTruncated>
              {roll.rolledBy}
            </Text>
            <Text fontSize="lg">|</Text>
            <Tooltip
              label="Time info displayed in local time"
              placement="top-start"
            >
              <Text fontSize="sm" fontWeight="300">
                {format(parseISO(roll.createdAt), 'LLL do, h:mm aaa')}
              </Text>
            </Tooltip>
          </HStack>
        </VStack>
        <RollInfo roll={roll} />
        <Spacer />
        <Button onClick={onToggle} variant="ghost" size="sm">
          Roll Actions
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Stack spacing={2} mt={2}>
            <Button
              colorScheme="teal"
              variant="outline"
              size="sm"
              leftIcon={<RiRepeat2Line />}
              onClick={() => {
                const newRoll: Roll = compose(
                  savedRollToRoll(username),
                  createNewRollFromValues
                )({
                  id: uuidv4(),
                  dice: roll.dice,
                  rollName: roll.rollName,
                  rolledBy: '',
                  modifier: roll.modifier,
                });
                rollAgain(newRoll);
              }}
            >
              Roll Again
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              leftIcon={<RiBookmarkLine />}
              onClick={() => {
                saveRoll(roll);
              }}
            >
              Save Roll
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              leftIcon={<RiDeleteBin4Line />}
              onClick={() => {
                deleteRoll(roll.id);
              }}
            >
              Delete from History
            </Button>
          </Stack>
        </Collapse>
      </Flex>
    </GridItem>
  );
};

const RollInfo = ({ roll }: { roll: Roll }) => {
  return (
    <Table variant="unstyled" mt={4}>
      <Thead>
        <Tr>
          <Th>Die</Th>
          <Th>Sides</Th>
          <Th>Result</Th>
        </Tr>
      </Thead>
      <Tbody>
        {roll.dice.map((die, i) => (
          <Tr key={die.id}>
            <Td fontWeight="300">{die.name || i + 1}</Td>
            <Td fontWeight="300">{die.sides}</Td>
            <Td fontWeight="600">{die.result}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RollsHistory;
