import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Input,
  Grid,
  InputGroup,
  InputRightAddon,
  Flex,
} from '@chakra-ui/react';
import RollableTable from '../RollableTable/RollableTable';
import { RollableTableI } from '../RollableTable/RollableTableTypes';
const fakeTableItems1 = [
  { id: '1', title: "You grandma's famous cookie recipe" },
  { id: '2', title: 'Old photos you care not to rediscover' },
  { id: '3', title: '50 feet of holiday lights, tangled in a knot' },
  {
    id: '4',
    title: 'A family of squirrels, building a nest in an old wardrobe',
  },
];
const fakeTable1 = {
  id: 'table-1',
  title: 'Things in the attic',
  columns: [
    {
      id: 'table-1-col-1',
      items: fakeTableItems1,
    },
  ],
};
const fakeTableItems2 = [
  { id: '2-1', title: 'A hundred year old squid that remembers' },
  { id: '2-2', title: 'Schools of brightly colored fish' },
  {
    id: '2-3',
    title:
      'Dark caves, never explored by a human and home to unknown creatures',
  },
  {
    id: '2-4',
    title: 'A coral tower',
  },
  {
    id: '2-5',
    title:
      'The skeleton of a behemoth, now a fertile biome for algae and muscleds',
  },
  {
    id: '2-6',
    title: 'Old greg',
  },
];
const fakeTable2 = {
  id: 'table-2',
  title: 'Things under the sea',
  columns: [
    {
      id: 'table-2-col-1',
      items: fakeTableItems1,
    },
  ],
};

function makeNewTable(title: string): RollableTableI {
  return {
    id: uuidv4(),
    title,
    columns: [
      {
        id: uuidv4(),
        items: [],
      },
    ],
  };
}

export default function RollableTables() {
  const [newTableTitle, setNewTableTitle] = React.useState('');
  const [tables, setTables] = React.useState([fakeTable2]);
  return (
    <Box h="full" w="full">
      <Flex w="full" justifyContent="center">
        <Box w="md" mb={6}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTables((cur) => cur.concat(makeNewTable(newTableTitle)));
              setNewTableTitle('');
            }}
          >
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Add new table"
                value={newTableTitle}
                onChange={({ target }) => setNewTableTitle(target.value)}
              />
              <InputRightAddon p={0}>
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  w="full"
                  type="submit"
                  isDisabled={!Boolean(newTableTitle)}
                >
                  Create
                </Button>
              </InputRightAddon>
            </InputGroup>
          </form>
        </Box>
      </Flex>
      <Box>
        {tables.map((table) => (
          <RollableTable
            key={table.id}
            table={table}
            onUpdate={(nextTable) => {
              console.log(nextTable);
              setTables((cur) =>
                cur.map((t) => {
                  if (t.id === nextTable.id) {
                    return nextTable;
                  }
                  return t;
                })
              );
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
