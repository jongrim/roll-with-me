import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { getRandomNumbers } from '../functions/randomNumbers';

interface HeartDiceFormProps {
  id: string;
  username: string;
}

const mod4 = (x: number) => x % 4;
const mod6 = (x: number) => x % 6;
const mod8 = (x: number) => x % 8;
const mod10 = (x: number) => x % 10;
const mod12 = (x: number) => x % 12;
const mod20 = (x: number) => x % 20;

const handleSubmit = async ({
  d4,
  d6,
  d8,
  d10,
  d12,
  d20,
  id,
  username,
}: {
  d4: number;
  d6: number;
  d8: number;
  d10: number;
  d12: number;
  d20: number;
  id: string;
  username: string;
}) => {
  const results = await getRandomNumbers(d4 + d6 + d8 + d10 + d12);
  const d4Dice = [];
  const d6Dice = [];
  const d8Dice = [];
  const d10Dice = [];
  const d12Dice = [];
  const d20Dice = [];
  for (let i = 0; i < d4; i++) {
    d4Dice.push(
      JSON.stringify({ username, result: `${mod4(results.pop() ?? 1) + 1}` })
    );
  }
  for (let i = 0; i < d6; i++) {
    d6Dice.push(
      JSON.stringify({ username, result: `${mod6(results.pop() ?? 1) + 1}` })
    );
  }
  for (let i = 0; i < d8; i++) {
    d8Dice.push(
      JSON.stringify({ username, result: `${mod8(results.pop() ?? 1) + 1}` })
    );
  }
  for (let i = 0; i < d10; i++) {
    d10Dice.push(
      JSON.stringify({ username, result: `${mod10(results.pop() ?? 1) + 1}` })
    );
  }
  for (let i = 0; i < d12; i++) {
    d12Dice.push(
      JSON.stringify({ username, result: `${mod12(results.pop() ?? 1) + 1}` })
    );
  }
  for (let i = 0; i < d20; i++) {
    d20Dice.push(
      JSON.stringify({ username, result: `${mod20(results.pop() ?? 1) + 1}` })
    );
  }
  try {
    API.graphql({
      query: mutations.updateHeartRoom,
      variables: {
        input: {
          id,
          d4Dice,
          d6Dice,
          d8Dice,
          d10Dice,
          d12Dice,
          d20Dice,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  } finally {
    return;
  }
};

const HeartDiceForm = ({ id, username }: HeartDiceFormProps) => {
  const [d4, setD4] = React.useState(0);
  const [d6, setD6] = React.useState(0);
  const [d8, setD8] = React.useState(0);
  const [d10, setD10] = React.useState(0);
  const [d12, setD12] = React.useState(0);
  const [d20, setD20] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsRolling(true);
        await handleSubmit({ d4, d6, d8, d10, d12, d20, id, username });
        setIsRolling(false);
      }}
    >
      <Grid
        templateColumns="1fr 1fr 1fr"
        templateRows="auto auto"
        columnGap={20}
        rowGap={4}
      >
        {[
          { val: d4, set: setD4, label: 'D4' },
          { val: d6, set: setD6, label: 'D6' },
          { val: d8, set: setD8, label: 'D8' },
          { val: d10, set: setD10, label: 'D10' },
          { val: d12, set: setD12, label: 'D12' },
          { val: d20, set: setD20, label: 'D20' },
        ].map(({ val, set, label }) => (
          <GridItem key={label}>
            <FormControl id={`die-${label}`}>
              <FormLabel fontSize="xl">{label}</FormLabel>
              <NumberInput
                min={0}
                val={val}
                onChange={(_, value) => set(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
        ))}
      </Grid>
      <Button
        w="full"
        mt={4}
        type="submit"
        isLoading={isRolling}
        colorScheme="red"
      >
        Roll
      </Button>
    </form>
  );
};

export default HeartDiceForm;
