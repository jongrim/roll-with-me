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

interface XCardModalProps {
  xCardActive: boolean;
  clearXCard: (value: false) => void;
  xCardChanging: boolean;
}

const XCardModal = React.forwardRef<HTMLElement, XCardModalProps>(
  ({ clearXCard, xCardActive, xCardChanging }, quickRollRef) => {
    return (
      <Modal
        isOpen={xCardActive}
        onClose={() => {
          clearXCard(false);
        }}
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
              isLoading={xCardChanging}
              variant="ghost"
              colorScheme="gray"
              onClick={() => clearXCard(false)}
            >
              Acknowledge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);

export default XCardModal;
