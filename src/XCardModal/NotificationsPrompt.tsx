import * as React from 'react';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function NotificationsPrompt() {
  const bgColor = useColorModeValue('white', 'gray.600');
  const [isVisible, setIsVisible] = React.useState(() => {
    const hasDeclined = window.localStorage.getItem(
      'desktop-notifications-declined'
    );
    if (hasDeclined !== null) return false;
    return Notification.permission === 'default';
  });
  const prompt = () => Notification.requestPermission();

  if (isVisible) {
    return (
      <Box
        position="fixed"
        top="60px"
        right="15px"
        px={4}
        py={3}
        w="md"
        bgColor={bgColor}
        border="1px solid"
        borderColor="inherit"
        borderRadius="md"
        boxShadow="lg"
        zIndex={20}
      >
        <Text fontWeight="bold">Enable desktop notifications?</Text>
        <Text fontSize="sm">
          Allows displaying a desktop notification when the x-card is played.
          Note, this feature does not function in Firefox.
        </Text>
        <Flex justifyContent="space-between" mt={4}>
          <Button
            onClick={() => {
              prompt();
              setIsVisible(false);
            }}
            w="48%"
            colorScheme="blue"
          >
            Request permission
          </Button>
          <Button
            onClick={() => {
              setIsVisible(false);
              window.localStorage.setItem(
                'desktop-notifications-declined',
                JSON.stringify(true)
              );
            }}
            w="48%"
            variant="ghost"
          >
            Dismiss
          </Button>
        </Flex>
      </Box>
    );
  }
  return null;
}
