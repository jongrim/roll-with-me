import * as React from 'react';
import { Flex, Tag, Spacer } from '@chakra-ui/react';
import { RawTrophyGoldCharacter } from '../APITypes';
import { TrophyGoldDiceMode } from '../API';

interface WeakPointsProps {
  characters?: RawTrophyGoldCharacter[];
  diceMode: TrophyGoldDiceMode;
  darkDice: string[];
}

export default function WeakPoints({ characters, darkDice }: WeakPointsProps) {
  return (
    <Flex wrap="wrap" w="full" overflow="auto">
      {characters?.map((char) => {
        if (char.weakPoint) {
          return (
            <React.Fragment key={`${char.id}-${char.weakPoint}`}>
              <Tag
                variant={
                  darkDice.includes(char.weakPoint.toString())
                    ? 'solid'
                    : 'outline'
                }
                mb={2}
              >
                {char.characterName} – {char.weakPoint}
              </Tag>
              <Spacer />
            </React.Fragment>
          );
        }
        return null;
      })}
    </Flex>
  );
}
