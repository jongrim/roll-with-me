import * as React from 'react';
import {
  Button,
  Box,
  Divider,
  Flex,
  Text,
  Stack,
  Checkbox,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import merge from 'lodash.merge';
import { RiArrowLeftLine } from 'react-icons/ri';
import { CharacterHearthfire, initial } from './hearthfireItems';
import { UpdateTrophyGoldCharacterInput } from '../API';

interface HearthfireProps {
  onClose: () => void;
  characterHearthfire?: string | null;
  updateWithId: (
    update: Omit<UpdateTrophyGoldCharacterInput, 'id'>
  ) => Promise<void>;
}

function Hearthfire({
  characterHearthfire,
  onClose,
  updateWithId,
}: HearthfireProps) {
  const [hearth, setHearth] = React.useState(
    merge(
      {},
      initial,
      JSON.parse(characterHearthfire || '{}') as CharacterHearthfire,
      { dirty: false }
    )
  );

  const {
    firstHoard,
    laterHoard,
    firstEquipment,
    laterEquipment,
    carousing,
    housing,
    healing,
  } = hearth;

  React.useEffect(() => {
    if (hearth.dirty) {
      const { dirty, ...nextHearth } = hearth;
      updateWithId({ hearthfire: JSON.stringify(nextHearth) });
      setHearth(Object.assign(hearth, { dirty: false }));
    }
  }, [hearth, updateWithId]);

  return (
    <Box mt={2}>
      <Button
        variant="link"
        leftIcon={<RiArrowLeftLine />}
        colorScheme="blue"
        onClick={onClose}
      >
        Back to Character Sheet
      </Button>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Hoard
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          Stash Gold in your Hoard to get closer to achieving your Drive and
          retiring. Complete both of the following the first time you do so:
        </Text>
        <Stack mt={1} direction="column" spacing={3}>
          {firstHoard.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  firstHoard: firstHoard.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
        <Text mt={2} fontStyle="italic">
          Each time thereafter, mark one from the list below and do what it
          says. You cannot choose an option that is already marked.
        </Text>
        <Stack mt={1} direction="column" spacing={3}>
          {laterHoard.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  laterHoard: laterHoard.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Carousing
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          Spend 1 Gold in town to get access to useful information before
          beginning an incursion. Useful information includes rumors, maps, and
          a named monster’s Weakness. Each time you do so, mark the first
          unmarked option and do as instructed:
        </Text>
        <Stack mt={1} direction="column" spacing={3}>
          {carousing.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  carousing: carousing.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Library
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          You have acquired a few small spellbooks you can carry with you on
          your journey. Studying them unlocks new Rituals, at a cost of 1 Burden
          per Ritual. Each time you do so, pick one:
        </Text>
        <UnorderedList mt={1}>
          <ListItem>
            Narrate a scene showing the moment you mastered the Ritual.
          </ListItem>
          <ListItem>
            Describe how mastery of the Ritual subtly affects your physical
            appearance.
          </ListItem>
        </UnorderedList>
        <Text fontStyle="italic" size="sm" mt={1}>
          Add rituals from your character sheet
        </Text>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Household
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          Access to a higher quality of life automatically heals you of 1 Ruin
          and all Conditions when you return home. The first time you establish
          a Household, increase your Burdens by 1, then complete both of the
          following:
        </Text>
        <Stack mt={1} direction="column" spacing={3}>
          {housing.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  housing: housing.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Equipment
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          Spend 1 Gold in town to open crossed-out slots in your backpack. The
          first time you do so:
        </Text>
        <Stack mt={1} direction="column">
          {firstEquipment.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  firstEquipment: firstEquipment.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
        <Text mt={1} fontStyle="italic">
          Each time thereafter, mark a box. When all the boxes are marked, the
          gm will present a side quest related to the shopkeeper’s secret.
        </Text>
        <Stack mt={1} direction="row" spacing={4}>
          {laterEquipment.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  laterEquipment: laterEquipment.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Training
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          You have a mentor training you in a new Skill. Each Skill you acquire
          costs 1 Burden. Each time you do so, complete all of the following:
        </Text>
        <UnorderedList mt={1}>
          <ListItem>
            Name your mentor and describe an incident they are famous for.
          </ListItem>
          <ListItem>
            Narrate a short montage showing how you learned the Skill after
            days, weeks, or months of training.
          </ListItem>
          <ListItem>
            Narrate why your mentor or your new Skill increases your Burdens.
            Are you taking care of your mentor in some way? Does your Skill
            require specialized equipment? Something else?
          </ListItem>
        </UnorderedList>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Healing
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          Spend 1 Gold in town to heal yourself of 1 Ruin. Alternatively, you
          can mark an item from the list below and do what it says to heal
          yourself of 1 Ruin. You cannot choose an option that is already
          marked, and you can only heal 1 Ruin in this way before returning to
          an incursion.
        </Text>
        <Stack mt={1} direction="column" spacing={2}>
          {healing.map((item) => (
            <Checkbox
              key={item.label}
              isChecked={item.checked}
              onChange={({ target }) => {
                setHearth({
                  ...hearth,
                  dirty: true,
                  healing: healing.map((i) => {
                    if (i.label === item.label) {
                      return { ...item, checked: target.checked };
                    }
                    return i;
                  }),
                });
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      </Box>
      <Box mb={4}>
        <Flex alignItems="center">
          <Text mt={1} mr={1} fontWeight="600">
            Funeral
          </Text>
          <Divider opacity="1" borderColor="gray.400" pt={2} />
        </Flex>
        <Text mt={1} fontStyle="italic">
          If a treasure-hunter is killed on an incursion, any player with a
          treasure-hunter still alive should describe how their character
          memorializes their fallen comrade. If the fallen treasure-hunter has a
          Household, the players of the survivors can take a memento from it and
          add it to their own Household or found equipment.
        </Text>
      </Box>
    </Box>
  );
}

export default Hearthfire;
