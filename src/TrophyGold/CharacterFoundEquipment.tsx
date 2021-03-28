import * as React from 'react';
import { Input, useColorModeValue, Box } from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import { FoundEquipment } from './TrophyGoldGameTypes';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterFoundEquipmentProps {
  foundEquipment: string[];
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterFoundEquipment({
  foundEquipment,
  onSubmit,
  canEdit,
}: CharacterFoundEquipmentProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  const [trackedFoundEquipment, setTrackedFoundEquipment] = React.useState<
    FoundEquipment[]
  >(() => foundEquipment.map((i) => JSON.parse(i)));

  const { delayedUpdate } = useDelayedUpdate(onSubmit);

  React.useEffect(() => {
    if (!canEdit) {
      setTrackedFoundEquipment(foundEquipment.map((i) => JSON.parse(i)));
    }
  }, [foundEquipment, canEdit]);

  return (
    <Box pl={3}>
      {trackedFoundEquipment.map((entry) => {
        return (
          <Input
            isReadOnly={!canEdit}
            my={3}
            key={entry.id}
            value={entry.description}
            onChange={({ target }) => {
              const nextVal = target.value;
              setTrackedFoundEquipment((cur) => {
                const newList = cur.map((item) => {
                  if (item.id === entry.id) {
                    return {
                      ...entry,
                      description: nextVal,
                    };
                  }
                  return item;
                });
                delayedUpdate({
                  foundEquipment: newList.map((i) => JSON.stringify(i)),
                });
                return newList;
              });
            }}
            variant="flushed"
            borderColor={inputBorderColor}
          />
        );
      })}
    </Box>
  );
}

export default CharacterFoundEquipment;
