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
  const characterItemBorder =
    layout === 'side'
      ? { borderBottom: '1px solid', borderColor: 'inherit', paddingBottom: 4 }
      : { borderRight: '1px solid', borderColor: 'inherit', paddingRight: 4 };

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
      gap={6}
      id="character-scroll"
    >
      {playerCharacter && (
        <GridItem {...characterItemBorder}>
          <Character canEdit character={playerCharacter} />
        </GridItem>
      )}
      {isGM
        ? characters.map((c) => {
            if (!c) return null;
            return (
              <GridItem key={c.id} {...characterItemBorder}>
                <Character canEdit={false} character={c} />
              </GridItem>
            );
          })
        : charactersWithoutPC.map((c) => {
            if (!c) return null;
            return (
              <GridItem key={c.id} {...characterItemBorder}>
                <Character canEdit={false} character={c} />
              </GridItem>
            );
          })}
    </Grid>
  );
};

export default CharacterList;
