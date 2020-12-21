import * as React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Link,
  Text,
  useColorMode,
  Grid,
  GridItem,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Button,
  Divider,
  StatLabel,
  Stat,
  StatNumber,
  CloseButton,
  Flex,
  StatHelpText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../AuthProvider';
import { API } from 'aws-amplify';
import { ListSavedRollsQuery } from '../API';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import gql from '../gql';
import { Die, Roll, SavedRoll } from '../types';
import { createDieOfNSides, describeRoll } from '../utils/rolls';

interface SavedRollsProps {
  savedRolls: SavedRoll[];
  saveRoll: (roll: SavedRoll) => void;
  rollSavedRoll: (roll: SavedRoll) => void;
}

const SavedRolls: React.FC<SavedRollsProps> = ({
  savedRolls,
  saveRoll,
  rollSavedRoll,
}) => {
  const { user } = React.useContext(AuthContext);
  const { colorMode } = useColorMode();

  const [newRollName, setNewRollName] = React.useState('');
  const [newRollModifier, setNewRollModifier] = React.useState<number>();

  const [dice, setDice] = React.useState<Die[]>([]);

  return (
    <Box>
      {!user && (
        <Text mb={6} mt={2}>
          <Link
            isExternal
            href="/sign-in"
            color={colorMode === 'dark' ? 'brand.200' : 'brand.600'}
          >
            Sign up or log in
          </Link>{' '}
          to save rolls to your account
        </Text>
      )}
      <Text fontSize="sm">Click name to roll</Text>
      {savedRolls.length > 0
        ? savedRolls.map((roll) => {
            return (
              <Flex key={roll.id}>
                <Stat>
                  <Button variant="ghost" onClick={() => rollSavedRoll(roll)}>
                    <StatNumber>{roll.rollName}</StatNumber>
                  </Button>
                  <StatHelpText>{describeRoll(roll)}</StatHelpText>
                </Stat>
                {/* TODO Make these work */}
                {/* <Menu>
                  <MenuButton as={Button} rightIcon={<RiArrowDropDownLine />}>
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu> */}
              </Flex>
            );
          })
        : null}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newRollName || dice.length === 0) {
            // should show an error
            return;
          }
          const newRoll: SavedRoll = {
            id: uuidv4(),
            rollName: newRollName,
            modifier: newRollModifier || 0,
            dice,
          };
          saveRoll(newRoll);
        }}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem colSpan={2}>
            <Heading textAlign="left" as="h5" size="sm">
              Roll Basics
            </Heading>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Roll Name</FormLabel>
              <Input
                value={newRollName}
                onChange={({ target }) => setNewRollName(target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Roll Modifier</FormLabel>
              <NumberInput
                value={newRollModifier || ''}
                onChange={(_, val) => setNewRollModifier(val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
          <NewDie onSubmit={(die: Die) => setDice((cur) => cur.concat(die))} />
          <GridItem colSpan={2}>
            <Divider my={4} />
            <Heading textAlign="left" as="h5" size="sm" mb={3}>
              Added Dice
            </Heading>
          </GridItem>
          {dice.length > 0 ? (
            dice.map((die) => {
              return (
                <GridItem key={die.id}>
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
            <GridItem colSpan={2}>
              <Text>None yet</Text>
            </GridItem>
          )}
          <GridItem colSpan={2}>
            <Button type="submit" colorScheme="brand" w="full">
              Complete
            </Button>
          </GridItem>
        </Grid>
      </form> */}
    </Box>
  );
};

interface NewDieProps {
  onSubmit: (die: Die) => void;
}

const NewDie: React.FC<NewDieProps> = ({ onSubmit }) => {
  const [name, setName] = React.useState<string>('');
  const [sides, setSides] = React.useState<number>();
  return (
    <>
      <GridItem colSpan={2} mt={2}>
        <Heading textAlign="left" as="h5" size="sm">
          Add a die to the roll
        </Heading>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel>Die Name</FormLabel>
          <Input
            size="sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            placeholder="Ex. Light"
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
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
      <GridItem colSpan={2}>
        <Button
          colorScheme="teal"
          variant="outline"
          w="full"
          onClick={() => {
            if (!sides) return;
            onSubmit(
              createDieOfNSides({ name: name || `d${sides}`, n: sides })
            );
            setName('');
            setSides(undefined);
          }}
        >
          Add Die
        </Button>
      </GridItem>
    </>
  );
};

export default SavedRolls;
