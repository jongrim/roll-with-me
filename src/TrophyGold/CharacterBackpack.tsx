import * as React from 'react';
import {
  Box,
  Text,
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
import debounce from 'lodash.debounce';

interface CharacterBackpackProps {
  backpack: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
}

function CharacterBackpack({ backpack, onSubmit }: CharacterBackpackProps) {
  const tableBorderColor = useColorModeValue('gray.600', 'gray.300');
  const inputBorderColor = useColorModeValue('gray.400', 'gray.500');

  const [trackedBackpack, setTrackedBackpack] = React.useState<Backpack>(
    JSON.parse(backpack)
  );

  const delayedUpdate = React.useCallback(
    debounce(async (val) => {
      await onSubmit({
        backpack: val,
      });
    }, 3000),
    [onSubmit]
  );

  return (
    <Box>
      <Text fontSize="sm" opacity="0.9">
        Backpack
      </Text>
      <Grid templateColumns="1fr 100px">
        <Text borderBottom="1px solid" borderColor={tableBorderColor}>
          Item
        </Text>
        <Text borderBottom="1px solid" borderColor={tableBorderColor}>
          Uses
        </Text>
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
                  value={entry.description}
                  onChange={({ target }) => {
                    const nextVal = target.value;
                    setTrackedBackpack((cur) => {
                      const nextBackpack = {
                        ...cur,
                        [entry.id]: { ...entry, description: nextVal },
                      };
                      delayedUpdate(JSON.stringify(nextBackpack));
                      return nextBackpack;
                    });
                  }}
                  variant="unstyled"
                  borderBottom="1px dashed"
                  borderColor={inputBorderColor}
                  borderRadius={0}
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
                  defaultValue={entry.uses}
                  onChange={(_, val) => {
                    const nextVal = val;
                    setTrackedBackpack((cur) => {
                      const nextBackpack = {
                        ...cur,
                        [entry.id]: { ...entry, uses: nextVal },
                      };
                      delayedUpdate(JSON.stringify(nextBackpack));
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
