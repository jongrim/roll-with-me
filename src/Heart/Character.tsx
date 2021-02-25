import * as React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Divider,
  HStack,
  Center,
  Button,
  Image,
  Icon,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Checkbox,
  FormLabel,
  Textarea,
  Spacer,
  IconButton,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { RiCameraFill, RiPencilLine, RiDeleteBin4Line } from 'react-icons/ri';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import { HeartCharacter } from '../APITypes';
import CharacterForm from './CharacterForm';
import { UpdateHeartCharacterInput } from '../API';
import {
  Ability,
  Beat,
  Bond,
  domains,
  Equipment,
  Fallout,
  resistances,
  Resource,
  skills,
} from './HeartGameTypes';
import debounce from 'lodash.debounce';
import AbilityForm from './AbilityForm';
import EquipmentForm from './EquipmentForm';
import ResourceForm from './ResourceForm';
import BeatsForm from './BeatsForm';
import FalloutForm from './FalloutForm';
import BondForm from './BondForm';
import heart from './heart.svg';

const updateCharacter = async (character: UpdateHeartCharacterInput) => {
  try {
    await API.graphql({
      query: mutations.updateHeartCharacter,
      variables: {
        input: {
          ...character,
        },
      },
    });
  } catch (e) {
    console.warn(e);
  }
};

const debouncedUpdate = (
  cb: (key: string, val: any, wait?: number) => Promise<void>,
  wait = 1000
) =>
  debounce((key: string, val: any) => {
    cb(key, val);
  }, wait);
interface CharacterProps {
  character: Exclude<HeartCharacter, null>;
  canEdit: boolean;
}

