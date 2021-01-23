import * as React from 'react';
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Link,
  Select,
  Text,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ClassifiedItem } from '../types';
import * as mutations from '../graphql/mutations';
import { API } from 'aws-amplify';
import useSafetyModuleLookup from './useSafetyRoomLookup';

interface SafetyFormProps {
  id: string;
  setActionInProgress: (val: boolean) => void;
}

const createItem = ({
  label,
  classification,
  note = '',
}: {
  label: string;
  classification: 'line' | 'veil' | 'ask' | 'consent';
  note?: string;
}): ClassifiedItem => ({
  id: uuidv4(),
  label,
  classification,
  note,
});

const getItemBackground = (item: ClassifiedItem): string => {
  switch (item.classification) {
    case 'line':
      return 'red.100';
    case 'veil':
      return 'yellow.100';
    case 'ask':
      return 'cyan.100';
    case 'consent':
      return 'green.100';
    default:
      return 'white';
  }
};

const SafetyForm: React.FC<SafetyFormProps> = ({ id, setActionInProgress }) => {
  const [newLabel, setNewLabel] = React.useState('');
  const [newClass, setNewClass] = React.useState('');
  const [newNote, setNewNote] = React.useState('');

  const { data } = useSafetyModuleLookup(id);

  async function addSafetyItem(value: ClassifiedItem) {
    setActionInProgress(true);
    try {
      await API.graphql({
        query: mutations.updateSafetyModule,
        variables: {
          input: {
            id: data?.id,
            linesAndVeils: data?.linesAndVeils
              .concat(value)
              .map((i) => JSON.stringify(i)),
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
    return;
  }

  async function updateSafetyItem(value: ClassifiedItem) {
    setActionInProgress(true);
    try {
      const newItems = data?.linesAndVeils.map((i) => {
        if (i.id === value.id) {
          return JSON.stringify(value);
        }
        return JSON.stringify(i);
      });
      await API.graphql({
        query: mutations.updateSafetyModule,
        variables: {
          input: {
            id: data?.id,
            linesAndVeils: newItems,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
    return;
  }

  async function removeSafetyItem(value: ClassifiedItem) {
    setActionInProgress(true);
    try {
      const newItems = data?.linesAndVeils
        .filter((i) => i.id !== value.id)
        .map((i) => {
          if (i.id === value.id) {
            return JSON.stringify(value);
          }
          return JSON.stringify(i);
        });
      await API.graphql({
        query: mutations.updateSafetyModule,
        variables: {
          input: {
            id: data?.id,
            linesAndVeils: newItems,
          },
        },
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setActionInProgress(false);
    }
    return;
  }

  return (
    <>
      <Heading>Safety Tools</Heading>
      <Text mt={3}>
        Roll With Me encourages the use of safety tools. Below, you'll find a
        form to enter lines, veils, items of enthusiam, or items that should be
        asked about first. Notes can be entered for each.
      </Text>
      <Text mt={2}>
        There is also an x-card feature which can be played by clicking the
        x-card button in the top area. This will prompt everyone to stop and
        reflect before continuing.
      </Text>
      <Text mt={2}>
        For more about safety tools, and other options to consider for your
        games, consult the{' '}
        <Link
          color="brand.400"
          isExternal
          href="https://drive.google.com/drive/folders/114jRmhzBpdqkAlhmveis0nmW73qkAZCj"
        >
          {' '}
          TTRPG safety toolkit{' '}
        </Link>{' '}
        by{' '}
        <Link color="brand.400" isExternal href="https://twitter.com/KiennaS">
          {' '}
          Kienna Shaw{' '}
        </Link>{' '}
        and{' '}
        <Link
          color="brand.400"
          isExternal
          href="https://twitter.com/jl_nicegirl"
        >
          {' '}
          Lauren Bryant-Monk{' '}
        </Link>
      </Text>
      <Divider my={6} />
      <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} gap={6} p={[1, 2, 4]}>
        <GridItem colSpan={[1, 1, 2]}>
          <HStack spacing={4}>
            <Badge color="gray.800" p={1} rounded="md" bg="red.100">
              Line
            </Badge>
            <Badge color="gray.800" p={1} rounded="md" bg="yellow.100">
              Veil
            </Badge>
            <Badge color="gray.800" p={1} rounded="md" bg="cyan.100">
              Ask First
            </Badge>
            <Badge color="gray.800" p={1} rounded="md" bg="green.100">
              Enthusiastic Consent
            </Badge>
          </HStack>
        </GridItem>
        {data?.linesAndVeils?.map((item) => {
          return (
            <GridItem
              key={item.id}
              rounded="lg"
              boxShadow="lg"
              p={3}
              bg={getItemBackground(item)}
            >
              <Flex position="relative">
                <Box flex="1">
                  <Text size="lg" fontWeight="600" color="gray.800" pr={10}>
                    {item.label}
                  </Text>
                  <Text color="gray.600">{item.note}</Text>
                  <Select
                    color="gray.800"
                    variant="flushed"
                    borderColor="gray.500"
                    onChange={({ target }) =>
                      updateSafetyItem({
                        ...item,
                        classification: target.value as ClassifiedItem['classification'],
                      })
                    }
                    defaultValue={item.classification}
                  >
                    <option value="line">Line</option>
                    <option value="veil">Veil</option>
                    <option value="ask">Ask First</option>
                    <option value="consent">Enthusiatic Consent</option>
                  </Select>
                </Box>
                <CloseButton
                  color="gray.800"
                  onClick={() => removeSafetyItem(item)}
                  position="absolute"
                  top="0"
                  right="0"
                />
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newItem = createItem({
            label: newLabel,
            classification: newClass as ClassifiedItem['classification'],
            note: newNote,
          });
          addSafetyItem(newItem);
          setNewLabel('');
          setNewNote('');
        }}
      >
        <Flex direction={['column', 'column', 'row']} align="center" mt={8}>
          <FormControl isRequired>
            <FormLabel>Item</FormLabel>
            <Input
              variant="filled"
              value={newLabel}
              onChange={({ target }) => setNewLabel(target.value)}
            />
          </FormControl>
          <FormControl
            ml={[0, 0, 4]}
            mt={[4, 4, 0]}
            w={['full', 'full', 'lg']}
            isRequired
          >
            <FormLabel>Rating</FormLabel>
            <Select
              placeholder="Select rating"
              onChange={({ target }) => setNewClass(target.value)}
            >
              <option value="line">Line</option>
              <option value="veil">Veil</option>
              <option value="ask">Ask First</option>
              <option value="consent">Enthusiatic Consent</option>
            </Select>
          </FormControl>
        </Flex>
        <Flex
          direction={['column', 'column', 'row']}
          align="flex-end"
          mt={[4, 4, 8]}
        >
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Input
              variant="filled"
              value={newNote}
              onChange={({ target }) => setNewNote(target.value)}
            />
          </FormControl>
          <FormControl ml={[0, 0, 4]} my={[4, 4, 0]} w={['full', 'full', 'lg']}>
            <Button colorScheme="teal" w="full" type="submit">
              Add Item
            </Button>
          </FormControl>
        </Flex>
      </form>
    </>
  );
};

export default SafetyForm;
