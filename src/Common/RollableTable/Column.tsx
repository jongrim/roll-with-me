import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  IconButton,
  Text,
  Input,
  useColorModeValue,
  VStack,
  Flex,
  LightMode,
  InputGroup,
  InputRightAddon,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { RollableColumn } from './RollableTableTypes';

interface ColumnProps {
  column: RollableColumn;
  editable: boolean;
  updateColumn: (nextCol: RollableColumn) => void;
  randomItemIndex?: number;
  maxCount: number;
}

export default function Column({
  column,
  updateColumn,
  editable,
  randomItemIndex,
  maxCount,
}: ColumnProps) {
  const [nextItem, setNextItem] = React.useState('');
  const [trackedTitle, setTrackedTitle] = React.useState(
    column.title || 'Enter column title'
  );
  const specialText = useColorModeValue('brand.500', 'brand.200');
  const itemBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const actualChosen =
    randomItemIndex !== undefined &&
    Math.max(1, Math.round((column.items.length / maxCount) * randomItemIndex));
  return (
    <Flex flexDirection="column">
      {editable && (
        <Editable
          defaultValue={trackedTitle}
          as="h4"
          onChange={(nextValue) => {
            setTrackedTitle(nextValue);
            updateColumn({
              id: column.id,
              title: nextValue,
              items: column.items,
            });
          }}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      )}
      {editable && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const next = [
              {
                id: uuidv4(),
                title: nextItem,
              },
            ].concat(column.items);
            updateColumn({ id: column.id, title: trackedTitle, items: next });
            setNextItem('');
          }}
        >
          <InputGroup my={3}>
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
      <VStack
        spacing={3}
        as="ol"
        alignItems="flex-end"
        justifyContent="flex-start"
        flex={1}
      >
        {column.items.map((item, i) => (
          <motion.div
            layout
            key={item.id}
            style={{
              width: i + 1 === actualChosen ? '90%' : '100%',
            }}
          >
            <Flex
              w="full"
              borderRadius="md"
              alignItems="stretch"
              backgroundColor={itemBgColor}
            >
              <Box px={3} py={3} w="full">
                <Text color={i + 1 === actualChosen ? specialText : textColor}>
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
                      updateColumn({
                        id: column.id,
                        title: trackedTitle,
                        items: column.items.filter((i) => i.id !== item.id),
                      });
                    }}
                  />
                </LightMode>
              )}
            </Flex>
          </motion.div>
        ))}
      </VStack>
    </Flex>
  );
}
