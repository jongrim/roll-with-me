import * as React from 'react';
import {
  GridItem,
  Flex,
  Box,
  Select,
  Text,
  CloseButton,
  FormControl,
  Input,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import {
  RiPencilLine,
  RiCheckLine,
  RiCloseLine,
  RiAddLine,
} from 'react-icons/ri';
import { ClassifiedItem } from '../types';

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

type updateSafetyItemFn = (item: ClassifiedItem) => void;
type removeSafetyItemFn = (item: ClassifiedItem) => void;
type createSafetyItemFn = (item: ClassifiedItem) => Promise<ClassifiedItem>;

const SafetyItem = ({
  item,
  updateSafetyItem,
  removeSafetyItem,
  createSafetyItem,
}: {
  item: ClassifiedItem;
  updateSafetyItem: updateSafetyItemFn;
  removeSafetyItem: removeSafetyItemFn;
  createSafetyItem?: createSafetyItemFn;
}) => {
  const toast = useToast();
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
          <Note
            note={item.note}
            updateNote={(val: string) =>
              updateSafetyItem({ ...item, note: val })
            }
          />
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
        <HStack position="absolute" top="0" right="0" spacing={3}>
          {createSafetyItem && (
            <Tooltip
              label="Add to your saved safety items"
              aria-label="Add to your saved safety items"
              fontSize="sm"
              placement="top"
              openDelay={700}
            >
              <IconButton
                aria-label="save to my safety items"
                color="gray.800"
                _hover={{
                  backgroundColor: 'rgba(0, 0, 0, 0.06)',
                }}
                variant="ghost"
                icon={<RiAddLine />}
                size="sm"
                onClick={() =>
                  createSafetyItem(item)
                    .then(() => {
                      toast({
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        description: (
                          <Text>
                            Saved to your{' '}
                            <Link
                              href="/profile/safety"
                              isExternal
                              fontWeight="600"
                              textDecoration="underline"
                            >
                              safety list
                            </Link>
                          </Text>
                        ),
                      });
                    })
                    .catch((e) => {
                      console.warn(e);
                      toast({
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                        description:
                          'Unable to save to your safety list. Please try again.',
                      });
                    })
                }
              />
            </Tooltip>
          )}
          <Tooltip
            label="Delete this item"
            aria-label="Delete this item"
            fontSize="sm"
            placement="top"
            openDelay={700}
          >
            <CloseButton
              color="gray.800"
              _hover={{
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
              }}
              onClick={() => removeSafetyItem(item)}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </GridItem>
  );
};

const Note = ({
  note,
  updateNote,
}: {
  note?: string;
  updateNote: (val: string) => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [noteValue, setNoteValue] = React.useState(note);

  const submit = () => {
    updateNote(noteValue || '');
    setIsEditing(false);
  };

  if (!note && !isEditing) {
    return (
      <Box h="48px">
        <Button
          variant="link"
          colorScheme="gray"
          mt={2}
          onClick={() => setIsEditing(true)}
          leftIcon={<RiAddLine />}
          size="lg"
        >
          Add Note
        </Button>
      </Box>
    );
  }

  return isEditing ? (
    <Box mt={2}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <FormControl isRequired>
          <InputGroup>
            <Input
              variant="outline"
              borderColor="gray.700"
              color="gray.800"
              value={noteValue}
              onChange={({ target }) => setNoteValue(target.value)}
              pr={24}
              _hover={{
                borderColor: 'gray.500',
              }}
            />
            <InputRightElement pr={10}>
              <ButtonGroup spacing={2} size="sm">
                <IconButton
                  aria-label="save note"
                  icon={<RiCheckLine />}
                  kind="submit"
                  variant="ghost"
                  color="gray.800"
                  onClick={submit}
                />
                <IconButton
                  aria-label="cancel"
                  variant="ghost"
                  color="gray.800"
                  onClick={() => {
                    setIsEditing(false);
                    setNoteValue(note);
                  }}
                  icon={<RiCloseLine />}
                />
              </ButtonGroup>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  ) : (
    <HStack h="48px" alignItems="center">
      <Text color="gray.800">{note}</Text>
      <IconButton
        variant="link"
        color="gray.800"
        onClick={() => setIsEditing(true)}
        icon={<RiPencilLine />}
        size="sm"
        aria-label="edit note"
      />
    </HStack>
  );
};

export default SafetyItem;
