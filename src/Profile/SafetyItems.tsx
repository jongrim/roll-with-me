import * as React from 'react';
import * as mutations from '../graphql/mutations';
import { ClassifiedItem } from '../types';
import { API } from 'aws-amplify';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Textarea,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import SafetyItem from '../SafetyForm/SafetyItem';
import { createSafetyItem, loadSafetyItems } from '../functions/safetyItems';

async function updateSafetyItem(item: ClassifiedItem) {
  // @ts-ignore
  const { data } = await API.graphql({
    query: mutations.updateSafetyItem,
    variables: {
      input: {
        id: item.id,
        classification: item.classification,
        note: item.note,
      },
    },
    // @ts-ignore
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  });
  return data?.updateSafetyItem;
}
async function deleteSafetyItem(id: string) {
  // @ts-ignore
  const { data } = await API.graphql({
    query: mutations.deleteSafetyItem,
    variables: {
      input: {
        id,
      },
    },
    // @ts-ignore
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  });
  return data?.deleteSafetyItem;
}

const SafetyItems = () => {
  const [newLabel, setNewLabel] = React.useState('');
  const [newClass, setNewClass] = React.useState<
    ClassifiedItem['classification'] | undefined
  >();
  const [newNote, setNewNote] = React.useState('');
  const toast = useToast();
  const [safetyItems, setSafetyItems] = React.useState<ClassifiedItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadSafetyItems()
      .then((items) => {
        setSafetyItems(items);
      })
      .catch((e) => {
        console.warn(e);
        toast({
          status: 'warning',
          description:
            'Unable to load your safety items. Please try again later.',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toast]);

  const removeSafetyItem = (item: ClassifiedItem) => {
    deleteSafetyItem(item.id)
      .then((deletedItem) => {
        setSafetyItems((cur) => cur.filter((i) => i.id !== deletedItem.id));
      })
      .catch((e) => {
        toast({
          status: 'warning',
          description: 'Unable to delete safety item. Please try again later.',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const updateItem = (item: ClassifiedItem) => {
    updateSafetyItem(item)
      .then((updatedItem) => {
        setSafetyItems((cur) =>
          cur.map((i) => {
            if (i.id === updatedItem.id) {
              return updatedItem;
            }
            return i;
          })
        );
      })
      .catch((e) => {
        toast({
          status: 'warning',
          description: 'Unable to delete safety item. Please try again later.',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box h="full">
      <Grid
        templateColumns={[
          '1fr',
          '1fr',
          '1fr',
          'minmax(400px, 2fr) minmax(300px, 1fr)',
        ]}
        gap={4}
      >
        <GridItem>
          <Heading size="md" as="h1">
            Safety Items
          </Heading>
          <Text my={3}>
            Your saved safety items that can be loaded into rooms
          </Text>
          <Stack direction="column" spacing={6}>
            {isLoading && <Spinner />}
            {safetyItems?.map((item) => (
              <SafetyItem
                key={item.id}
                item={item}
                updateSafetyItem={updateItem}
                removeSafetyItem={removeSafetyItem}
              />
            ))}
          </Stack>
        </GridItem>
        <GridItem>
          <Heading as="h2" size="md">
            New Safety Item
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newClass) return;
              createSafetyItem({
                label: newLabel,
                classification: newClass,
                note: newNote,
              })
                .then((createdItem) => {
                  setSafetyItems((cur) => cur.concat(createdItem));
                })
                .catch((e) => {
                  console.warn(e);
                  toast({
                    status: 'warning',
                    description:
                      'Unable to create item. Please try again later.',
                    duration: 5000,
                    isClosable: true,
                  });
                });
            }}
          >
            <FormControl isRequired id="label" mt={6}>
              <FormLabel>Item</FormLabel>
              <Input
                variant="filled"
                value={newLabel}
                onChange={({ target }) => setNewLabel(target.value)}
              />
            </FormControl>
            <FormControl id="rating" isRequired mt={4}>
              <FormLabel>Rating</FormLabel>
              <Select
                placeholder="Select rating"
                onChange={({ target }) => {
                  if (
                    target.value === 'line' ||
                    target.value === 'veil' ||
                    target.value === 'ask' ||
                    target.value === 'consent'
                  ) {
                    setNewClass(target.value);
                  }
                }}
              >
                <option value="line">Line</option>
                <option value="veil">Veil</option>
                <option value="ask">Ask First</option>
                <option value="consent">Enthusiatic Consent</option>
              </Select>
            </FormControl>
            <FormControl id="note" mt={4}>
              <FormLabel>Note</FormLabel>
              <Textarea
                variant="filled"
                value={newNote}
                onChange={({ target }) => setNewNote(target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" w="full" type="submit" mt={3}>
              Add Item
            </Button>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SafetyItems;
