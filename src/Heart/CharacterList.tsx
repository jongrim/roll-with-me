import * as React from 'react';
import {
  Grid,
  GridItem,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { HeartCharacter } from '../APITypes';
import Character from './Character';
import useCharacterSubscription from './useCharacterSubscription';

interface CharacterListProps {
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
}

const CharacterList = ({ characters, characterChoice }: CharacterListProps) => {
  const playerCharacter = characters.find((c) => c?.id === characterChoice);
  const isGM = characterChoice === 'GM';

  const charactersWithoutPC = characters.filter(
    (c) => c?.id !== playerCharacter?.id
  );

  return (
    <Accordion allowToggle h="full">
      <Grid h="full" px={2}>
        {playerCharacter && (
          <GridItem mb={8}>
            <Heading size="md" as="h2" fontFamily="Alegreya">
              Your Character
            </Heading>
            <MyCharacter character={playerCharacter} />
          </GridItem>
        )}
        <GridItem mb={6}>
          <Heading size="md" as="h2" fontFamily="Alegreya">
            Characters
          </Heading>
        </GridItem>
        {isGM
          ? characters.map((c) => {
              if (!c) return null;
              return <CharacterListItem key={c.id} character={c} />;
            })
          : charactersWithoutPC.map((c) => {
              if (!c) return null;
              return <CharacterListItem key={c.id} character={c} />;
            })}
      </Grid>
    </Accordion>
  );
};

interface CharacterListItemProps {
  character: Exclude<HeartCharacter, null>;
}

const CharacterListItem = ({ character }: CharacterListItemProps) => {
  const trackedCharacter = useCharacterSubscription(character);
  return (
    <GridItem>
      <AccordionItem>
        <AccordionButton>
          <Flex flex="1" fontFamily="Alegreya">
            <Text>
              {trackedCharacter.characterName} –{' '}
              {trackedCharacter.characterPronouns}
            </Text>
            <Spacer />
            <Text mr={6}>{trackedCharacter.playerName}</Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel px={2}>
          <Character canEdit={false} character={trackedCharacter} />
        </AccordionPanel>
      </AccordionItem>
    </GridItem>
  );
};
interface MyCharacterProps {
  character: Exclude<HeartCharacter, null>;
}

const MyCharacter = ({ character }: MyCharacterProps) => {
  const trackedCharacter = useCharacterSubscription(character);
  return <Character canEdit character={trackedCharacter} />;
};

export default CharacterList;
