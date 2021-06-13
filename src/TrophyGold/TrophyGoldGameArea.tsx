import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Spacer,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { RiExternalLinkFill } from "react-icons/ri";
import SettingsBar from "../SettingsBar";
import { Route, Redirect } from "react-router-dom";
import TrophyDice from "./TrophyDice";
import { RawTrophyGoldCharacter, RawTrophyGoldRoomDetails } from "../APITypes";
import CharacterList from "./CharacterList";
import SafetyForm from "../SafetyForm/SafetyForm";
import setXCard from "../SafetyForm/xCard";
import XCardModal from "../XCardModal/XCardModal";
import { updateCharacter } from "./Character";
import { TrophyGoldBeast, UpdateTrophyGoldCharacterInput } from "../API";
import useDelayedUpdate from "./useDelayedUpdate";
import NewWindow from "react-new-window";
import SidebarNav, { SidebarLink } from "./SidebarNav";
import Bestiary from "./Bestiary";
import Credits from "./Credits";
import { GM } from "./TrophyGoldRoom";
import GameFacilitator from "./GameFacilitator";
import CharacterNavBar from "../Common/CharacterNavBar/CharacterNavBar";

interface TrophyGoldGameProps {
  username: string;
  setUsername: (val: string) => void;
  beasts: TrophyGoldBeast[];
  characters: RawTrophyGoldCharacter[];
  characterChoice: string;
  gameData: RawTrophyGoldRoomDetails;
}

export type viewLayout = "side" | "top";

const TrophyGoldGameArea = ({
  username,
  setUsername,
  beasts,
  characters,
  characterChoice,
  gameData,
}: TrophyGoldGameProps) => {
  const { id, safetyModule, diceModule, name } = gameData;
  const xCardRef = React.useRef<HTMLButtonElement>(null);
  const updateWithId = React.useCallback(
    async (update: Omit<UpdateTrophyGoldCharacterInput, "id">) => {
      await updateCharacter({ id: characterChoice, ...update });
    },
    [characterChoice]
  );
  const { delayedUpdate: delayedUsernameUpdate } =
    useDelayedUpdate(updateWithId);
  const [layout, setLayout] = React.useState<viewLayout>("top");
  const [popoutDice, setPopoutDice] = React.useState(false);
  React.useEffect(() => {
    return () => setPopoutDice(false);
  }, []);
  const visibleCharacters = React.useMemo(
    () => characters.filter((c) => c.hidden !== true),
    [characters]
  );
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
      <GridItem>
        <Grid
          h="full"
          templateColumns={["1fr", "1fr", "150px minmax(0, 1fr)"]}
          templateRows={[
            "auto auto minmax(0, 1fr)",
            "auto auto minmax(0, 1fr)",
            "minmax(0, 1fr)",
          ]}
        >
          <GridItem h="full">
            <SidebarNav
              name={name}
              xCardButton={
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="brand"
                  ref={xCardRef}
                  onClick={() => setXCard({ value: true, id: safetyModule.id })}
                >
                  x-card
                </Button>
              }
            >
              {(onClick: () => void) => {
                if (characterChoice === GM) {
                  return (
                    <SidebarLink
                      onClick={onClick}
                      name={name}
                      destination="facilitator"
                    >
                      Game Facilitator
                    </SidebarLink>
                  );
                }
                return null;
              }}
            </SidebarNav>
          </GridItem>
          <GridItem overflow="auto" px={[0, 0, 0, 2]} pr={4}>
            <Route exact path={[`/trophy-gold/${name}/characters`]}>
              <Grid
                h="full"
                templateColumns="1fr"
                templateRows="minmax(0, 1fr)"
                alignContent="start"
              >
                <GridItem overflow="auto">
                  <CharacterList
                    characters={visibleCharacters}
                    characterChoice={characterChoice}
                    layout={layout}
                  />
                  <CharacterNavBar
                    characters={visibleCharacters}
                    layout={layout}
                    setLayout={setLayout}
                  />
                </GridItem>
              </Grid>
            </Route>
            <Route exact path={`/trophy-gold/${name}/dice`}>
              <Flex px={2} py={1} wrap="wrap">
                <Spacer />
                <Tooltip label="Open dice in new window" placement="left">
                  <IconButton
                    variant="ghost"
                    icon={<RiExternalLinkFill />}
                    aria-label="open dice in new window"
                    onClick={() => setPopoutDice(true)}
                  />
                </Tooltip>
              </Flex>
              {popoutDice ? (
                <NewWindow onUnload={() => setPopoutDice(false)}>
                  <TrophyDice
                    characters={visibleCharacters}
                    characterChoice={characterChoice}
                    diceModule={diceModule}
                  />
                </NewWindow>
              ) : (
                <GridItem w="full">
                  <TrophyDice
                    characters={visibleCharacters}
                    characterChoice={characterChoice}
                    diceModule={diceModule}
                  />
                </GridItem>
              )}
            </Route>
            <Route exact path={`/trophy-gold/${name}/bestiary`}>
              <Bestiary beasts={beasts} gameID={{ gameID: id }} />
            </Route>
            <Route exact path={`/trophy-gold/${name}/safety`}>
              <SafetyForm
                id={safetyModule.id}
                setActionInProgress={(val) => {
                  // TODO: show in progress indicator
                }}
              />
            </Route>
            {characterChoice === GM && (
              <Route exact path={`/trophy-gold/${name}/facilitator`}>
                <GameFacilitator gameID={id} characters={characters} />
              </Route>
            )}
            <Route exact path={`/trophy-gold/${name}/credits`}>
              <Credits />
            </Route>
            <Redirect path="*" to={`/trophy-gold/${name}/characters`} />
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
