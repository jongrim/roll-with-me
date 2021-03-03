import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Grid,
  GridItem,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  CloseButton,
  Text,
  Divider,
  Heading,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
  Input,
  ButtonGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { Die, SavedRoll } from '../types';
import NewDie from './NewDie';
import { createNewRollFromValues } from '../utils/rolls';
import { CustomDie } from '../utils/dice';

interface EditRollModalProps {
  savedRoll?: SavedRoll;
  onSubmit: (roll: SavedRoll) => void;
  onCancel: () => void;
  savedCustomDice?: CustomDie[];
  roomId?: string;
}

const EditRollModal = ({
  savedRoll,
  onSubmit,
  onCancel,
  savedCustomDice,
  roomId,
}: EditRollModalProps) => {
  return (
    <Modal isOpen={Boolean(savedRoll)} onClose={onCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {savedRoll?.rollName
            ? `Edit Roll: ${savedRoll.rollName}`
            : `New Roll`}
        </ModalHeader>
        <ModalBody>
          {savedRoll !== undefined && (
            <EditRollForm
              savedRoll={savedRoll}
              onSubmit={onSubmit}
              onCancel={onCancel}
              savedCustomDice={savedCustomDice}
              roomId={roomId}
            />
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface EditRollFormProps {
  savedRoll: SavedRoll;
  onSubmit: (roll: SavedRoll) => void;
  onCancel: () => void;
  savedCustomDice?: CustomDie[];
  roomId?: string;
}

const EditRollForm = ({
  savedRoll,
  onSubmit,
  onCancel,
  savedCustomDice,
  roomId,
}: EditRollFormProps) => {
  const borderColor = useColorModeValue('gray.50', 'inherit');
  const [dice, setDice] = React.useState<Die[]>(savedRoll.dice);
  const [diceError, setDiceError] = React.useState('');
  const [name, setName] = React.useState(savedRoll.rollName);
  const [modifier, setModifier] = React.useState(savedRoll.modifier);
  return (
    <>
      <NewDie
        onSubmit={(die: Die) => setDice((cur) => cur.concat(die))}
        customDice={savedCustomDice}
        roomId={roomId}
      />
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={3}>
        <GridItem colSpan={2}>
          {diceError && <Text color="red.600">{diceError}</Text>}
          <Text fontSize={14} fontWeight="600">
            Current dice
          </Text>
        </GridItem>
        {dice.length > 0 ? (
          dice.map((die) => {
            return (
              <GridItem
                key={die.id}
                boxShadow="md"
                rounded="lg"
                p={2}
                border="1px solid"
                borderColor={borderColor}
              >
                <Flex>
                  <Stat>
                    <StatLabel>{die.sides} sided</StatLabel>
                    <StatNumber>{die.name}</StatNumber>
                  </Stat>
                  <CloseButton
                    size="sm"
                    onClick={() =>
                      setDice((cur) => cur.filter(({ id }) => id !== die.id))
                    }
                  />
                </Flex>
              </GridItem>
            );
          })
        ) : (
          <GridItem colSpan={2} mt={4}>
            <Text>No dice in this roll yet</Text>
          </GridItem>
        )}
      </Grid>
      <form
        onSubmit={(e: React.BaseSyntheticEvent) => {
          e.preventDefault();
          if (dice.length === 0) {
            setDiceError('This roll needs some dice!');
            return;
          }
          onSubmit(
            createNewRollFromValues({
              id: savedRoll.id,
              dice,
              rollName: name,
              modifier,
              offline: savedRoll?.offline,
            })
          );
        }}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            <Divider my={5} />
            <Heading textAlign="left" as="h3" size="md" mt={3} mb={2}>
              2 — Add finishing touches
            </Heading>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Modifier</FormLabel>
              <NumberInput
                size="sm"
                onChange={(valueString: string) =>
                  setModifier(Number(valueString))
                }
                value={modifier}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                size="sm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                value={name}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <ButtonGroup spacing={6}>
              <Button type="submit" colorScheme="teal">
                {savedRoll.rollName ? 'Update' : 'Create'}
              </Button>
              <Button variant="outline" colorScheme="gray" onClick={onCancel}>
                Cancel
              </Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default EditRollModal;
