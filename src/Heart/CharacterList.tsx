import * as React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import { RiLayoutRowLine, RiLayoutColumnLine } from 'react-icons/ri';
import Character from './Character';
import { HeartCharacter } from '../API';

export type viewLayout = 'side' | 'top';

interface CharacterListProps {
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
}

const CharacterList = ({ characters, characterChoice }: CharacterListProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const [layout, setLayout] = React.useState<viewLayout>('top');
  const playerCharacter = characters.find((c) => c?.id === characterChoice);
  const characterItemBorder =
    layout === 'side'
      ? { borderBottom: '1px solid', borderColor: 'inherit', paddingBottom: 4 }
      : { borderRight: '1px solid', borderColor: 'inherit', paddingRight: 4 };
  const isGM = characterChoice === 'GM';

  const charactersWithoutPC = characters.filter(
    (c) => c?.id !== playerCharacter?.id
  );

  return (
    <Box>
      <HStack
        spacing={8}
        border="1px solid"
        borderColor="inherit"
        borderRadius="sm"
        pr={3}
        py={1}
        wrap="wrap"
        position="fixed"
        bottom="0px"
        right="0px"
        bgColor={bgColor}
        zIndex={1}
      >
        {characters.map((c) => (
          <Button
            colorScheme="blue"
            variant="ghost"
            onClick={() => {
              const el = document.getElementById(
                c.characterName ? c.characterName.replace(' ', '') : `${c.id}`
              );
              el?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }}
            key={c.id}
          >
            <Text isTruncated maxW="sm">
              {c.characterName || 'Unnamed wanderer'}
            </Text>
          </Button>
        ))}
        <Tooltip label="Change character sheet layout" placement="left">
          <IconButton
            variant="ghost"
            icon={
              layout === 'side' ? <RiLayoutColumnLine /> : <RiLayoutRowLine />
            }
            aria-label="Change character sheet layout"
            onClick={() => {
              if (layout === 'top') {
                setLayout('side');
              } else {
                setLayout('top');
              }
            }}
          />
        </Tooltip>
      </HStack>
      <Grid
        templateColumns={
          layout === 'top' ? `repeat(${characters.length}, 650px)` : '1fr'
        }
        gap={6}
        pr={3}
        overflow="auto"
      >
        {playerCharacter && (
          <GridItem {...characterItemBorder} mb={8}>
            <Character canEdit character={playerCharacter} />
          </GridItem>
        )}
        {isGM
          ? characters.map((c) => {
              if (!c) return null;
              return (
                <GridItem {...characterItemBorder} key={c.id}>
                  <Character canEdit={false} character={c} />
                </GridItem>
              );
            })
          : charactersWithoutPC.map((c) => {
              if (!c) return null;
              return (
                <GridItem {...characterItemBorder} key={c.id}>
                  <Character canEdit={false} character={c} />
                </GridItem>
              );
            })}
      </Grid>
    </Box>
  );
};

export default CharacterList;
