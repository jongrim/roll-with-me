import * as React from 'react';
import {
  Box,
  Button,
  Divider,
  Text,
  useToast,
  Link,
  Flex,
  Spacer,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { CustomDie } from '../utils/dice';

async function clearRolls({ id }: { id: string }) {
  await API.graphql({
    query: mutations.updateTextRoom,
    variables: {
      input: {
        id,
        rolls: [],
      },
    },
  });
}

async function deleteRoom({ id }: { id: string }) {
  await API.graphql({
    query: mutations.deleteTextRoom,
    variables: {
      input: {
        id,
      },
    },
  });
}

async function deleteUserRoom({ id }: { id: string }) {
  await API.graphql({
    query: mutations.deleteUserRoom,
    variables: {
      input: {
        id,
      },
    },
  });
}

async function updateDice({
  id,
  customDice,
}: {
  id: string;
  customDice: string[];
}) {
  await API.graphql({
    query: mutations.updateTextRoom,
    variables: {
      input: {
        id,
        customDice,
      },
    },
  });
}

interface TextRoomControlsProps {
  roomId: string;
  savedCustomDice: CustomDie[];
}

function TextRoomControls({ roomId, savedCustomDice }: TextRoomControlsProps) {
  const dangerText = useColorModeValue('red.600', 'red.400');
  const toast = useToast();
  return (
    <Box>
      <Text fontWeight="600" fontSize="xl">
        Custom Dice
      </Text>
      <Divider my={2} />
      <Text fontSize="sm" mt={2}>
        Note: Deleting a die does not remove it from any saved rolls
      </Text>
      <Stack spacing={6} mt={3}>
        {savedCustomDice.map((die) => (
          <Flex key={die.id} alignItems="center">
            <Text>
              {die.name} – {die.sides} sides
            </Text>
            <Spacer />
            <Button
              colorScheme="red"
              variant="ghost"
              onClick={() => {
                const nextDice = savedCustomDice
                  .filter((d) => d.id !== die.id)
                  .map((d) => JSON.stringify(d));
                updateDice({ id: roomId, customDice: nextDice })
                  .then(() => {
                    toast({
                      status: 'success',
                      title: 'Die Deleted',
                      duration: 3000,
                      isClosable: true,
                    });
                  })
                  .catch(() => {
                    toast({
                      status: 'warning',
                      title: 'Unable to delete die',
                      duration: 5000,
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
              }}
            >
              Delete Die
            </Button>
          </Flex>
        ))}
      </Stack>
      <Text color={dangerText} fontWeight="600" mt={10} fontSize="xl">
        Danger Zone
      </Text>
      <Divider my={2} />
      <Stack spacing={6} mt={4}>
        <ClearRollsView roomId={roomId} />
      </Stack>
    </Box>
  );
}

function ClearRollsView({ roomId }: { roomId: string }) {
  const [doubleConfirmVisible, setDoubleConfirmVisible] = React.useState(false);
  const toast = useToast();
  return (
    <>
      <Button onClick={() => setDoubleConfirmVisible(true)}>
        Clear Roll History
      </Button>
      {doubleConfirmVisible && (
        <Box mt={6}>
          <Text mb={3}>
            This will clear the entire history of rolls for this room. Are you
            sure you want to proceed?
          </Text>
          <Button
            colorScheme="red"
            mr={2}
            onClick={() => {
              clearRolls({ id: roomId })
                .then(() => {
                  toast({
                    status: 'success',
                    title: 'Rolls Cleared',
                    duration: 3000,
                    isClosable: true,
                  });
                  setDoubleConfirmVisible(false);
                })
                .catch(() => {
                  toast({
                    status: 'warning',
                    title: 'Unable to clear rolls',
                    duration: 5000,
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
            }}
          >
            Clear Rolls
          </Button>
          <Button
            variant="ghost"
            onClick={() => setDoubleConfirmVisible(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
}

function DeleteRoomView({ roomId }: { roomId: string }) {
  const [doubleConfirmVisible, setDoubleConfirmVisible] = React.useState(false);
  const history = useHistory();
  const toast = useToast();
  return (
    <>
      <Button onClick={() => setDoubleConfirmVisible(true)}>Delete Room</Button>
      {doubleConfirmVisible && (
        <Box mt={6}>
          <Text mb={3}>
            This will delete this room. This cannot be undone. Are you sure?
          </Text>
          <Button
            colorScheme="red"
            mr={2}
            onClick={() => {
              deleteRoom({ id: roomId })
                .then(() => {
                  history.push('/');
                })
                .catch(() => {
                  toast({
                    status: 'warning',
                    title: 'Unable to delete room',
                    duration: 5000,
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
            }}
          >
            DELETE
          </Button>
          <Button
            variant="ghost"
            onClick={() => setDoubleConfirmVisible(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </>
  );
}

export default TextRoomControls;
