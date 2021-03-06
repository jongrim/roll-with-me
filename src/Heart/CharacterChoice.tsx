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
} from '@chakra-ui/react';
import { AnimationControls, motion } from 'framer-motion';
import { HeartRoomDetails } from '../APITypes';
import { GM, NEW_CHARACTER } from './HeartRoom';

interface CharacterChoiceProps {
  characters?: HeartRoomDetails['characters'];
  controls: AnimationControls;
  username: string;
  setUsername: (val: string) => void;
  onDone: (val: string) => void;
}

const CharacterChoice = ({
  characters,
  controls,
  username,
  setUsername,
  onDone,
}: CharacterChoiceProps) => {
  const toast = useToast();
  const [character, setCharacter] = React.useState('');
  const borderColor = useColorModeValue('gray.100', 'inherit');
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
        mb={10}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!character) {
              toast({
                status: 'info',
                title: 'No character option selected',
                description:
                  'Please choose if you would like to create a new character, play an existing one, or play as the game facilitator',
                isClosable: true,
                duration: 9000,
              });
              return;
            }
            onDone(character);
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
          <FormLabel mt={6}>Select a character</FormLabel>
          <RadioGroup
            onChange={(val: string) => setCharacter(val)}
            value={character}
          >
            <Stack direction="column">
              {characters?.items?.map((savedChar) => (
                <Radio
                  isChecked={character === savedChar?.id}
                  key={savedChar?.id}
                  value={savedChar?.id}
                >
                  {savedChar?.characterName}
                </Radio>
              ))}
              <Radio
                isChecked={character === NEW_CHARACTER}
                value={NEW_CHARACTER}
              >
                Create new character
              </Radio>
              <Radio isChecked={character === GM} value={GM}>
                None - I'm the game facilitator
              </Radio>
            </Stack>
          </RadioGroup>

          <Button variant="ghost" w="full" mt={6} type="submit">
            Enter the Heart
          </Button>
        </form>
      </Box>
    </motion.div>
  );
};

export default CharacterChoice;
