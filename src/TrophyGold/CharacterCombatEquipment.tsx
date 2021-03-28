import * as React from 'react';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
  Checkbox,
  Flex,
} from '@chakra-ui/react';
import { GiBroadsword, GiShield } from 'react-icons/gi';
import { UpdateTrophyGoldCharacterInput } from '../API';
import { WeaponSet, ArmorSet } from './TrophyGoldGameTypes';
import useDelayedUpdate from './useDelayedUpdate';

interface CharacterCombatEquipmentProps {
  weaponSet: string;
  armorSet: string;
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

function CharacterCombatEquipment({
  weaponSet,
  armorSet,
  onSubmit,
  canEdit,
}: CharacterCombatEquipmentProps) {
  const tableBorderColor = useColorModeValue('gray.400', 'gray.500');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  const [trackedWeaponSet, setTrackedWeaponSet] = React.useState<WeaponSet>(
    JSON.parse(weaponSet)
  );
  const [trackedArmorSet, setTrackedArmorSet] = React.useState<ArmorSet>(
    JSON.parse(armorSet)
  );

  const { delayedUpdate: delayedWeaponsUpdate } = useDelayedUpdate(onSubmit);
  const { delayedUpdate: delayedArmorUpdate } = useDelayedUpdate(onSubmit);

  React.useEffect(() => {
    if (!canEdit) {
      setTrackedWeaponSet(JSON.parse(weaponSet));
    }
  }, [weaponSet, canEdit]);

  React.useEffect(() => {
    if (!canEdit) {
      setTrackedArmorSet(JSON.parse(armorSet));
    }
  }, [armorSet, canEdit]);

  return (
    <Box>
      {Object.entries(trackedWeaponSet).map(([key, entry], i) => {
        return (
          <React.Fragment key={entry.id}>
            <Box
              pr={6}
              py={3}
              borderRight="1px solid"
              borderColor={tableBorderColor}
            >
              <InputGroup variant="flushed" borderColor={inputBorderColor}>
                <InputLeftAddon borderBottomWidth="1px">
                  <Icon as={GiBroadsword} h={6} w={6} />
                </InputLeftAddon>
                <Input
                  isReadOnly={!canEdit}
                  pl={2}
                  value={entry.description}
                  onChange={({ target }) => {
                    const nextVal = target.value;
                    setTrackedWeaponSet((cur) => {
                      const nextWeaponSet = {
                        ...cur,
                        [entry.id]: { ...entry, description: nextVal },
                      };
                      delayedWeaponsUpdate({
                        weaponSet: JSON.stringify(nextWeaponSet),
                      });
                      return nextWeaponSet;
                    });
                  }}
                />
              </InputGroup>
            </Box>
          </React.Fragment>
        );
      })}
      {Object.entries(trackedArmorSet).map(([key, entry]) => {
        return (
          <Flex
            py={3}
            alignItems="center"
            key={entry.id}
            borderRight="1px solid"
            borderColor={tableBorderColor}
          >
            <InputGroup variant="flushed" borderColor={inputBorderColor}>
              <InputLeftAddon borderBottomWidth="1px">
                <Icon as={GiShield} h={6} w={6} />
              </InputLeftAddon>
              <Input
                isReadOnly={!canEdit}
                flex="1"
                pl={2}
                value={entry.description}
                onChange={({ target }) => {
                  const nextVal = target.value;
                  setTrackedArmorSet((cur) => {
                    const nextArmorSet = {
                      ...cur,
                      [entry.id]: { ...entry, description: nextVal },
                    };
                    delayedArmorUpdate({
                      armorSet: JSON.stringify(nextArmorSet),
                    });
                    return nextArmorSet;
                  });
                }}
              />
            </InputGroup>
            <Box flex="0" px={2}>
              <Checkbox
                isReadOnly={!canEdit}
                isChecked={entry.marked}
                onChange={({ target }) => {
                  setTrackedArmorSet((cur) => {
                    const nextArmorSet = {
                      ...cur,
                      [entry.id]: {
                        ...entry,
                        marked: target.checked,
                      },
                    };
                    delayedArmorUpdate({
                      armorSet: JSON.stringify(nextArmorSet),
                    });
                    return nextArmorSet;
                  });
                }}
              >
                Marked
              </Checkbox>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}

export default CharacterCombatEquipment;
