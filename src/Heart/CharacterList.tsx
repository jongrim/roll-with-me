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
import Character from './Character';
import { HeartCharacter } from '../API';

export type viewLayout = 'side' | 'top';

interface CharacterListProps {
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
}

const CharacterList = ({ characters, characterChoice }: CharacterListProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const characterLinkColor = useColorModeValue('blue.600', 'blue.400');
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
    <Grid templateRows="auto 1fr" overflow="auto" h="full">
      <Flex
        borderBottom="1px solid"
        borderColor="inherit"
        pr={3}
        py={1}
        wrap="wrap"
        position="sticky"
        top="0px"
        bgColor={bgColor}
        zIndex={1}
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
    </Grid>
  );
};

export default CharacterList;
