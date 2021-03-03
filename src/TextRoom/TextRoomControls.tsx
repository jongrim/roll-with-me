import * as React from 'react';
import { Box, Button, Divider, Text, useToast, Link } from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

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

interface TextRoomControlsProps {
  roomId: string;
}

function TextRoomControls({ roomId }: TextRoomControlsProps) {
  const [doubleConfirmVisible, setDoubleConfirmVisible] = React.useState(false);
  const toast = useToast();
  return (
    <Box>
      <Text color="red.400" fontWeight="600">
        Danger Zone
      </Text>
      <Divider my={2} />
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
    </Box>
  );
}

export default TextRoomControls;
