import * as React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  Divider,
  Grid,
  Center,
  useColorMode,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const RulesSummary = () => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Heading fontFamily="Alegreya" id="SRD" mb={4}>
        How to Play
      </Heading>
      <Divider />
      <Heading fontFamily="Alegreya" mt={6} mb={4}>
        Risk Roll
      </Heading>
      <Text mb={4}>
        When your character attempts a risky task, say what you hope will happen
        and ask the GM and the other players what could possibly go wrong. Then
        gather 6-sided dice. Take one light-colored die if the task is something
        your character would be able to do because of one of their Skills. Take
        another light die for accepting a{' '}
        <Link
          color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
          href="#devilsBargain"
        >
          Devil&apos;s Bargain
        </Link>{' '}
        from another player or the GM. Devil&apos;s Bargains are described in
        the following section. Add a dark-colored die if you are willing to risk
        your character&apos;s mind or body in order to succeed. You must include
        this die whenever your character performs a Ritual. Roll the dice.
      </Text>
      <Text mb={4}>If your highest die is a:</Text>
      <Grid
        templateColumns="auto 1fr"
        border="1px solid"
        borderColor="inherit"
        mb={4}
      >
        <Center h="full">
          <Text p={3}>1-3</Text>
        </Center>
        <Text p={3}>
          Your character fails, and things get worse. The GM describes how. The
          GM may also allow your character to succeed, but things will get worse
          in some other way.
        </Text>
        <Center
          h="full"
          bgColor={colorMode === 'light' ? 'orange.50' : 'orange.700'}
        >
          <Text p={3}>4-5</Text>
        </Center>
        <Text
          bgColor={colorMode === 'light' ? 'orange.50' : 'orange.700'}
          p={3}
        >
          Your character succeeds, but there&apos;s some kind of complication.
          The GM describes the complication, then you describe how your
          character succeeds.
        </Text>
        <Center h="full">
          <Text p={3}>6</Text>
        </Center>
        <Text p={3}>Your character succeeds. Describe how.</Text>
      </Grid>
      <Text>
        If you included a dark die and it rolled equal to or higher than your
        highest light die, it counts as a Ruin Roll as described under{' '}
        <Link
          color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
          href="#ruinRoll"
        >
          Ruin Roll
        </Link>
        . If you are unhappy with your roll, you may add an additional dark die
        to your dice and re-roll. You can keep adding more dark dice and
        re-rolling. You cannot re-roll when a dark die is the highest die in
        your roll. If you use a Risk Roll to try to defeat a monster in
        hand-to-hand combat, you will die. Instead, roll to hide, roll to
        escape, or roll to use a Ritual against it. If you fight something that
        is not monstrous or if you fight a monster but not to defeat it (for
        example, to fight your way past it), be clear about what you want from
        the fight, then roll normally.
      </Text>
      <Heading fontFamily="Alegreya" id="devilsBargain" mt={6} mb={4}>
        Devil&apos;s Bargains
      </Heading>
      <Text mb={4}>
        The GM or any other player can offer you a bonus light die if you accept
        a Devil&apos;s Bargain. Common Devil&apos;s Bargains include:
      </Text>
      <UnorderedList>
        <ListItem>
          Your character causes collateral damage or unintended harm.
        </ListItem>
        <ListItem>
          Your character gets lost or separated from their companions.
        </ListItem>
        <ListItem>Your character sacrifices an important item.</ListItem>
        <ListItem>Your character betrays a companion.</ListItem>
        <ListItem>Your character attracts unwanted attention.</ListItem>
      </UnorderedList>
      <Text mt={2}>
        The Devil&apos;s Bargain occurs regardless of the outcome of the roll.
        You make the deal, pay the price, and get the bonus die. The
        Devil&apos;s Bargain is always a free choice. If you don&apos;t like
        one, just reject it (or suggest how to alter it so you might consider
        taking it). You can always just risk your character&apos;s mind or body
        and take a dark die instead. Anyone may veto or suggest alterations to a
        proposed Devil&apos;s Bargain, especially if it would also impact their
        character.
      </Text>
      <Heading fontFamily="Alegreya" id="ruinRoll" mt={6} mb={4}>
        Ruin Roll
      </Heading>
      <Text mb={4}>
        Your Ruin shows how much physical and mental harm your character has
        suffered. It starts at 1. When your character witnesses or undergoes
        something disturbing, make a Ruin Roll by rolling one dark die. If
        you&apos;ve made a Risk Roll which includes a dark die, and that die is
        equal to or higher than your highest light die in that roll, your dark
        die is automatically considered a Ruin Roll. If your dark die rolled
        higher than your current Ruin, add 1 to your Ruin and work with the GM
        to describe the decline of your character&apos;s mind and body.
      </Text>
      <Heading fontFamily="Alegreya" mt={6} mb={4}>
        Reduction Roll
      </Heading>
      <Text>
        When your Ruin reaches 5, you may now reduce it when your character
        attempts subtle acts of sabotage against their companions. Each time
        your character does this, roll one light die. If you get less than your
        current Ruin, your character succeeds at their task and you decrease
        your Ruin by 1. You may continue reducing your Ruin in this way when
        your Ruin drops below 5.
      </Text>

      <Heading fontFamily="Alegreya" mt={6} mb={4}>
        Losing Your Character
      </Heading>
      <Text mb={4}>
        When your Ruin reaches 6, your character is lost. This is an important
        moment: Everyone focuses on your character&apos;s last flashes of
        lucidity before they run away or turn against their companions. Hand
        your character over to the GM to control, and either create a new
        character or exit the game.
      </Text>
      <Divider />
      <Box mt={6}>
        <Text>
          This work is based on{' '}
          <Link
            isExternal
            color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
            href="https://trophyrpg.com"
          >
            Trophy
          </Link>
          , product of Jesse Ross and Hedgemaze Press, and licensed for our use
          under the{' '}
          <Link
            isExternal
            color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
            href="https://creativecommons.org/licenses/by/4.0/"
          >
            Creative Commons Attribution 4.0 License
          </Link>
          . Trophy is adapted from Cthulhu Dark with permission of Graham
          Walmsley. Trophy is also based on{' '}
          <Link
            isExternal
            color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
            href="http://www.bladesinthedark.com/"
          >
            Blades in the Dark
          </Link>
          , product of One Seven Design, developed and authored by John Harper,
          and licensed for our use under the{' '}
          <Link
            isExternal
            color={colorMode === 'light' ? 'brand.600' : 'brand.100'}
            href="http://creativecommons.org/licenses/by/3.0/"
          >
            Creative Commons Attribution 3.0 Unported license
          </Link>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default RulesSummary;
