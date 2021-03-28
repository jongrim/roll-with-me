import * as React from 'react';
import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Spacer,
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import {
  RiLayoutRowLine,
  RiLayoutColumnLine,
  RiExternalLinkFill,
} from 'react-icons/ri';
import SettingsBar from '../SettingsBar';
import { Route, NavLink as ReactRouterLink, Redirect } from 'react-router-dom';
import TrophyDice from './TrophyDice';
import { RawTrophyGoldCharacter, RawTrophyGoldRoomDetails } from '../APITypes';
import CharacterList from './CharacterList';
import SafetyForm from '../SafetyForm/SafetyForm';
import setXCard from '../SafetyForm/xCard';
import XCardModal from '../XCardModal/XCardModal';
import { updateCharacter } from './Character';
import { UpdateTrophyGoldCharacterInput } from '../API';
import useDelayedUpdate from './useDelayedUpdate';
import NewWindow from 'react-new-window';

interface TrophyGoldGameProps {
  username: string;
  setUsername: (val: string) => void;
  characters: RawTrophyGoldCharacter[];
  characterChoice: string;
  gameData: RawTrophyGoldRoomDetails;
}

export type viewLayout = 'side' | 'top';

const TrophyGoldGameArea = ({
  username,
  setUsername,
  characters,
  characterChoice,
  gameData,
}: TrophyGoldGameProps) => {
  const { id, safetyModule, name } = gameData;
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  const characterLinkColor = useColorModeValue('blue.600', 'blue.400');
  const xCardRef = React.useRef<HTMLButtonElement>(null);
  const updateWithId = React.useCallback(
    async (update: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => {
      await updateCharacter({ id: characterChoice, ...update });
    },
    [characterChoice]
  );
  const { delayedUpdate: delayedUsernameUpdate } = useDelayedUpdate(
    updateWithId
  );
  const [layout, setLayout] = React.useState<viewLayout>('side');
  const [popoutDice, setPopoutDice] = React.useState(false);
  React.useEffect(() => {
    return () => setPopoutDice(false);
  }, []);
  return (
    <Grid h="full" templateRows="auto minmax(0, 1fr)" fontFamily="Roboto Slab">
      <GridItem>
        <SettingsBar
          username={username}
          setUsername={(val) => {
            setUsername(val);
            delayedUsernameUpdate({ playerName: val });
          }}
        />
      </GridItem>
      <GridItem pl={4}>
        <Grid
          h="full"
          templateColumns={['1fr', '1fr', '150px minmax(0, 1fr)']}
          templateRows={[
            'auto minmax(0, 1fr)',
            'auto minmax(0, 1fr)',
            'minmax(0, 1fr)',
          ]}
        >
          <GridItem pr={3} pb={3} h="full">
            <Flex direction={['row', 'row', 'column']} h="full">
              <Stack
                direction={['row', 'row', 'column']}
                spacing={4}
                ml={-3}
                alignItems={['center', 'center', 'stretch']}
              >
                <Link
                  rounded="md"
                  px={3}
                  py={2}
                  opacity="0.8"
                  _activeLink={activeLink}
                  as={ReactRouterLink}
                  to={`/trophy-gold/${name}/table`}
                >
                  Table
                </Link>
                <Link
                  rounded="md"
                  px={3}
                  py={2}
                  opacity="0.8"
                  _activeLink={activeLink}
                  as={ReactRouterLink}
                  to={`/trophy-gold/${name}/rules`}
                >
                  How to Play
                </Link>
                <Link
                  rounded="md"
                  px={3}
                  py={2}
                  opacity="0.8"
                  _activeLink={activeLink}
                  as={ReactRouterLink}
                  to={`/trophy-gold/${name}/safety`}
                >
                  Safety
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="brand"
                  ref={xCardRef}
                  onClick={() => setXCard({ value: true, id: safetyModule.id })}
                >
                  x-card
                </Button>
              </Stack>
              <Spacer />
              <Link isExternal href="https://trophyrpg.com/" justifySelf="end">
                Get More Trophy
              </Link>
            </Flex>
          </GridItem>
          <GridItem overflow="auto">
            <Route exact path={[`/trophy-gold/${name}/table`]}>
              <Grid
                h="full"
                templateColumns={
                  layout === 'top' || popoutDice
                    ? '1fr'
                    : ['1fr', '1fr', '1fr', 'minmax(0, 1fr) 400px']
                }
                templateRows={
                  layout === 'side' ? '1fr' : 'auto minmax(0, 1fr) auto'
                }
                columnGap={6}
                rowGap={1}
                alignContent="start"
              >
                <GridItem colSpan={layout === 'top' ? 1 : [1, 1, 1, 2]}>
                  <Flex
                    borderBottom="1px solid"
                    borderColor="inherit"
                    px={2}
                    py={1}
                  >
                    <HStack spacing={8} divider={<StackDivider />}>
                      {characters.map((c) => (
                        <Link
                          color={characterLinkColor}
                          href={`#${c.characterName?.replace(' ', '')}`}
                          key={c.id}
                        >
                          <Text isTruncated maxW="sm">
                            {c.characterName}
                          </Text>
                        </Link>
                      ))}
                    </HStack>
                    <Spacer />
                    <IconButton
                      variant="ghost"
                      icon={
                        layout === 'side' ? (
                          <RiLayoutColumnLine />
                        ) : (
                          <RiLayoutRowLine />
                        )
                      }
                      aria-label={
                        layout === 'side' ? 'top layout' : 'side layout'
                      }
                      onClick={() => {
                        if (layout === 'top') {
                          setLayout('side');
                        } else {
                          setLayout('top');
                        }
                      }}
                    />
                    <Tooltip label="Open dice in new window" placement="left">
                      <IconButton
                        variant="ghost"
                        icon={<RiExternalLinkFill />}
                        aria-label="open dice in new window"
                        onClick={() => setPopoutDice(true)}
                      />
                    </Tooltip>
                  </Flex>
                </GridItem>
                <GridItem overflow={['unset', 'unset', 'unset', 'auto']}>
                  <CharacterList
                    characters={characters}
                    characterChoice={characterChoice}
                    layout={layout}
                  />
                </GridItem>
                {popoutDice ? (
                  <NewWindow onUnload={() => setPopoutDice(false)}>
                    <TrophyDice
                      layout="side"
                      lightDice={gameData.lightDice}
                      darkDice={gameData.darkDice}
                      goldDice={gameData.goldDice}
                      diceMode={gameData.diceMode}
                      characters={characters}
                      characterChoice={characterChoice}
                      id={id}
                    />
                  </NewWindow>
                ) : (
                  <GridItem>
                    <TrophyDice
                      layout={layout}
                      lightDice={gameData.lightDice}
                      darkDice={gameData.darkDice}
                      goldDice={gameData.goldDice}
                      diceMode={gameData.diceMode}
                      characters={characters}
                      characterChoice={characterChoice}
                      id={id}
                    />
                  </GridItem>
                )}
              </Grid>
            </Route>
            <Route exact path={`/trophy-gold/${name}/safety`}>
              <SafetyForm
                id={safetyModule.id}
                setActionInProgress={(val) => {
                  // TODO: show in progress indicator
                }}
              />
            </Route>
            <Redirect path="*" to={`/trophy-gold/${name}/table`} />
          </GridItem>
        </Grid>
      </GridItem>
      {safetyModule.id && (
        <XCardModal safetyModuleId={safetyModule.id} ref={xCardRef} />
      )}
    </Grid>
  );
};

export default TrophyGoldGameArea;
