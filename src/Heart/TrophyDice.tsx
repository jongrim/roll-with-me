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
  Center,
  Icon,
} from '@chakra-ui/react';
import {
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
} from 'react-icons/gi';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { getRandomNumbers } from '../functions/randomNumbers';

interface TrophyDiceProps {
  lightDice: string[];
  darkDice: string[];
  id: string;
}

const handleSubmit = async ({
  lightDiceCount,
  darkDiceCount,
  id,
}: {
  lightDiceCount: number;
  darkDiceCount: number;
  id: string;
}) => {
  const results = await getRandomNumbers(lightDiceCount + darkDiceCount);
  const lightDice = [];
  const darkDice = [];
  const mod6 = (x: number) => x % 6;
  for (let i = 0; i < lightDiceCount; i++) {
    lightDice.push(`${mod6(results.pop() ?? 1) + 1}`);
  }
  for (let i = 0; i < darkDiceCount; i++) {
    darkDice.push(`${mod6(results.pop() ?? 1) + 1}`);
  }
  try {
    API.graphql({
      query: mutations.updateTrophyDarkRoom,
      variables: {
        input: {
          id,
          lightDice,
          darkDice,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  } finally {
    return;
  }
};

const TrophyDice = ({ lightDice, darkDice, id }: TrophyDiceProps) => {
  const [light, setLight] = React.useState(0);
  const [dark, setDark] = React.useState(0);
  const [isRolling, setIsRolling] = React.useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsRolling(true);
        handleSubmit({ lightDiceCount: light, darkDiceCount: dark, id }).then(
          () => {
            setIsRolling(false);
          }
        );
      }}
    >
      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem>
          <FormControl id="light-dice">
            <FormLabel fontFamily="Faith Collapsing" fontSize="4xl">
              Light Dice
            </FormLabel>
            <NumberInput
              variant="flushed"
              fontFamily="Faith Collapsing"
              size="lg"
              onChange={(_, val) => setLight(val)}
              min={0}
              value={light}
            >
              <NumberInputField fontSize="2xl" fontWeight="600" opacity="0.9" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl id="dark-dice">
            <FormLabel fontFamily="Faith Collapsing" fontSize="4xl">
              Dark Dice
            </FormLabel>
            <NumberInput
              variant="flushed"
              fontFamily="Faith Collapsing"
              size="lg"
              onChange={(_, val) => setDark(val)}
              min={0}
              value={dark}
            >
              <NumberInputField fontSize="2xl" fontWeight="600" opacity="0.9" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>
            <Button
              width="md"
              type="submit"
              variant="ghost"
              fontFamily="Faith Collapsing"
              fontSize="3xl"
              opacity="0.9"
              py={6}
              isLoading={isRolling}
            >
              Roll
            </Button>
          </Center>
        </GridItem>
        <GridItem>
          {lightDice.map((result, i) => (
            <LightDie key={`light-die-${i}`} result={result} />
          ))}
        </GridItem>
        <GridItem>
          {darkDice.map((result, i) => (
            <DarkDie key={`dark-die-${i}`} result={result} />
          ))}
        </GridItem>
      </Grid>
    </form>
  );
};

const LightDie = ({ result }: { result: string }) => {
  switch (result) {
    case '1':
      return <Icon h={14} w={14} as={GiInvertedDice1} />;
    case '2':
      return <Icon h={14} w={14} as={GiInvertedDice2} />;
    case '3':
      return <Icon h={14} w={14} as={GiInvertedDice3} />;
    case '4':
      return <Icon h={14} w={14} as={GiInvertedDice4} />;
    case '5':
      return <Icon h={14} w={14} as={GiInvertedDice5} />;
    case '6':
      return <Icon h={14} w={14} as={GiInvertedDice6} />;
    default:
      return null;
  }
};
const DarkDie = ({ result }: { result: string }) => {
  switch (result) {
    case '1':
      return <Icon h={14} w={14} as={GiDiceSixFacesOne} />;
    case '2':
      return <Icon h={14} w={14} as={GiDiceSixFacesTwo} />;
    case '3':
      return <Icon h={14} w={14} as={GiDiceSixFacesThree} />;
    case '4':
      return <Icon h={14} w={14} as={GiDiceSixFacesFour} />;
    case '5':
      return <Icon h={14} w={14} as={GiDiceSixFacesFive} />;
    case '6':
      return <Icon h={14} w={14} as={GiDiceSixFacesSix} />;
    default:
      return null;
  }
};

export default TrophyDice;
