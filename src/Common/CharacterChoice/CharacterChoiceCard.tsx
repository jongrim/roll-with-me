import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  useToast,
  Text,
  Divider,
  useRadioGroup,
  Flex,
} from '@chakra-ui/react';
import { AnimationControls, motion } from 'framer-motion';
import CharacterChoiceRadioCard from './CharacterChoiceRadioCard';

export const NEW_CHARACTER = 'NEW';
export const GM = 'GM';

interface CharacterChoiceProps {
  characters?: { id: string; characterName?: string; playerName?: string }[];
  controls: AnimationControls;
  username: string;
  setUsername: (val: string) => void;
  onDone: (val: string) => void;
}

const CharacterChoiceCard = ({
  characters,
  controls,
  username,
  setUsername,
  onDone,
}: CharacterChoiceProps) => {
  const toast = useToast();
  const [mode, setMode] = React.useState(() => {
    if (characters?.length === 0) {
      return 'new';
    }
    return 'returning';
  });
  const [character, setCharacter] = React.useState('');
  const borderColor = useColorModeValue('gray.100', 'inherit');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'room type',
    defaultValue: mode,
    onChange: (val: string) => {
      setMode(val);
    },
  });

  const group = getRootProps();
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={controls}>
      <Box
        w="md"
        rounded="sm"
        boxShadow="lg"
        p={6}
        fontFamily="Roboto Slab"
        border="1px solid"
        borderColor={borderColor}
        mt={16}
        mb={6}
      >
        <Flex justifyContent="space-between" {...group}>
          <CharacterChoiceRadioCard
            value="returning"
            {...getRadioProps({ value: 'returning' })}
          >
            Returning player
          </CharacterChoiceRadioCard>
          <CharacterChoiceRadioCard
            value="new"
            {...getRadioProps({ value: 'new' })}
          >
            Create new character
          </CharacterChoiceRadioCard>
          <CharacterChoiceRadioCard
            value="gm"
            {...getRadioProps({ value: 'gm' })}
          >
            Game facilitator
          </CharacterChoiceRadioCard>
        </Flex>
        <Divider my={6} />
        {mode === 'returning' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!character) {
                toast({
                  status: 'info',
                  title: 'No character option selected',
                  description: 'Please choose your character',
                  isClosable: true,
                  duration: 9000,
                });
                return;
              }
              onDone(character);
            }}
          >
            <FormLabel mt={6}>Select a character</FormLabel>
            <RadioGroup
              onChange={(val: string) => setCharacter(val)}
              value={character}
            >
              <Stack direction="column" spacing={4}>
                {characters?.map((savedChar) => (
                  <Box key={savedChar?.id}>
                    <Radio
                      isChecked={character === savedChar?.id}
                      value={savedChar?.id}
                    >
                      {savedChar?.characterName || `Unnamed treasure hunter`}
                    </Radio>
                    <Text fontSize="sm" opacity="0.8">
                      Last played by {savedChar?.playerName}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
            <Button variant="ghost" w="full" mt={6} type="submit">
              Resume your Journey
            </Button>
          </form>
        )}
        {mode === 'new' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onDone(NEW_CHARACTER);
            }}
          >
            <FormControl id="username" isRequired>
              <FormLabel>Player name and pronouns</FormLabel>
              <Input
                variant="flushed"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
            <Button variant="ghost" w="full" mt={6} type="submit">
              Begin your Journey
            </Button>
          </form>
        )}
        {mode === 'gm' && (
          <Button variant="ghost" w="full" onClick={() => onDone(GM)}>
            Begin
          </Button>
        )}
      </Box>
    </motion.div>
  );
};

export default CharacterChoiceCard;