const Character = ({ character, canEdit }: CharacterProps) => {
  const redTextColor = useColorModeValue('red.800', 'red.400');
  const [saving, setSaving] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [beatsFormOpen, setBeatsFormOpen] = React.useState(false);
  const [falloutFormOpen, setFalloutFormOpen] = React.useState(false);
  const [abilityFormOpen, setAbilityFormOpen] = React.useState(false);
  const [equipmentFormOpen, setEquipmentFormOpen] = React.useState(false);
  const [resourceFormOpen, setResourceFormOpen] = React.useState(false);
  const [bondFormOpen, setBondFormOpen] = React.useState(false);
  const beats: Beat[] = character.beats.map((b) => JSON.parse(b));
  const fallout: Fallout[] = character.fallout.map((f) => JSON.parse(f));
  const abilities: Ability[] = character.abilities.map((a) => JSON.parse(a));
  const equipment: Equipment[] = character.equipment.map((e) => JSON.parse(e));
  const resources: Resource[] = character.resources.map((r) => JSON.parse(r));
  const bonds: Bond[] = character.bonds.map((b) => JSON.parse(b));

  const handleDelayedChange = (wait?: number) =>
    debouncedUpdate(async (key, val) => {
      console.log('update');
      setSaving(true);
      await updateCharacter({
        id: character.id,
        [key]: val,
      });
      setSaving(false);
    }, wait);

  const delayedNumberUpdate = handleDelayedChange(1000);
  const delayedTextUpdate = handleDelayedChange(2000);

  return (
    <Box fontFamily="Alegreya">
      {isEditing ? (
        <CharacterForm
          character={character}
          submitText="Resume Your Journey"
          onDone={(char) =>
            updateCharacter({
              ...char,
              id: character.id,
              gameID: character.gameID,
              playerName: character.playerName,
            }).then(() => {
              setIsEditing(false);
            })
          }
        />
      ) : (
        <>
          <Grid
            templateColumns="minmax(150px, 33%) 1fr"
            gap={6}
            alignItems="end"
          >
            <GridItem>
              {character.characterImageUrl ? (
                <Image
                  src={character.characterImageUrl}
                  alt={`Portrait of ${character.characterName}`}
                  rounded="sm"
                  boxShadow="lg"
                  maxH="md"
                />
              ) : (
                <Box
                  border="3px dashed"
                  borderColor="inherit"
                  w="full"
                  h="200px"
                  rounded="sm"
                >
                  <Center h="full">
                    <Icon
                      as={RiCameraFill}
                      aria-label="Click to set a character image"
                      h={16}
                      w={16}
                    />
                  </Center>
                </Box>
              )}
            </GridItem>
            <GridItem>
              <Flex direction="column" alignItems="flex-end">
                <Text fontSize="xl" fontWeight="600" letterSpacing="1.3px">
                  {character.characterName}
                </Text>
                <Text opacity="0.9">{character.characterPronouns}</Text>
                <Text fontSize="lg" mt={4}>
                  {character.ancestry} {character.class}
                </Text>
                <Text>{character.calling}</Text>
                {canEdit && (
                  <Button
                    mt={4}
                    leftIcon={<RiPencilLine />}
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    size="sm"
                  >
                    Edit
                  </Button>
                )}
              </Flex>
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Box>
            <Text fontSize="lg" fontWeight="600" color={redTextColor}>
              Beats
            </Text>
            <Stack direction="column" spacing={6}>
              {beats.map((beat) => {
                return (
                  <Box key={beat.description}>
                    <Text>{beat.description}</Text>
                    <Text opacity="0.8">{beat.type}</Text>
                  </Box>
                );
              })}
            </Stack>
            <Center mt={6}>
              <Button
                variant="ghost"
                width="md"
                onClick={() => setBeatsFormOpen(true)}
              >
                Edit Beats
              </Button>
            </Center>
            <BeatsForm
              isOpen={beatsFormOpen}
              onDone={async (beats?: Beat[]) => {
                setBeatsFormOpen(false);
                if (beats) {
                  const stringified = beats.map((b) => JSON.stringify(b));
                  setSaving(true);
                  await updateCharacter({
                    id: character.id,
                    beats: stringified,
                  });
                  setSaving(false);
                }
              }}
              beats={beats}
            />
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="600" color={redTextColor}>
              Fallout
            </Text>
            <Stack direction="column" spacing={6}>
              {fallout.map((cur) => {
                return (
                  <Box key={cur.id}>
                    <Flex>
                      <Box>
                        <Text fontSize="lg" fontWeight="500">
                          {cur.title}
                        </Text>
                        <Text opacity="0.8">
                          {cur.type} – {cur.resistance}
                        </Text>
                      </Box>
                      <Spacer />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="delete this fallout"
                        icon={<RiDeleteBin4Line />}
                        onClick={async () => {
                          const filteredFallout = fallout
                            .filter((f) => f.id !== cur.id)
                            .map((f) => JSON.stringify(f));
                          setSaving(true);
                          await updateCharacter({
                            id: character.id,
                            fallout: filteredFallout,
                          });
                          setSaving(false);
                        }}
                      />
                    </Flex>
                    <Text fontSize="lg" mt={2}>
                      {cur.description}
                    </Text>
                  </Box>
                );
              })}
            </Stack>
            <Center mt={6}>
              <Button
                variant="ghost"
                width="md"
                onClick={() => setFalloutFormOpen(true)}
              >
                Add Fallout
              </Button>
            </Center>
            <FalloutForm
              isOpen={falloutFormOpen}
              onDone={async (fallout?: Fallout) => {
                setFalloutFormOpen(false);
                if (fallout) {
                  const stringified = JSON.stringify(fallout);
                  setSaving(true);
                  await updateCharacter({
                    id: character.id,
                    fallout: character.fallout.concat(stringified),
                  });
                  setSaving(false);
                }
              }}
            />
          </Box>
          <Divider my={6} />
          <Grid templateColumns="1fr" templateRows="1fr" gap={3}>
            {resistances.map((resistance) => {
              const stressKey = resistance.toLowerCase() + 'Stress';
              const protectionKey = resistance.toLowerCase() + 'Protection';
              return (
                <GridItem key={resistance}>
                  <Flex
                    py={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      w={20}
                      fontSize="lg"
                      fontWeight="600"
                      color={redTextColor}
                    >
                      {resistance}
                    </Text>
                    <Flex alignItems="center">
                      <Text w={24}>Stress</Text>
                      <NumberInput
                        w={24}
                        size="sm"
                        variant="flushed"
                        //@ts-ignore
                        defaultValue={character[stressKey]}
                        min={0}
                        onChange={(_, val) =>
                          delayedNumberUpdate(stressKey, val)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                    <Flex alignItems="center">
                      <Text w={24}>Protection</Text>
                      <NumberInput
                        w={24}
                        size="sm"
                        variant="flushed"
                        // @ts-ignore
                        defaultValue={character[protectionKey]}
                        min={0}
                        onChange={(_, val) =>
                          delayedNumberUpdate(protectionKey, val)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Flex>
                  </Flex>
                </GridItem>
              );
            })}
          </Grid>
          <Divider my={6} />
          <Grid templateColumns="1fr 1fr">
            <Stack direction="column" spacing={3}>
              <HStack spacing={3}>
                <Text w={32} fontSize="lg" color={redTextColor}>
                  SKILLS
                </Text>
                <Text w={16} fontSize="lg" color={redTextColor} opacity="0.8">
                  KNACK
                </Text>
              </HStack>
              {skills.map((skill) => {
                return (
                  <HStack key={skill} spacing={3}>
                    <Checkbox
                      w={32}
                      value={skill}
                      defaultChecked={character.skills.includes(skill)}
                      onChange={async ({ target }) => {
                        const newSkills = target.checked
                          ? character.skills.concat(skill)
                          : character.skills.filter((s) => s !== skill);
                        setSaving(true);
                        await updateCharacter({
                          id: character.id,
                          skills: newSkills,
                        });
                        setSaving(false);
                      }}
                    >
                      {skill}
                    </Checkbox>
                    <Checkbox
                      isDisabled={!character.skills.includes(skill)}
                      value={skill}
                      defaultChecked={character.knacks.includes(skill)}
                      onChange={async ({ target }) => {
                        const newKnacks = target.checked
                          ? character.knacks.concat(skill)
                          : character.knacks.filter((k) => k !== skill);
                        setSaving(true);
                        await updateCharacter({
                          id: character.id,
                          knacks: newKnacks,
                        });
                        setSaving(false);
                      }}
                    />
                  </HStack>
                );
              })}
            </Stack>
            <Stack direction="column" spacing={3}>
              <HStack spacing={3}>
                <Text w={32} fontSize="lg" color={redTextColor}>
                  DOMAINS
                </Text>
                <Text w={16} fontSize="lg" color={redTextColor} opacity="0.8">
                  KNACK
                </Text>
              </HStack>
              {domains.map((domain) => {
                return (
                  <HStack key={domain} spacing={3}>
                    <Checkbox
                      w={32}
                      value={domain}
                      defaultChecked={character.domains.includes(domain)}
                      onChange={async ({ target }) => {
                        const newDomains = target.checked
                          ? character.domains.concat(domain)
                          : character.domains.filter((d) => d !== domain);
                        setSaving(true);
                        await updateCharacter({
                          id: character.id,
                          domains: newDomains,
                        });
                        setSaving(false);
                      }}
                    >
                      {domain}
                    </Checkbox>
                    <Checkbox
                      isDisabled={!character.domains.includes(domain)}
                      value={domain}
                      defaultChecked={character.knacks.includes(domain)}
                      onChange={async ({ target }) => {
                        const newKnacks = target.checked
                          ? character.knacks.concat(domain)
                          : character.knacks.filter((k) => k !== domain);
                        setSaving(true);
                        await updateCharacter({
                          id: character.id,
                          knacks: newKnacks,
                        });
                        setSaving(false);
                      }}
                    />
                  </HStack>
                );
              })}
            </Stack>
          </Grid>
          <Divider my={6} />
          <Stack direction="column" spacing={10}>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Abilities
              </Text>
              <Stack direction="column" spacing={6}>
                {abilities.map((cur) => {
                  return (
                    <Box key={cur.id}>
                      <Flex>
                        <HStack spacing={3}>
                          <Text fontSize="lg" fontWeight="600">
                            {cur.name}
                          </Text>
                          <Text opacity="0.8">{cur.type}</Text>
                        </HStack>
                        <Spacer />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="delete this ability"
                          icon={<RiDeleteBin4Line />}
                          onClick={async () => {
                            const filtered = abilities
                              .filter((a) => a.id !== cur.id)
                              .map((a) => JSON.stringify(a));
                            setSaving(true);
                            await updateCharacter({
                              id: character.id,
                              abilities: filtered,
                            });
                            setSaving(false);
                          }}
                        />
                      </Flex>
                      <Text>{cur.description}</Text>
                    </Box>
                  );
                })}
              </Stack>
              <Center mt={6}>
                <Button
                  variant="ghost"
                  w="md"
                  onClick={() => {
                    setAbilityFormOpen(true);
                  }}
                >
                  Add new ability
                </Button>
              </Center>
              <AbilityForm
                isOpen={abilityFormOpen}
                onDone={async (ability?: Ability) => {
                  setAbilityFormOpen(false);
                  if (ability) {
                    const stringified = JSON.stringify(ability);
                    setSaving(true);
                    await updateCharacter({
                      id: character.id,
                      abilities: character.abilities.concat(stringified),
                    });
                    setSaving(false);
                  }
                }}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Equipment
              </Text>
              <Stack direction="column" spacing={6}>
                {equipment.map((cur) => {
                  return (
                    <Box key={cur.id}>
                      <Flex>
                        <Box w="md">
                          <Text fontSize="lg">{cur.name}</Text>
                          <Text opacity="0.8">
                            {[
                              cur.type,
                              `${cur.quality} quality`,
                              cur.rank,
                            ].join(' – ')}
                          </Text>
                          <HStack spacing={3} mt={2}>
                            {cur.tags?.map((tag) => (
                              <Tag
                                size="md"
                                key={tag}
                                borderRadius="full"
                                variant="outline"
                                colorScheme="red"
                              >
                                <TagLabel>{tag}</TagLabel>
                              </Tag>
                            ))}
                          </HStack>
                        </Box>
                        <Spacer />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="delete this equipment"
                          icon={<RiDeleteBin4Line />}
                          onClick={async () => {
                            const filtered = equipment
                              .filter((a) => a.id !== cur.id)
                              .map((a) => JSON.stringify(a));
                            setSaving(true);
                            await updateCharacter({
                              id: character.id,
                              equipment: filtered,
                            });
                            setSaving(false);
                          }}
                        />
                      </Flex>
                    </Box>
                  );
                })}
              </Stack>
              <Center mt={6}>
                <Button
                  variant="ghost"
                  w="md"
                  onClick={() => setEquipmentFormOpen(true)}
                >
                  Add new equipment
                </Button>
              </Center>
              <EquipmentForm
                isOpen={equipmentFormOpen}
                onDone={async (equipment?: Equipment) => {
                  setEquipmentFormOpen(false);
                  if (equipment) {
                    const stringified = JSON.stringify(equipment);
                    setSaving(true);
                    await updateCharacter({
                      id: character.id,
                      equipment: character.equipment.concat(stringified),
                    });
                    setSaving(false);
                  }
                }}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Resources
              </Text>
              <Stack direction="column" spacing={6}>
                {resources.map((cur) => {
                  return (
                    <Box key={cur.id}>
                      <Flex>
                        <Box w="md">
                          <Text fontSize="lg">{cur.name}</Text>
                          <Text opacity="0.9">
                            {[cur.value, cur.domain].join(' – ')}
                          </Text>
                          <HStack spacing={3} mt={2}>
                            {cur.tags?.map((tag) => (
                              <Tag
                                size="md"
                                key={tag}
                                borderRadius="full"
                                variant="outline"
                                colorScheme="red"
                              >
                                <TagLabel>{tag}</TagLabel>
                              </Tag>
                            ))}
                          </HStack>
                        </Box>
                        <Spacer />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="delete this resource"
                          icon={<RiDeleteBin4Line />}
                          onClick={async () => {
                            const filtered = resources
                              .filter((r) => r.id !== cur.id)
                              .map((r) => JSON.stringify(r));
                            setSaving(true);
                            await updateCharacter({
                              id: character.id,
                              resources: filtered,
                            });
                            setSaving(false);
                          }}
                        />
                      </Flex>
                    </Box>
                  );
                })}
              </Stack>
              <Center mt={6}>
                <Button
                  variant="ghost"
                  w="md"
                  onClick={() => setResourceFormOpen(true)}
                >
                  Add new resource
                </Button>
              </Center>
              <ResourceForm
                isOpen={resourceFormOpen}
                onDone={async (resource?: Resource) => {
                  setResourceFormOpen(false);
                  if (resource) {
                    const stringified = JSON.stringify(resource);
                    setSaving(true);
                    await updateCharacter({
                      id: character.id,
                      resources: character.resources.concat(stringified),
                    });
                    setSaving(false);
                  }
                }}
              />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="600" color={redTextColor}>
                Bonds
              </Text>
              <Stack direction="column" spacing={6}>
                {bonds.map((cur) => (
                  <Box key={cur.id}>
                    <Flex>
                      <HStack spacing={3}>
                        <Text fontSize="lg" fontWeight="600">
                          {cur.name}
                        </Text>
                      </HStack>
                      <Spacer />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="delete this bond"
                        icon={<RiDeleteBin4Line />}
                        onClick={async () => {
                          const filtered = bonds
                            .filter((b) => b.id !== cur.id)
                            .map((b) => JSON.stringify(b));
                          setSaving(true);
                          await updateCharacter({
                            id: character.id,
                            bonds: filtered,
                          });
                          setSaving(false);
                        }}
                      />
                    </Flex>
                    <Textarea
                      defaultValue={cur.notes}
                      onChange={({ target }) => {
                        const updatedBond: Bond = {
                          ...cur,
                          notes: target.value,
                        };
                        const updatedBonds = bonds.map((b) => {
                          if (b.id === cur.id) {
                            return JSON.stringify(updatedBond);
                          }
                          return JSON.stringify(b);
                        });
                        delayedTextUpdate('bonds', updatedBonds);
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              <Center mt={6}>
                <Button
                  variant="ghost"
                  w="md"
                  onClick={() => setBondFormOpen(true)}
                >
                  Add new bond
                </Button>
              </Center>
              <BondForm
                isOpen={bondFormOpen}
                onDone={async (bond?: Bond) => {
                  setBondFormOpen(false);
                  if (bond) {
                    const stringified = JSON.stringify(bond);
                    setSaving(true);
                    await updateCharacter({
                      id: character.id,
                      bonds: character.bonds.concat(stringified),
                    });
                    setSaving(false);
                  }
                }}
              />
            </Box>
          </Stack>
          {canEdit && (
            <>
              <Divider my={6} />
              <FormLabel>Notes</FormLabel>
              <Textarea
                defaultValue={character.notes}
                onChange={({ target }) =>
                  delayedTextUpdate('notes', target.value)
                }
              />
            </>
          )}
          {saving && (
            <Box pos="absolute" bottom="5%" right="5%">
              <Image src={heart} w={24} alt="heart with black tendrils" />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Character;