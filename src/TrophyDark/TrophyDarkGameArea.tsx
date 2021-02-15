import * as React from 'react';
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Link,
  Spacer,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import SettingsBar from '../SettingsBar';
import { Route, NavLink as ReactRouterLink, Redirect } from 'react-router-dom';
import RulesSummary from './RulesSummary';
import TrophyDice from './TrophyDice';
import { TrophyDarkCharacter } from '../APITypes';
import CharacterList from './CharacterList';
import SafetyForm from '../SafetyForm/SafetyForm';
import setXCard from '../SafetyForm/xCard';
import XCardModal from '../XCardModal/XCardModal';

interface TrophyDarkGameProps {
  name: string;
  username: string;
  setUsername: (val: string) => void;
  characters: TrophyDarkCharacter[];
  characterChoice: 'GM' | string;
  lightDice: string[];
  darkDice: string[];
  id: string;
  safetyModuleId: string;
}

const TrophyDarkGameArea = ({
  name,
  username,
  setUsername,
  characters,
  characterChoice,
  lightDice,
  darkDice,
  id,
  safetyModuleId,
}: TrophyDarkGameProps) => {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <Grid h="full" templateRows="auto minmax(0, 1fr)" fontFamily="Roboto Slab">
      <GridItem>
        <SettingsBar username={username} setUsername={setUsername} />
      </GridItem>
      <GridItem p={4}>
        <Grid h="full" templateColumns={['1fr', '1fr', '150px minmax(0, 1fr)']}>
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
                  to={`/trophy-dark/${name}/table`}
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
                  to={`/trophy-dark/${name}/rules`}
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
                  to={`/trophy-dark/${name}/safety`}
                >
                  Safety
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="brand"
                  ref={ref}
                  onClick={() => setXCard({ value: true, id: safetyModuleId })}
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
            <Route
              exact
              path={[
                `/trophy-dark/${name}/table`,
                `/trophy-dark/${name}/rules`,
              ]}
            >
              <Grid
                h="full"
                templateColumns={['1fr', '1fr', '1fr', 'minmax(0, 1fr) 400px']}
                gap={6}
                alignContent="start"
              >
                <Route exact path={`/trophy-dark/${name}/table`}>
                  <GridItem
                    overflow={['unset', 'unset', 'unset', 'auto']}
                    rowStart={[2, 2, 2, 1]}
                    pl={[0, 0, 3]}
                    pr={6}
                    pb={8}
                  >
                    <CharacterList
                      characters={characters}
                      characterChoice={characterChoice}
                    />
                  </GridItem>
                </Route>
                <Route exact path={`/trophy-dark/${name}/rules`}>
                  <GridItem
                    overflow={['unset', 'unset', 'unset', 'auto']}
                    rowStart={[2, 2, 2, 1]}
                    pr={6}
                  >
                    <RulesSummary />
                  </GridItem>
                </Route>
                <GridItem rowStart={[1, 1, 1, 1]} pr={[8, 8, 8, 0]}>
                  <TrophyDice
                    lightDice={lightDice}
                    darkDice={darkDice}
                    id={id}
                  />
                </GridItem>
              </Grid>
            </Route>
            <Route exact path={`/trophy-dark/${name}/safety`}>
              <SafetyForm
                id={safetyModuleId}
                setActionInProgress={(val) => {
                  // TODO: show in progress indicator
                }}
              />
            </Route>
            <Redirect path="*" to={`/trophy-dark/${name}/table`} />
          </GridItem>
        </Grid>
      </GridItem>
      {safetyModuleId && (
        <XCardModal safetyModuleId={safetyModuleId} ref={ref} />
      )}
    </Grid>
  );
};

export default TrophyDarkGameArea;
