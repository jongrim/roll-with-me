import * as React from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Equipment } from './TrophyGoldGameTypes';

interface EquipmentProps {
  items: string[];
  itemMap: Record<string, Equipment>;
  updateItem: (id: string, update: Record<string, unknown>) => void;
  addItem: (item: Equipment, key: string) => void;
  removeItem: (id: string) => void;
}

function makeNewItem(): Equipment {
  return {
    id: uuidv4(),
    title: '',
    description: '',
    marked: false,
    value: undefined,
  };
}

function EquipmentForm({
  items,
  itemMap,
  updateItem,
  addItem,
  removeItem,
}: EquipmentProps) {
  return (
    <Box mt={6}>
      {items.map((i) => {
        const { id, title, description, marked, value } = itemMap[i];
        return (
          <Box key={id}>
            <FormControl id={`${id}-title`}>
              <FormLabel>Item</FormLabel>
              <Input
                value={title}
                onChange={({ target }) =>
                  updateItem(id, { title: target.value })
                }
              />
            </FormControl>
            <Button onClick={() => removeItem(id)}>Delete</Button>
          </Box>
        );
      })}
      <Button
        mt={3}
        onClick={() => {
          const newItem = makeNewItem();
          addItem(newItem, newItem.id);
        }}
      >
        Add New Equipment
      </Button>
    </Box>
  );
}

export default EquipmentForm;
