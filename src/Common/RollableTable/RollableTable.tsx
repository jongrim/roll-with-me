import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
  useToast,
  useColorModeValue,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  Heading,
} from '@chakra-ui/react';
import { RiMoreFill } from 'react-icons/ri';
import { GiDiceSixFacesSix } from 'react-icons/gi';
import { RollableTableI } from './RollableTableTypes';
import { motion } from 'framer-motion';
import { useRandomNumberContext } from '../../RandomNumbersProvider';
import Column from './Column';

interface RollableTableProps {
  table: RollableTableI;
  onUpdate?: (nextTable: RollableTableI) => void;
  editable?: boolean;
}

export default function RollableTable({
  table,
  onUpdate,
  editable = false,
}: RollableTableProps) {
  const toast = useToast();

  const [columns, setColumns] = React.useState(table.columns);
  const maxLength = React.useMemo(() => {
    return columns.reduce(
      (acc, cur) => (cur.items.length > acc ? cur.items.length : acc),
      0
    );
  }, [columns]);
  const [trackedTitle, setTrackedTitle] = React.useState(table.title);
  const listBgColor = useColorModeValue('gray.200', 'gray.900');

  const randomNumbers = useRandomNumberContext();
  const [randomItemIndex, setRandomItemIndex] = React.useState<number>();

  return (
    <Flex flexDirection="column">
      <Box
        px={4}
        pt={3}
        pb={2}
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
          {editable && onUpdate ? (
            <Editable
              defaultValue={trackedTitle}
              as="h3"
              fontSize="lg"
              fontWeight="bold"
              onChange={(nextValue) => {
                setTrackedTitle(nextValue);
                onUpdate({ id: table.id, title: nextValue, columns });
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          ) : (
            <Heading
              as="h3"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="inherit"
            >
              {trackedTitle}
            </Heading>
          )}
          {editable && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<RiMoreFill />}
                aria-label="Actions"
                variant="ghost"
              />
              <MenuList>
                <MenuItem>Add a column</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        <Button
          onClick={async () => {
            const [randomNumber] = await randomNumbers.getNumbers(1);
            const index = (randomNumber % maxLength) + 1;
            // toast({
            //   status: 'info',
            //   isClosable: true,
            //   title: `Result for ${trackedTitle}`,
            //   description: trackedItems[index].title,
            //   duration: null,
            // });
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
      </Box>
      <motion.div layout style={{ height: '100%' }}>
        <Flex
          flexDirection="column"
          px={4}
          pt={1}
          pb={3}
          overflow="auto"
          backgroundColor={listBgColor}
          borderBottomRadius="md"
        >
          <Grid
            gap={2}
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            w="full"
          >
            {columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                updateColumn={(newCol) => {
                  const nextColumns = columns.map((c) =>
                    c.id === col.id ? newCol : c
                  );
                  setColumns(nextColumns);
                  if (onUpdate) {
                    onUpdate({
                      id: table.id,
                      title: trackedTitle,
                      columns: nextColumns,
                    });
                  }
                }}
                editable={editable}
                randomItemIndex={randomItemIndex}
                maxCount={maxLength}
              />
            ))}
          </Grid>
        </Flex>
      </motion.div>
    </Flex>
  );
}
