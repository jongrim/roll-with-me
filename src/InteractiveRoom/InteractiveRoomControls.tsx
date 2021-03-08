import * as React from 'react';
import {
  Box,
  Button,
  Divider,
  Text,
  useToast,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

async function deleteRoom({ id }: { id: string }) {
  await API.graphql({
    query: mutations.deleteInteractiveRoom,
    variables: {
      input: {
        id,
      },
    },
  });
}

interface InteractiveRoomControlsProps {
  roomId: string;
}

function InteractiveRoomControls({ roomId }: InteractiveRoomControlsProps) {
  const dangerText = useColorModeValue('red.600', 'red.400');
  return (
    <Box>
      <Text color={dangerText} fontWeight="600" mt={10} fontSize="xl">
        Danger Zone
      </Text>
      <Divider my={2} />
      <Stack spacing={6} mt={4}>
        <DeleteRoomView roomId={roomId} />
      </Stack>
    </Box>
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

export default InteractiveRoomControls;
