import * as React from 'react';
import {
  Button,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatLabel,
  StatNumber,
  Switch,
  Text,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Die, Roll, SavedRoll } from '../types';
import NewDie from './NewDie';
import { createNewRollFromValues, savedRollToRoll } from '../utils/rolls';
import { compose } from '../utils/fnTools';

interface BuildRollFormProps {
  onSubmit: (roll: Roll) => void;
  saveRoll: (roll: SavedRoll) => void;
  isRolling: boolean;
  rolledByName: string;
}

const BuildRollForm: React.FC<BuildRollFormProps> = ({
  onSubmit,
  saveRoll,
  isRolling,
  rolledByName,
}) => {
  // custom dice
  const [dice, setDice] = React.useState<Die[]>([]);

  const [modifier, setModifier] = React.useState<number>();
  const [name, setName] = React.useState<string>('');

  const [saveNewRoll, setSaveNewRoll] = React.useState(false);

  return (
    <>
      <NewDie onSubmit={(die: Die) => setDice((cur) => cur.concat(die))} />
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {dice.length > 0 ? (
          dice.map((die) => {
            return (
              <GridItem
                key={die.id}
                border="1px solid"
                borderColor="inherit"
                borderRadius={3}
                p={2}
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
          <GridItem colSpan={2} mt={6}>
            <Text>No dice in this roll yet</Text>
          </GridItem>
        )}
      </Grid>
      <form
        onSubmit={(e: React.BaseSyntheticEvent) => {
          e.preventDefault();
          const newRoll: Roll = compose(
            savedRollToRoll(rolledByName),
            createNewRollFromValues
          )({
            id: uuidv4(),
            dice,
            rollName: name,
            rolledBy: '',
            modifier: modifier || 0,
          });
          if (saveNewRoll) {
            saveRoll(newRoll);
          }
          onSubmit(newRoll);
          setName('');
          setModifier(undefined);
          setSaveNewRoll(false);
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
            <FormControl display="flex" alignItems="center">
              <FormLabel>Save roll?</FormLabel>
              <Switch
                isChecked={saveNewRoll}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSaveNewRoll(e.target.checked)
                }
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              isLoading={isRolling}
              loadingText="Rolling"
              w="full"
              type="submit"
              colorScheme="teal"
            >
              Roll
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default BuildRollForm;
