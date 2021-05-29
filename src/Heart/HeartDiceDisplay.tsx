import * as React from 'react';
import {
  Text,
  HStack,
  Box,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Flex,
  Image,
} from '@chakra-ui/react';
import { HeartRoll } from './HeartGameTypes';
import rules from './rules_in_brief.png';

interface HeartDiceDisplayProps {
  d4Dice: { username: string; result: number }[];
  d6Dice: { username: string; result: number }[];
  d8Dice: { username: string; result: number }[];
  d10Dice: { username: string; result: number }[];
  d12Dice: { username: string; result: number }[];
  d20Dice: { username: string; result: number }[];
  prevRolls: HeartRoll[];
}

const HeartDiceDisplay = ({
  d4Dice,
  d6Dice,
  d8Dice,
  d10Dice,
  d12Dice,
  d20Dice,
  prevRolls,
}: HeartDiceDisplayProps) => {
  let username =
    d4Dice.length > 0
      ? d4Dice[0].username
      : d6Dice.length > 0
      ? d6Dice[0].username
      : d8Dice.length > 0
      ? d8Dice[0].username
      : d10Dice.length > 0
      ? d10Dice[0].username
      : d12Dice.length > 0
      ? d12Dice[0].username
      : d20Dice.length > 0
      ? d20Dice[0].username
      : 'a ghost';

  return (
    <Box py={4}>
      <Tabs isFitted>
        <TabList>
          <Tab>Current Roll</Tab>
          <Tab>Previous Rolls</Tab>
          <Tab>Rules in Brief</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Text mb={2}>Rolled by {username}</Text>
            <Grid templateColumns="repeat(3, 1fr)" rowGap={4} columnGap={20}>
              {d4Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D4
                  </Text>
                  <HStack spacing={3}>
                    {d4Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
              {d6Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D6
                  </Text>
                  <HStack spacing={3}>
                    {d6Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
              {d8Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D8
                  </Text>
                  <HStack spacing={3}>
                    {d8Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
              {d10Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D10
                  </Text>
                  <HStack spacing={3}>
                    {d10Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
              {d12Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D12
                  </Text>
                  <HStack spacing={3}>
                    {d12Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
              {d20Dice.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    borderBottom="1px solid"
                    borderColor="inherit"
                  >
                    D20
                  </Text>
                  <HStack spacing={3}>
                    {d20Dice.map((d, i) => (
                      <Text
                        key={`${d.result} - ${i}`}
                        fontWeight="500"
                        fontSize="lg"
                      >
                        {d.result}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
            </Grid>
          </TabPanel>
          <TabPanel px={0}>
            <Text fontSize="sm" mb={3}>
              Note, only rolls since connected are shown
            </Text>
            <Grid
              templateColumns="repeat(3, 1fr)"
              columnGap={20}
              rowGap={4}
              alignItems="start"
            >
              {prevRolls.map((roll) => (
                <Box
                  key={roll.id}
                  px={4}
                  py={3}
                  boxShadow="md"
                  border="1px solid"
                  borderColor="inherit"
                  borderRadius="md"
                >
                  <Stack direction="column">
                    {Object.entries(roll.dice).map(([label, numbers]) => {
                      if (numbers.length === 0) return null;
                      return (
                        <Flex key={`${roll.id}-${label}`}>
                          <Text fontWeight="600">{label}</Text>
                          <Text ml={3}>{numbers.join(', ')}</Text>
                        </Flex>
                      );
                    })}
                  </Stack>
                  <Text fontSize="sm">Rolled by {roll.username}</Text>
                </Box>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel px={0}>
            <Image
              src={rules}
              alt="Rules in Brief. Pg 8 of Heart"
              height="100%"
              width="100%"
              borderRadius="md"
            />
            <Text fontSize="sm" fontStyle="italic" mt={1} pb={4}>
              Rules in Brief, pg. 8 of Heart Rulebook. Copyright by Grant Howitt
              and Christopher Taylor. Published by Rowan, Rook and Decard Ltd.
              Used with permission.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HeartDiceDisplay;
