import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  IconButton,
  Heading,
  Text,
  Input,
  useToast,
  useColorModeValue,
  VStack,
  Flex,
  LightMode,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { RiDeleteBin4Fill, RiMoreFill } from 'react-icons/ri';
import { GiDiceSixFacesSix } from 'react-icons/gi';
import { RollableTableI } from './RollableTableTypes';
import { motion } from 'framer-motion';
import { useRandomNumberContext } from '../../RandomNumbersProvider';

interface RollableTableProps {
  table: RollableTableI;
  onUpdate: (nextTable: RollableTableI) => void;
  editable?: boolean;
}

export default function RollableTable({
  table,
  onUpdate,
  editable,
}: RollableTableProps) {
  const toast = useToast();
  const [nextItem, setNextItem] = React.useState('');
  const [trackedItems, setTrackedItems] = React.useState(table.items);
  const [trackedTitle, setTrackedTitle] = React.useState(table.title);
  const listBgColor = useColorModeValue('gray.200', 'gray.900');
  const specialText = useColorModeValue('brand.500', 'brand.200');
  const itemBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  const randomNumbers = useRandomNumberContext();
  const [randomItemIndex, setRandomItemIndex] = React.useState<number>();

  return (
    <Flex flexDirection="column">
      <Box
        px={4}
        pt={3}
        pb={2}
        w="sm"
        backgroundColor={listBgColor}
        borderTopRadius="md"
        maxH="full"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          zIndex={2}
        >
          <Heading as="h3" fontSize="md">
            {table.title}
          </Heading>
          {editable && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<RiMoreFill />}
                aria-label="Actions"
                variant="ghost"
              />
              <MenuList>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        <Button
          onClick={async () => {
            const [randomNumber] = await randomNumbers.getNumbers(1);
            const index = randomNumber % trackedItems.length;
            toast({
              status: 'info',
              isClosable: true,
              title: `Result for ${trackedTitle}`,
              description: trackedItems[index].title,
              duration: null,
            });
            setRandomItemIndex(index);
          }}
          variant="outline"
          colorScheme="teal"
          leftIcon={<GiDiceSixFacesSix />}
          w="full"
          mt={3}
        >
          Roll on table
        </Button>
        {editable && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const next = [
                {
                  id: uuidv4(),
                  title: nextItem,
                },
              ].concat(trackedItems);
              setTrackedItems(next);
              onUpdate({ id: table.id, title: trackedTitle, items: next });
              setNextItem('');
            }}
          >
            <InputGroup mt={3}>
              <Input
                variant="filled"
                placeholder="Add new item"
                value={nextItem}
                onChange={({ target }) => setNextItem(target.value)}
              />
              <InputRightAddon p={0}>
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  w="full"
                  type="submit"
                  isDisabled={!Boolean(nextItem)}
                >
                  Add
                </Button>
              </InputRightAddon>
            </InputGroup>
          </form>
        )}
      </Box>
      <motion.div layout>
        <Box
          px={4}
          pt={1}
          pb={3}
          w="sm"
          backgroundColor={listBgColor}
          borderBottomRadius="md"
          maxH="full"
        >
          <VStack spacing={3} as="ol" alignItems="flex-end">
            {trackedItems.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                style={{
                  width: i === randomItemIndex ? '90%' : '100%',
                }}
              >
                <Flex
                  w="full"
                  borderRadius="md"
                  alignItems="stretch"
                  backgroundColor={itemBgColor}
                >
                  <Box px={3} py={3} w="full">
                    <Text
                      color={i === randomItemIndex ? specialText : textColor}
                    >
                      {item.title}
                    </Text>
                  </Box>
                  {editable && (
                    <LightMode>
                      <IconButton
                        height="unset"
                        borderRadius="md"
                        borderTopLeftRadius={0}
                        borderBottomLeftRadius={0}
                        colorScheme="red"
                        icon={<RiDeleteBin4Fill />}
                        aria-label="remove item"
                        onClick={() => {
                          setTrackedItems(
                            trackedItems.filter((i) => i.id !== item.id)
                          );
                        }}
                      />
                    </LightMode>
                  )}
                </Flex>
              </motion.div>
            ))}
          </VStack>
        </Box>
      </motion.div>
    </Flex>
  );
}
