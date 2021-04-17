import * as React from 'react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Link,
  IconButton,
  Flex,
  Stack,
  UnorderedList,
  ListItem,
  Divider,
  Kbd,
} from '@chakra-ui/react';
import { RiHomeHeartLine } from 'react-icons/ri';
import {
  GuideCode,
  GuideHeading,
  GuideLink,
  GuideStickyHeading,
} from './GuideComponents';

const guideLinks = {
  roomLifetime: 'room-lifetime',
  creatingRolls: 'creating-rolls',
  quickRolls: 'quick-rolls',
  savingRolls: 'saving-rolls',
  quickCreate: 'quick-create',
  rollingVisualDice: 'rolling-visual-dice',
};

function Guide() {
  return (
    <Grid templateRows="50px minmax(0, 1fr)" h="full">
      <GridItem>
        <Flex p={2} position="fixed">
          <Link as={ReactRouterLink} to="/">
            <IconButton
              aria-label="home"
              icon={<RiHomeHeartLine />}
              fontSize="28px"
              variant="ghost"
            />
          </Link>
        </Flex>
      </GridItem>
      <Grid
        h="full"
        templateColumns={['1fr', '1fr', '300px 1fr']}
        templateRows={['1fr', '1fr', 'minmax(0, 1fr)']}
        overflow="auto"
      >
        <GridItem
          px={4}
          overflow={['unset', 'unset', 'auto']}
          position={['inherit', 'inherit', 'sticky']}
          top="0"
        >
          <Box>
            <Heading as="h1">Usage Guide</Heading>
            <Heading as="h2" size="md" mt={6}>
              General
            </Heading>
            <Divider my={2} />
            <UnorderedList spacing={3} mt={3}>
              <ListItem>
                <GuideLink href={`#${guideLinks.roomLifetime}`}>
                  How long are rooms saved?
                </GuideLink>
              </ListItem>
            </UnorderedList>
            <Heading as="h2" size="md" mt={6}>
              Text Dice Roller
            </Heading>
            <Divider my={2} />
            <UnorderedList spacing={3} mt={3}>
              <ListItem>
                <GuideLink href={`#${guideLinks.creatingRolls}`}>
                  Creating Rolls
                </GuideLink>
              </ListItem>
              <ListItem>
                <GuideLink href={`#${guideLinks.savingRolls}`}>
                  Saving Rolls
                </GuideLink>
              </ListItem>
              <ListItem>
                <GuideLink href={`#${guideLinks.quickRolls}`}>
                  Quick Rolls
                </GuideLink>
              </ListItem>
            </UnorderedList>
            <Heading as="h2" size="md" mt={6}>
              Visual Dice Table
            </Heading>
            <Divider my={2} />
            <UnorderedList spacing={3} mt={3}>
              <ListItem>
                <GuideLink href={`#${guideLinks.rollingVisualDice}`}>
                  Rolling Visual Dice
                </GuideLink>
              </ListItem>
              <ListItem>
                <GuideLink href={`#${guideLinks.quickCreate}`}>
                  Quick Create Dice
                </GuideLink>
              </ListItem>
            </UnorderedList>
          </Box>
        </GridItem>
        <GridItem>
          <Container maxW="4xl" pb={12}>
            <GuideStickyHeading>General</GuideStickyHeading>
            <Stack direction="column" spacing={8}>
              <Box id={guideLinks.roomLifetime}>
                <GuideHeading>How long are rooms saved?</GuideHeading>
                <Text>
                  Room data is not automatically deleted at this time. However,
                  after six months of inactivity, a room is eligible to be
                  deleted if a room of the same name is requested. You can also
                  delete a room yourself by using the Room Controls area within
                  it.
                </Text>
                <Text mt={3}>
                  Note that not all actions count as room activity. In general,
                  only rolling dice count as room activity, so updating other
                  items like characters, clocks, etc will not update a room's
                  recent activity timestamp.
                </Text>
              </Box>
            </Stack>
            <GuideStickyHeading>Text Dice Roller</GuideStickyHeading>
            <Stack direction="column" spacing={8}>
              <Box id={guideLinks.creatingRolls}>
                <GuideHeading>Creating Rolls</GuideHeading>
                <Text>
                  There are two ways to create a roll. You can use the{' '}
                  <GuideLink href={`#${guideLinks.quickRolls}`}>
                    quick roll
                  </GuideLink>{' '}
                  bar, or use the roll form.
                </Text>
                <Text mt={3}>
                  To create a roll using the form, start by adding the dice you
                  would like to roll. Click on the die icon, or create a custom
                  die, to add it to your current roll. Once you have added your
                  dice, you may optionally add a roll modifier or name to
                  further customize it. When ready, click "Roll" to submit the
                  roll. The results will display to the right in the roll
                  results section.
                </Text>
              </Box>
              <Box id={guideLinks.savingRolls}>
                <GuideHeading>Saving Rolls</GuideHeading>
                <Text mt={3}>
                  Saving a roll is a useful way to be able to quickly roll the
                  same thing repeatedly. A saved roll is made up of dice, a roll
                  modifier, and a name.
                </Text>
                <Text mt={3}>
                  There are three ways to create a saved roll — when you roll it
                  using the Build a Roll form, by clicking "Create a new roll"
                  under the Saved Rolls tab, or by selecting "Save Roll" from
                  the roll actions in the roll history section.
                </Text>
                <Text mt={3}>
                  After you save a roll, it will appear under Saved Rolls and
                  you can roll it by clicking on the roll name. You may edit or
                  delete it using the actions menu to the side. If you have an
                  account and are signed in, your rolls are saved to your
                  account and will be available if you sign in and play from a
                  different device.
                </Text>
              </Box>
              <Box id={guideLinks.quickRolls}>
                <GuideHeading>Quick Rolls</GuideHeading>
                <Text mt={3}>
                  Quick rolls are the fastest way to roll dice. Quick rolls are
                  created using the Quick Roll Bar at the top of the screen. You
                  can also quickly move your cursor into this bar by using the
                  hotkey shortcut, <Kbd>control</Kbd> + <Kbd>/</Kbd>.
                </Text>
                <Text mt={3}>
                  Quick rolls support a common syntax for describing rolls. You
                  can describe a roll using a formula like{' '}
                  <GuideCode>2d6 + 1 as Investigate</GuideCode>. In this case,
                  2d6 describe how many of what type of die to roll, two 6-sided
                  die, the + 1 says to add a modifier of one to the roll result,
                  and "as Investigate" give the roll a name.
                </Text>
                <Text mt={3}>
                  Here are some examples of quick rolls that will work:
                  <UnorderedList>
                    <ListItem>2d6 + 2</ListItem>
                    <ListItem>2D6 1D10 as Challenge Roll</ListItem>
                    <ListItem>6 d 6 + 2</ListItem>
                    <ListItem>
                      2 Light 1 Dark — where 'Light' and 'Dark' are custom dice
                      that have been created in the room
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Box>
            </Stack>
            <GuideStickyHeading>Visual Dice Table</GuideStickyHeading>
            <Stack direction="column" spacing={8}>
              <Box id={guideLinks.rollingVisualDice}>
                <GuideHeading>Rolling Visual Dice</GuideHeading>
                <Text mt={3}>
                  To roll visual dice, first select the dice you would like to
                  roll by clicking each. Selected dice will have a color border
                  around them to visually distinguish them from those that have
                  not been selected. Once you have selected all the dice you
                  would like to roll, click the roll button which appears in the
                  bottom center of the screen. Each dice will be rolle
                </Text>
              </Box>
              <Box id={guideLinks.quickCreate}>
                <GuideHeading>Quick Create</GuideHeading>
                <Text mt={3}>
                  The Quick Create bar along the top of the screen in the Visual
                  Dice Table can be used to quickly add multiple dice to the
                  table. You can enter a combination of dice you would like to
                  add, such as <GuideCode>2d6 2d8</GuideCode>, and press{' '}
                  <Kbd>Enter</Kbd> to submit. The dice will be created and added
                  to the table for play.
                </Text>
              </Box>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </Grid>
  );
}

export default Guide;
