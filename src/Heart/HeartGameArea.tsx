import * as React from "react";
import { v4 as uuidv4 } from "uuid";
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
} from "@chakra-ui/react";
import SettingsBar from "../SettingsBar";
import { Route, NavLink as ReactRouterLink, Redirect } from "react-router-dom";
import HeartDiceForm from "./HeartDiceForm";
import { RawHexMapModule } from "../APITypes";
import CharacterList from "./CharacterList";
import SafetyForm from "../SafetyForm/SafetyForm";
import setXCard from "../SafetyForm/xCard";
import XCardModal from "../XCardModal/XCardModal";
import HeartDiceDisplay from "./HeartDiceDisplay";
import HeartMap from "./HeartMap";
import useMap from "../MapModule/useMap";
import { HeartCharacterWithID } from "../APITypes";
import HeartFacilitator from "./HeartFacilitator";
import { HeartRoll } from "./HeartGameTypes";
interface HeartGameProps {
  name: string;
  username: string;
  setUsername: (val: string) => void;
  characters: HeartCharacterWithID[];
  characterChoice: "GM" | string;
  id: string;
  safetyModuleId: string;
  hexMap: RawHexMapModule;
  dice: {
    d4Dice: { username: string; result: number }[];
    d6Dice: { username: string; result: number }[];
    d8Dice: { username: string; result: number }[];
    d10Dice: { username: string; result: number }[];
    d12Dice: { username: string; result: number }[];
    d20Dice: { username: string; result: number }[];
  };
  facilitatorNotes?: string | null;
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
  facilitatorNotes,
}: HeartGameProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const mapModule = useMap({ map: hexMap });
  const [prevRolls, setPrevRolls] = React.useState<HeartRoll[]>([]);
  let rollUsername =
    dice.d4Dice.length > 0
      ? dice.d4Dice[0].username
      : dice.d6Dice.length > 0
      ? dice.d6Dice[0].username
      : dice.d8Dice.length > 0
      ? dice.d8Dice[0].username
      : dice.d10Dice.length > 0
      ? dice.d10Dice[0].username
      : dice.d12Dice.length > 0
      ? dice.d12Dice[0].username
      : dice.d20Dice.length > 0
      ? dice.d20Dice[0].username
      : "a ghost";
  React.useEffect(() => {
    setPrevRolls((cur) => [
      {
        id: uuidv4(),
        username: rollUsername,
        dice: {
          D4: dice.d4Dice.map((d) => d.result),
          D6: dice.d6Dice.map((d) => d.result),
          D8: dice.d8Dice.map((d) => d.result),
          D10: dice.d10Dice.map((d) => d.result),
          D12: dice.d12Dice.map((d) => d.result),
          D20: dice.d20Dice.map((d) => d.result),
        },
      },
      ...cur,
    ]);
  }, [
    rollUsername,
    dice.d4Dice,
    dice.d6Dice,
    dice.d8Dice,
    dice.d10Dice,
    dice.d12Dice,
    dice.d20Dice,
  ]);
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
          templateColumns={["1fr", "1fr", "150px minmax(0, 1fr)"]}
          templateRows={[
            "auto minmax(0, 1fr)",
            "auto minmax(0, 1fr)",
            "minmax(0, 1fr)",
          ]}
        >
          <GridItem px={4} pt={1} pb={3} h="full">
            <HeartNav
              name={name}
              xCardButton={
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="brand"
                  ref={ref}
                  onClick={() => setXCard({ value: true, id: safetyModuleId })}
                >
                  x-card
                </Button>
              }
            />
          </GridItem>
          <GridItem overflow="auto">
            <Route exact path={`/heart/${name}/characters`}>
              <CharacterList
                characters={characters}
                characterChoice={characterChoice}
              />
            </Route>
            <Route exact path={`/heart/${name}/dice`}>
              <Box px={3}>
                <HeartDiceForm id={id} username={username} />
                <HeartDiceDisplay
                  d4Dice={dice.d4Dice}
                  d6Dice={dice.d6Dice}
                  d8Dice={dice.d8Dice}
                  d10Dice={dice.d10Dice}
                  d12Dice={dice.d12Dice}
                  d20Dice={dice.d20Dice}
                  prevRolls={prevRolls}
                />
              </Box>
            </Route>
            <Route exact path={`/heart/${name}/safety`}>
              <Box pr={3}>
                <SafetyForm
                  id={safetyModuleId}
                  setActionInProgress={(val) => {
                    // TODO: show in progress indicator
                  }}
                />
              </Box>
            </Route>
            <Route exact path={`/heart/${name}/map`}>
              <HeartMap hexMap={mapModule} />
            </Route>
            <Route exact path={`/heart/${name}/facilitator`}>
              <HeartFacilitator
                facilitatorNotes={facilitatorNotes}
                gameID={id}
              />
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

function HeartNav({
  name,
  xCardButton,
}: {
  name: string;
  xCardButton: React.ReactElement;
}) {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: "gray.100" },
    { opacity: 1, backgroundColor: "gray.700" }
  );
  return (
    <Flex direction={["row", "row", "column"]} h="full">
      <Stack
        direction={["row", "row", "column"]}
        spacing={4}
        ml={-3}
        alignItems={["center", "center", "stretch"]}
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
          to={`/heart/${name}/facilitator`}
        >
          Facilitator
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
  );
}

export default HeartGameArea;
