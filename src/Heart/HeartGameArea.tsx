import * as React from 'react';
import {
  Box,
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
import HeartDiceForm from './HeartDiceForm';
import { RawHexMapModule } from '../APITypes';
import CharacterList from './CharacterList';
import SafetyForm from '../SafetyForm/SafetyForm';
import setXCard from '../SafetyForm/xCard';
import XCardModal from '../XCardModal/XCardModal';
import HeartDiceDisplay from './HeartDiceDisplay';
import HeartMap from './HeartMap';
import useMap from '../MapModule/useMap';
import { HeartCharacter } from '../API';

interface HeartGameProps {
  name: string;
  username: string;
  setUsername: (val: string) => void;
  characters: HeartCharacter[];
  characterChoice: 'GM' | string;
  id: string;
  safetyModuleId: string;
  hexMap: RawHexMapModule;
  dice: {
    d4Dice: { username: string; result: number }[];
    d6Dice: { username: string; result: number }[];
    d8Dice: { username: string; result: number }[];
    d10Dice: { username: string; result: number }[];
    d12Dice: { username: string; result: number }[];
  };
}

const HeartGameArea = ({
  name,
  username,
  setUsername,
  characters,
  characterChoice,
  id,
  safetyModuleId,
  hexMap,
  dice,
}: HeartGameProps) => {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  const ref = React.useRef<HTMLButtonElement>(null);
  const mapModule = useMap({ map: hexMap });
  return (
    <Grid
      h="full"
      templateRows="auto minmax(0, 1fr)"
      fontFamily="Roboto Slab"
      overflow="auto"
    >
      <GridItem position="sticky" top={0}>
        <SettingsBar username={username} setUsername={setUsername} />
      </GridItem>
      <GridItem>
        <Grid
          h="full"
          templateColumns={['1fr', '1fr', '150px minmax(0, 1fr)']}
          templateRows={[
            'auto minmax(0, 1fr)',
            'auto minmax(0, 1fr)',
            'minmax(0, 1fr)',
          ]}
        >
          <GridItem px={4} pt={1} pb={3} h="full">
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
                  to={`/heart/${name}/characters`}
                >
                  Characters
                </Link>
                <Link
                  rounded="md"
                  px={3}
                  py={2}
                  opacity="0.8"
                  _activeLink={activeLink}
                  as={ReactRouterLink}
                  to={`/heart/${name}/dice`}
                >
                  Dice
                </Link>
                <Link
                  rounded="md"
                  px={3}
                  py={2}
                  opacity="0.8"
                  _activeLink={activeLink}
                  as={ReactRouterLink}
                  to={`/heart/${name}/map`}
                >
                  Map
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
                rounded="md"
                ml={-3}
                px={3}
                py={2}
                opacity="0.8"
                _activeLink={activeLink}
                as={ReactRouterLink}
                to={`/heart/${name}/credits`}
              >
                Credits
              </Link>
              <Link
                isExternal
                href="https://rowanrookanddecard.com/product/heart-the-city-beneath-rpg/"
                justifySelf="end"
                fontWeight="500"
              >
                Get Heart
              </Link>
            </Flex>
          </GridItem>
          <GridItem>
            <Route exact path={`/heart/${name}/characters`}>
              <CharacterList
                characters={characters}
                characterChoice={characterChoice}
              />
            </Route>
            <Route exact path={`/heart/${name}/dice`}>
              <Box pr={3}>
                <HeartDiceForm id={id} username={username} />
                <HeartDiceDisplay {...dice} />
              </Box>
            </Route>
            <Route exact path={`/heart/${name}/safety`}>
              <SafetyForm
                id={safetyModuleId}
                setActionInProgress={(val) => {
                  // TODO: show in progress indicator
                }}
              />
            </Route>
            <Route exact path={`/heart/${name}/map`}>
              <HeartMap hexMap={mapModule} />
            </Route>
            <Redirect path="*" to={`/heart/${name}/characters`} />
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
