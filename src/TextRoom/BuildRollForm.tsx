import * as React from 'react';
import {
  Button,
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
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Roll } from '../types';
import { makeNDice } from '../utils/rolls';

type formValues = {
  d2: number | undefined;
  d4: number | undefined;
  d6: number | undefined;
  d8: number | undefined;
  d10: number | undefined;
  d12: number | undefined;
  d20: number | undefined;
  d100: number | undefined;
};

const createRollWithoutResults = ({
  name,
  modifier,
  formValues,
}: {
  name: string;
  modifier: number | undefined;
  formValues: formValues;
}): Roll => {
  const rollWithoutResults: Roll = {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    modifier: modifier || 0,
    rollName: name,
    dice: [],
    rolledBy: '',
    sum: 0,
  };
  return Object.entries(formValues).reduce((acc, [dieType, count]) => {
    if (count) {
      const sides = Number(dieType.substr(1));
      const newDice = makeNDice({ count, sides });
      acc.dice = acc.dice.concat(newDice);
    }
    return acc;
  }, rollWithoutResults);
};

interface BuildRollFormProps {
  onSubmit: (roll: Roll) => void;
}

const BuildRollForm: React.FC<BuildRollFormProps> = ({ onSubmit }) => {
  const [d2, setD2] = React.useState<number>();
  const [d4, setD4] = React.useState<number>();
  const [d6, setD6] = React.useState<number>();
  const [d8, setD8] = React.useState<number>();
  const [d10, setD10] = React.useState<number>();
  const [d12, setD12] = React.useState<number>();
  const [d20, setD20] = React.useState<number>();
  const [d100, setD100] = React.useState<number>();

  const [modifier, setModifier] = React.useState<number>();
  const [name, setName] = React.useState<string>('');

  return (
    <>
      <form
        onSubmit={(e: React.BaseSyntheticEvent) => {
          e.preventDefault();
          const rollWithoutResults = createRollWithoutResults({
            name,
            modifier,
            formValues: {
              d2,
              d4,
              d6,
              d8,
              d10,
              d12,
              d20,
              d100,
            },
          });
          onSubmit(rollWithoutResults);
        }}
      >
        <Heading as="h3" size="md" mb={2}>
          Base Dice
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem>
            <FormControl>
              <FormLabel>d2</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD2(Number(valueString))}
                value={d2}
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
              <FormLabel>d4</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD4(Number(valueString))}
                value={d4}
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
              <FormLabel>d6</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD6(Number(valueString))}
                value={d6}
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
              <FormLabel>d8</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD8(Number(valueString))}
                value={d8}
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
              <FormLabel>d10</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD10(Number(valueString))}
                value={d10}
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
              <FormLabel>d12</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD12(Number(valueString))}
                value={d12}
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
              <FormLabel>d20</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD20(Number(valueString))}
                value={d20}
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
              <FormLabel>d100</FormLabel>
              <NumberInput
                size="sm"
                min={0}
                onChange={(valueString: string) => setD100(Number(valueString))}
                value={d100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Heading as="h3" size="md" mt={3} mb={2}>
              Custom Dice
            </Heading>
          </GridItem>
          <GridItem colSpan={2}>
            <Heading as="h3" size="md" mt={3} mb={2}>
              Finishing Touches
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
            <Button w="full" type="submit" colorScheme="teal">
              Roll
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default BuildRollForm;
