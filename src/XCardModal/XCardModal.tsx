import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import useSafetyModuleLookup from '../SafetyForm/useSafetyRoomLookup';
import setXCard from '../SafetyForm/xCard';
import NotificationsPrompt from './NotificationsPrompt';

interface XCardModalProps {
  safetyModuleId: string;
}

const XCardModal = React.forwardRef<HTMLElement, XCardModalProps>(
  ({ safetyModuleId }, quickRollRef) => {
    const [closing, setClosing] = React.useState(false);
    const data = useSafetyModuleLookup(safetyModuleId);
    const close = async () => {
      setClosing(true);
      // Should better alert there isn't a safety module loaded
      await setXCard({ value: false, id: safetyModuleId });
      setClosing(false);
    };

    React.useEffect(() => {
      const displayNotification = () => {
        new Notification('X-Card Played', {
          body: 'Pause now to check-in with your group',
          lang: 'en-US',
        });
      };
      if (data?.xCardActive && Notification.permission === 'granted') {
        displayNotification();
      }
    }, [data?.xCardActive]);

    return (
      <>
        <NotificationsPrompt />
        <Modal
          isOpen={data?.xCardActive || false}
          onClose={close}
          size="xl"
          // @ts-ignore
          finalFocusRef={quickRollRef}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>X-Card Played</ModalHeader>
            <ModalBody>
              <Text pb={2}>
                The X-card has been played. Pause now to discuss with your group
                before moving on.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={closing}
                variant="ghost"
                colorScheme="gray"
                onClick={close}
              >
                Acknowledge
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default XCardModal;
