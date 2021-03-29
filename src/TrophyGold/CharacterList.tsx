import * as React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { RawTrophyGoldCharacter } from '../APITypes';
import Character from './Character';

interface CharacterListProps {
  characters: RawTrophyGoldCharacter[];
  characterChoice: 'GM' | string;
  layout: 'side' | 'top';
}

const CharacterList = ({
  characters,
  characterChoice,
  layout,
}: CharacterListProps) => {
  const playerCharacter = characters.find((c) => c?.id === characterChoice);
  const isGM = characterChoice === 'GM';

  const charactersWithoutPC = characters.filter(
    (c) => c?.id !== playerCharacter?.id
  );

  return (
    <Grid
      pl={1}
      h="full"
      templateColumns={
        layout === 'top' ? `repeat(${characters.length}, 650px)` : '1fr'
      }
      gap={8}
    >
      {playerCharacter && (
        <GridItem mb={8}>
          <Character canEdit character={playerCharacter} />
        </GridItem>
      )}
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
  );
};

interface CharacterListItemProps {
  character: RawTrophyGoldCharacter;
}

const CharacterListItem = ({ character }: CharacterListItemProps) => {
  return (
    <GridItem>
      <Character canEdit={false} character={character} />
    </GridItem>
  );
};

export default CharacterList;
