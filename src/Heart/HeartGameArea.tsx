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
import TrophyDice from './TrophyDice';
import { HeartCharacter } from '../APITypes';
import CharacterList from './CharacterList';
import SafetyForm from '../SafetyForm/SafetyForm';
import setXCard from '../SafetyForm/xCard';
import XCardModal from '../XCardModal/XCardModal';

interface HeartGameProps {
  name: string;
  username: string;
  setUsername: (val: string) => void;
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
  id: string;
  safetyModuleId: string;
}

const HeartGameArea = ({
  name,
  username,
  setUsername,
  characters,
  characterChoice,
  id,
  safetyModuleId,
}: HeartGameProps) => {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <Grid h="full" templateRows="auto minmax(0, 1fr)" fontFamily="Alegreya">
      <GridItem>
        <SettingsBar username={username} setUsername={setUsername} />
      </GridItem>
      <GridItem p={4}>
        <Grid
          h="full"
          templateColumns={['1fr', '1fr', '150px minmax(0, 1fr)']}
          templateRows="minmax(0, 1fr)"
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
                  to={`/heart/${name}/table`}
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
                  to={`/heart/${name}/safety`}
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
              <Link
                isExternal
                href="https://rowanrookanddecard.com/product/heart-the-city-beneath-rpg/"
                justifySelf="end"
              >
                Get Heart
              </Link>
            </Flex>
          </GridItem>
          <GridItem overflow="auto">
            <Route exact path={`/heart/${name}/table`}>
              <Grid
                h="full"
                templateColumns={['1fr', '1fr', '1fr', 'minmax(0, 1fr) 400px']}
                templateRows="minmax(0, 1fr)"
                gap={6}
                alignContent="start"
              >
                <Route exact path={`/heart/${name}/table`}>
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
                <GridItem rowStart={[1, 1, 1, 1]} pr={[8, 8, 8, 0]}>
                  HEART DICE
                </GridItem>
              </Grid>
            </Route>
            <Route exact path={`/heart/${name}/safety`}>
              <SafetyForm
                id={safetyModuleId}
                setActionInProgress={(val) => {
                  // TODO: show in progress indicator
                }}
              />
            </Route>
            <Redirect path="*" to={`/heart/${name}/table`} />
          </GridItem>
        </Grid>
      </GridItem>
      {safetyModuleId && (
        <XCardModal safetyModuleId={safetyModuleId} ref={ref} />
      )}
    </Grid>
  );
};

export default HeartGameArea;
