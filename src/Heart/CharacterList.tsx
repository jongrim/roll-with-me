import * as React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Character from "./Character";
import { HeartCharacterWithID } from "../APITypes";
import CharacterNavBar from "../Common/CharacterNavBar/CharacterNavBar";

export type viewLayout = "side" | "top";

interface CharacterListProps {
  characters: HeartCharacterWithID[];
  characterChoice: "GM" | string;
}

const CharacterList = ({ characters, characterChoice }: CharacterListProps) => {
  const [layout, setLayout] = React.useState<viewLayout>("top");
  const playerCharacter = characters.find((c) => c?.id === characterChoice);
  const characterItemBorder =
    layout === "side"
      ? { borderBottom: "1px solid", borderColor: "inherit", paddingBottom: 4 }
      : { borderRight: "1px solid", borderColor: "inherit", paddingRight: 4 };
  const isGM = characterChoice === "GM";

  const charactersWithoutPC = characters.filter(
    (c) => c?.id !== playerCharacter?.id
  );

  return (
    <Box>
      <CharacterNavBar
        characters={characters}
        layout={layout}
        setLayout={setLayout}
      />
      <Grid
        templateColumns={
          layout === "top" ? `repeat(${characters.length}, 650px)` : "1fr"
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
