import * as React from 'react';
import {
  Grid,
  GridItem,
  Flex,
  Text,
  Spacer,
  HStack,
  IconButton,
  StackDivider,
  useColorModeValue,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { RiLayoutRowLine, RiLayoutColumnLine } from 'react-icons/ri';
import { HeartCharacter } from '../APITypes';
import Character from './Character';
import useCharacterSubscription from './useCharacterSubscription';

export type viewLayout = 'side' | 'top';

interface CharacterListProps {
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
}

const CharacterList = ({ characters, characterChoice }: CharacterListProps) => {
  const characterLinkColor = useColorModeValue('blue.600', 'blue.400');
  const [layout, setLayout] = React.useState<viewLayout>('side');
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
    <>
      <Flex
        borderBottom="1px solid"
        borderColor="inherit"
        pr={3}
        py={1}
        wrap="wrap"
      >
        <HStack spacing={8} divider={<StackDivider />}>
          {characters.map((c) => (
            <Link
              color={characterLinkColor}
              href={
                c.characterName
                  ? `#${c.characterName.replace(' ', '')}`
                  : `#${c.id}`
              }
              key={c.id}
            >
              <Text isTruncated maxW="sm">
                {c.characterName || 'Unnamed treasure hunter'}
              </Text>
            </Link>
          ))}
        </HStack>
        <Spacer />
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
      </Flex>
      <Grid
        h="full"
        templateColumns={
          layout === 'top' ? `repeat(${characters.length}, 650px)` : '1fr'
        }
        gap={6}
        overflow="auto"
        pr={3}
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
                <GridItem {...characterItemBorder}>
                  <Character canEdit={false} character={c} />
                </GridItem>
              );
            })
          : charactersWithoutPC.map((c) => {
              if (!c) return null;
              return (
                <GridItem {...characterItemBorder}>
                  <Character canEdit={false} character={c} />
                </GridItem>
              );
            })}
      </Grid>
    </>
  );
};

export default CharacterList;
