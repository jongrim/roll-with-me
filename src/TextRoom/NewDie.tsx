import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  GridItem,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Icon,
  Collapse,
  HStack,
  Switch,
  useToast,
  Text,
  Link,
  Flex,
  Box,
} from '@chakra-ui/react';
import {
  GiD4,
  GiPerspectiveDiceSixFacesSix,
  GiDiceEightFacesEight,
  GiD10,
  GiD12,
  GiDiceTwentyFacesTwenty,
} from 'react-icons/gi';
import { RiAddCircleLine } from 'react-icons/ri';
import { Die } from '../types';
import { createDieOfNSides } from '../utils/rolls';
import { createCustomDie, CustomDie } from '../utils/dice';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

async function saveCustomDiceToRoom({
  id,
  customDice,
}: {
  id: string;
  customDice: CustomDie[];
}) {
  const jsonDice = customDice.map((die) => JSON.stringify(die));
  await API.graphql({
    query: mutations.updateTextRoom,
    variables: {
      input: {
        id,
        customDice: jsonDice,
      },
    },
  });
}

interface NewDieProps {
  onSubmit: (die: Die) => void;
  customDice?: CustomDie[];
  roomId?: string;
}

const NewDie = ({ onSubmit, customDice, roomId }: NewDieProps) => {
  const [customFormVisible, setCustomFormVisible] = React.useState(false);
  const [saveCustomDie, setSaveCustomDie] = React.useState(false);
  const [name, setName] = React.useState<string>('');
  const [sides, setSides] = React.useState<number>();
  const [qty, setQty] = React.useState<number>(1);
  const toast = useToast();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO should show errors
        if (!sides || !qty) return;
        if (saveCustomDie && roomId && customDice) {
          saveCustomDiceToRoom({
            id: roomId,
            customDice: customDice?.concat(createCustomDie({ name, sides })),
          })
            .then(() => {
              toast({
                status: 'success',
                title: 'Custom die save to room',
                duration: 3000,
                isClosable: true,
              });
            })
            .catch(() => {
              toast({
                status: 'warning',
                title: 'Unable to save die',
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
        }
        for (let i = 0; i < qty; i++) {
          onSubmit(createDieOfNSides({ name: name || `d${sides}`, n: sides }));
        }
        setName('');
        setSides(undefined);
        setSaveCustomDie(false);
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Heading textAlign="left" as="h3" size="md">
            1 — Add dice to your roll
          </Heading>
        </GridItem>
        <GridItem colSpan={2}>
          <Grid
            templateColumns="1fr 1fr 1fr"
            gap={4}
            justifyItems="center"
            my={2}
          >
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={<Icon h={12} w={12} color="blue.500" as={GiD4} />}
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 4 }));
              }}
              aria-label="d4"
            />
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={
                <Icon
                  h={12}
                  w={12}
                  color="blue.500"
                  as={GiPerspectiveDiceSixFacesSix}
                />
              }
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 6 }));
              }}
              aria-label="d6"
            />
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={
                <Icon
                  h={12}
                  w={12}
                  color="blue.500"
                  as={GiDiceEightFacesEight}
                />
              }
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 8 }));
              }}
              aria-label="d8"
            />
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={<Icon h={12} w={12} color="blue.500" as={GiD10} />}
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 10 }));
              }}
              aria-label="d10"
            />
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={<Icon h={12} w={12} color="blue.500" as={GiD12} />}
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 12 }));
              }}
              aria-label="d12"
            />
            <IconButton
              type="button"
              variant="ghost"
              h={20}
              w={20}
              icon={
                <Icon
                  h={12}
                  w={12}
                  color="blue.500"
                  as={GiDiceTwentyFacesTwenty}
                />
              }
              onClick={() => {
                onSubmit(createDieOfNSides({ n: 20 }));
              }}
              aria-label="d20"
            />
            {customDice?.map((die) => (
              <Button
                key={die.id}
                h={20}
                type="button"
                variant="ghost"
                display="inline-block"
                onClick={() => {
                  onSubmit(createDieOfNSides({ n: die.sides, name: die.name }));
                }}
              >
                <Box as="span" fontSize="xs" display="block">
                  {die.sides} sided
                </Box>
                <Box as="span" display="block" mt={1}>
                  {die.name}
                </Box>
              </Button>
            ))}
          </Grid>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            variant="ghost"
            onClick={() => setCustomFormVisible((cur) => !cur)}
          >
            {customFormVisible
              ? 'Hide custom dice form'
              : 'Show custom dice form'}
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Collapse in={customFormVisible} animateOpacity>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Die Name</FormLabel>
                  <Input
                    size="sm"
                    variant="flushed"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    value={name}
                  />
                  <FormHelperText textAlign="left">
                    Leave blank to autofill
                  </FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel>Sides</FormLabel>
                  <NumberInput
                    size="sm"
                    min={1}
                    onChange={(_, val) => setSides(val)}
                    value={sides || ''}
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
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    size="sm"
                    min={1}
                    onChange={(_, val) => setQty(val)}
                    value={qty || ''}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </GridItem>
              {customDice && (
                <GridItem colSpan={2} justifySelf="end">
                  <FormControl id="save-custom-die">
                    <Flex alignItems="center" justifyContent="flex-end">
                      <FormLabel>Save as Custom Die?</FormLabel>
                      <Switch
                        isChecked={saveCustomDie}
                        onChange={() => setSaveCustomDie((cur) => !cur)}
                      />
                    </Flex>
                    <FormHelperText mt={-1}>
                      Adds this custom die to the room
                    </FormHelperText>
                  </FormControl>
                </GridItem>
              )}
              <GridItem colStart={2} justifySelf="end">
                <HStack spacing={4}>
                  <Button
                    leftIcon={<RiAddCircleLine />}
                    colorScheme="brand"
                    variant="outline"
                    type="submit"
                  >
                    Add Die
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setCustomFormVisible(false)}
                  >
                    Close
                  </Button>
                </HStack>
              </GridItem>
            </Grid>
          </Collapse>
        </GridItem>
      </Grid>
    </form>
  );
};

export default NewDie;
