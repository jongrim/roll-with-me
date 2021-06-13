import * as React from "react";
import {
  Flex,
  Tag,
  Text,
  Button,
  Divider,
  Box,
  useToast,
} from "@chakra-ui/react";
import { RawTrophyGoldCharacter } from "../APITypes";
import { TrophyGoldDiceMode } from "../API";
import { updateCharacter } from "./Character";
import { RandomNumbersContext } from "../RandomNumbersProvider";

interface WeakPointsProps {
  characters?: RawTrophyGoldCharacter[];
  characterChoice: string;
  diceMode: TrophyGoldDiceMode;
  darkDice: string[];
}

export default function WeakPoints({
  characters,
  characterChoice,
  darkDice,
}: WeakPointsProps) {
  const { getNumbers } = React.useContext(RandomNumbersContext);
  const toast = useToast();
  return (
    <Box>
      <Flex alignItems="center">
        <Text fontWeight="600" w={28}>
          Weak Points
        </Text>
        <Divider opacity="1" borderColor="gray.400" />
      </Flex>
      <Flex my={2}>
        {characterChoice === "GM" ? (
          <>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => {
                if (!characters) {
                  toast({
                    status: "error",
                    description: `No characters available`,
                    duration: 5000,
                  });
                  return;
                }
                const promises = characters.map(async (c) => {
                  const [result] = await getNumbers(1);
                  return updateCharacter({
                    id: c.id,
                    weakPoint: (result % 6) + 1,
                  });
                });
                Promise.allSettled(promises).then(() => {
                  toast({
                    status: "success",
                    description: `Weak points updated`,
                    duration: 5000,
                  });
                });
              }}
            >
              Set New Weak Point For All Characters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              ml={2}
              onClick={() => {
                if (!characters) {
                  toast({
                    status: "error",
                    description: `No characters available`,
                    duration: 5000,
                  });
                  return;
                }
                const promises = characters.map(async (c) => {
                  return updateCharacter({ id: c.id, weakPoint: null });
                });
                Promise.allSettled(promises).then(() => {
                  toast({
                    status: "success",
                    description: `Weak points cleared`,
                    duration: 5000,
                  });
                });
              }}
            >
              Clear
            </Button>
          </>
        ) : (
          <Button
            colorScheme="teal"
            size="sm"
            onClick={async () => {
              const [result] = await getNumbers(1);
              const weakPoint = (result % 6) + 1;
              await updateCharacter({
                id: characterChoice,
                weakPoint,
              });
              toast({
                status: "success",
                description: `Weak point updated to ${weakPoint}`,
                duration: 5000,
              });
            }}
          >
            Set New Weak Point
          </Button>
        )}
      </Flex>
      <Text fontSize="sm">
        If any of the dark dice equals your Weak Point, your treasure- hunter’s
        Ruin increases by 1 for each dark die matching the Weak Point. You can
        choose to mark off a piece of your armor to ignore all Ruin increases
        for your treasure-hunter during a single roll. Describe how your armor
        absorbs the hit to protect you. Marked armor is unusable until you
        safely return to town.
      </Text>
      <Flex justifyContent="space-around" wrap="wrap" mt={4}>
        {characters?.map((char) => {
          if (char.weakPoint) {
            return (
              <Tag
                key={`${char.id}-${char.weakPoint}`}
                variant={
                  darkDice.includes(char.weakPoint.toString())
                    ? "solid"
                    : "outline"
                }
                colorScheme="red"
                mb={2}
              >
                {char.characterName ?? "Unnamed character"} – {char.weakPoint}
              </Tag>
            );
          }
          return null;
        })}
      </Flex>
    </Box>
  );
}
