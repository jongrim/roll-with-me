import * as React from 'react';
import {
  Box,
  Input,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { UpdateTrophyGoldCharacterInput } from '../API';
import { Backpack } from './TrophyGoldGameTypes';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterBackpackProps {
  backpack: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterBackpack({
  backpack,
  onSubmit,
  canEdit,
}: CharacterBackpackProps) {
  const tableBorderColor = useColorModeValue('gray.400', 'gray.500');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  const [trackedBackpack, setTrackedBackpack] = React.useState<Backpack>(
    JSON.parse(backpack)
  );

  const { delayedUpdate } = useDelayedUpdate(onSubmit);
  React.useEffect(() => {
    if (!canEdit) {
      setTrackedBackpack(JSON.parse(backpack));
    }
  }, [backpack, canEdit]);

  return (
    <Box>
      <Grid templateColumns="1fr 100px">
        <CharacterSectionHeading
          mb={0}
          borderBottom="1px solid"
          borderColor={tableBorderColor}
        >
          Backpack Item
        </CharacterSectionHeading>
        <CharacterSectionHeading
          mb={0}
          borderBottom="1px solid"
          borderColor={tableBorderColor}
          pl={3}
        >
          Uses
        </CharacterSectionHeading>
        {Object.entries(trackedBackpack).map(([key, entry], i) => {
          return (
            <React.Fragment key={entry.id}>
              <Box
                pr={6}
                py={3}
                borderRight="1px solid"
                borderBottom={i === 2 ? '1px solid' : ''}
                borderColor={tableBorderColor}
              >
                <Input
                  isReadOnly={!canEdit}
                  value={entry.description}
                  onChange={({ target }) => {
                    const nextVal = target.value;
                    setTrackedBackpack((cur) => {
                      const nextBackpack = {
                        ...cur,
                        [entry.id]: { ...entry, description: nextVal },
                      };
                      delayedUpdate({ backpack: JSON.stringify(nextBackpack) });
                      return nextBackpack;
                    });
                  }}
                  variant="flushed"
                  borderColor={inputBorderColor}
                />
              </Box>
              <Box
                pl={3}
                py={3}
                borderBottom={i === 2 ? '1px solid' : ''}
                borderColor={tableBorderColor}
              >
                <NumberInput
                  size="sm"
                  min={0}
                  isReadOnly={!canEdit}
                  value={entry.uses}
                  onChange={(_, val) => {
                    if (val === entry.uses) return;
                    const nextVal = val;
                    setTrackedBackpack((cur) => {
                      const nextBackpack = {
                        ...cur,
                        [entry.id]: { ...entry, uses: nextVal },
                      };
                      delayedUpdate({ backpack: JSON.stringify(nextBackpack) });
                      return nextBackpack;
                    });
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CharacterBackpack;
