import * as React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { Die, Roll } from '../types';
import { fudgeDieNumberResult, fudgeDieTextResult } from '../utils/rolls';

interface RollResultsProps {
  rolls: Roll[];
}

interface dieResultsMap {
  [key: string]: {
    dice: Die[];
    sum: number;
  };
}

const RollResults = ({ rolls }: RollResultsProps) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <AnimateSharedLayout>
      <HStack
        spacing={2}
        borderBottom="2px solid"
        borderBottomColor="inherit"
        pb={1}
        mb={2}
      >
        <Heading as="h3" size="md">
          Last Roll
        </Heading>
        <Text size="sm" fontWeight="300">
          by {rolls[0].rolledBy}
        </Text>
      </HStack>
      <DetailedRollResults roll={rolls[0]} />
      {isLargerThan800 && (
        <Box position="relative">
          <Text opacity="0.7" mt={10} mb={-6} textAlign="right">
            Recent Rolls
          </Text>
          {rolls.slice(1).map((roll, i) => {
            return <RollSummary roll={roll} key={roll.id} offset={i} />;
          })}
        </Box>
      )}
    </AnimateSharedLayout>
  );
};

const DetailedRollResults = ({ roll }: { roll: Roll }) => {
  const diceMap: dieResultsMap = React.useMemo(() => {
    let map: dieResultsMap = {};
    roll?.dice.forEach((d) => {
      if (d.type === 'fudge') {
        map.Fudge = {
          dice: [d].concat(map.Fudge?.dice ?? []),
          sum: fudgeDieNumberResult(d.result || 0) + (map.Fudge?.sum || 0),
        };
      } else if (map[d.name]) {
        map[d.name].dice.push(d);
        map[d.name].sum += d.result || 0;
      } else {
        map[d.name] = { dice: [d], sum: d.result || 0 };
      }
    });
    return map;
  }, [roll]);
  const groupResults = Object.values(diceMap).map((results) => results.sum);
  return (
    <motion.div
      data-testid="last-roll-results"
      initial={{ opacity: 0, scale: 0.6, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      id="detailed-results"
    >
      <Stat>
        <StatLabel>{roll?.rollName}</StatLabel>
        <StatNumber fontSize={26}>{roll?.sum}</StatNumber>
        {(groupResults.length > 1 || roll.modifier !== 0) && (
          <StatHelpText fontSize={14}>{`${groupResults.join(' + ')}${
            roll?.modifier ? ` + ${roll.modifier}` : ''
          }`}</StatHelpText>
        )}
      </Stat>
      {Object.entries(diceMap).map(([key, results], i) => {
        return (
          <Box key={key} mt={4} data-testid={`die-${i}`}>
            <HStack spacing={2}>
              <Heading as="h4" size="sm" colorScheme="brand">
                {key}
              </Heading>
              <Text fontSize="xs" fontWeight="300" opacity="0.8">
                {results.sum} total
              </Text>
            </HStack>
            <Divider mt={1} mb={2} />
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {results.dice.map((d, i) => (
                <GridItem key={d.id}>
                  <Stat>
                    <StatNumber>
                      {d.type === 'fudge'
                        ? fudgeDieTextResult(d.result || 0)
                        : d.result}
                    </StatNumber>
                    <StatHelpText fontSize={11}>Die {i + 1}</StatHelpText>
                  </Stat>
                </GridItem>
              ))}
            </Grid>
          </Box>
        );
      })}
    </motion.div>
  );
};

const RollSummary = ({ roll, offset }: { roll: Roll; offset: number }) => {
  const opacity = 1 - offset * 0.3;
  const y = offset * 120;
  const borderColor = useColorModeValue('gray.50', 'inherit');
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity, y, scale: 1 }}
      transition={{ duration: 0.4 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      style={{ position: 'absolute', right: 0 }}
    >
      <Box
        mt={8}
        p={3}
        boxShadow="md"
        rounded="md"
        border="1px solid"
        borderColor={borderColor}
      >
        <HStack spacing={1}>
          <Text fontWeight="600">{roll.rolledBy}</Text>
          <Text fontSize="sm" maxW={48} isTruncated>
            rolled {roll.rollName}
          </Text>
        </HStack>
        <Flex mt={1} align="center">
          <Text fontSize="xl" fontWeight="bold" lineHeight="tall">
            {roll.sum}
          </Text>
          <Text
            fontSize="sm"
            color={subtleTextColor}
            ml={2}
            maxW={60}
            isTruncated
          >
            (
            {roll.dice
              .map(({ type, result = 0 }) => {
                if (type === 'fudge') return fudgeDieNumberResult(result);
                return result;
              })
              .join(' + ')}{' '}
            + {roll.modifier})
          </Text>
        </Flex>
        <Text fontSize="sm" fontWeight="300">
          {formatDistanceToNow(parseISO(roll.createdAt))} ago
        </Text>
      </Box>
    </motion.div>
  );
};

export default RollResults;
