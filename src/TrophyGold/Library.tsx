import * as React from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { LibraryItem } from './TrophyGoldGameTypes';

interface LibraryProps {
  items: LibraryItem[];
  setItems: React.Dispatch<React.SetStateAction<LibraryItem[]>>;
}

function Library({ items, setItems }: LibraryProps) {
  function makeNewItem() {
    return { id: uuidv4(), ritual: '' };
  }

  return (
    <Box mt={6}>
      <FormLabel>Library Rituals</FormLabel>
      {items.map(({ id, ritual }) => (
        <FormControl key={id} id={id}>
          <Input
            value={ritual}
            onChange={({ target }) =>
              setItems((cur) =>
                cur.map((i) => {
                  if (i.id === id) {
                    return { id, ritual: target.value };
                  }
                  return i;
                })
              )
            }
          />
        </FormControl>
      ))}
      <Button
        onClick={() => setItems((cur) => cur.concat(makeNewItem()))}
        mt={3}
      >
        Add Library Ritual
      </Button>
    </Box>
  );
}

export default Library;
