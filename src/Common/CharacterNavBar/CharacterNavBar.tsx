import * as React from "react";
import {
  Text,
  HStack,
  IconButton,
  Tooltip,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiLayoutRowLine, RiLayoutColumnLine } from "react-icons/ri";

interface CharacterNavBarProps {
  characters: { id: string; characterName?: string }[];
  layout: "side" | "top";
  setLayout: (val: "side" | "top") => void;
}

export default function CharacterNavBar({
  characters,
  layout,
  setLayout,
}: CharacterNavBarProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <HStack
      spacing={8}
      border="1px solid"
      borderColor="inherit"
      borderRadius="sm"
      pr={3}
      py={1}
      wrap="wrap"
      position="fixed"
      bottom="0px"
      right="0px"
      bgColor={bgColor}
      zIndex={1}
    >
      {characters.map((c) => (
        <Button
          colorScheme="blue"
          variant="ghost"
          onClick={() => {
            const el = document.getElementById(
              c.characterName ? c.characterName.replace(" ", "") : `${c.id}`
            );
            el?.scrollIntoView({
              behavior: "smooth",
              inline: "start",
            });
          }}
          key={c.id}
        >
          <Text isTruncated maxW="sm">
            {c.characterName || "Unnamed wanderer"}
          </Text>
        </Button>
      ))}
      <Tooltip label="Change character sheet layout" placement="left">
        <IconButton
          variant="ghost"
          icon={
            layout === "side" ? <RiLayoutColumnLine /> : <RiLayoutRowLine />
          }
          aria-label="Change character sheet layout"
          onClick={() => {
            if (layout === "top") {
              setLayout("side");
            } else {
              setLayout("top");
            }
          }}
        />
      </Tooltip>
    </HStack>
  );
}
