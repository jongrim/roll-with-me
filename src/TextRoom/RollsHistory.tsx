import * as React from 'react';
import { format, parseISO } from 'date-fns';
import {
  Container,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  HStack,
  Box,
  VStack,
  Flex,
  Text,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Grid,
  GridItem,
  useColorMode,
  Spacer,
} from '@chakra-ui/react';
import { Roll } from '../types';

interface RollsHistoryProps {
  rolls: Roll[];
}

const RollsHistory: React.FC<RollsHistoryProps> = ({ rolls }) => {
  const { colorMode } = useColorMode();
  const itemBorder =
    colorMode === 'dark'
      ? { border: '1px solid', borderColor: 'inherit' }
      : { boxShadow: 'lg' };
  return (
    <Container maxW="full" px={0}>
      <Heading as="h3" size="md" textAlign="center" pb={1} mb={2}>
        Rolls History
      </Heading>
      <Grid templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']} gap={8}>
        {rolls.map((roll) => (
          <GridItem
            key={`${roll.id} - ${roll.createdAt}`}
            rounded="lg"
            p={3}
            {...itemBorder}
          >
            <VStack spacing={2}>
              <Text>{roll.rollName}</Text>
              <HStack spacing={3}>
                <Text fontSize="xl" fontWeight="bold" lineHeight="tall">
                  {roll.sum}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  ({roll.dice.map(({ result }) => result).join(' + ')} +{' '}
                  {roll.modifier})
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Text fontSize="sm" fontWeight="300" isTruncated>
                  {roll.rolledBy}
                </Text>
                <Text fontSize="lg">|</Text>
                <Tooltip
                  label="Time info displayed in local time"
                  placement="top-start"
                >
                  <Text fontSize="sm" fontWeight="300">
                    {format(parseISO(roll.createdAt), 'LLL do, h:mm aaa')}
                  </Text>
                </Tooltip>
              </HStack>
            </VStack>
            <Spacer />
            <RollInfo roll={roll} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

const RollInfo = ({ roll }: { roll: Roll }) => {
  return (
    <Table variant="unstyled" mt={4}>
      <Thead>
        <Tr>
          <Th>Die</Th>
          <Th>Sides</Th>
          <Th>Result</Th>
        </Tr>
      </Thead>
      <Tbody>
        {roll.dice.map((die, i) => (
          <Tr key={die.id}>
            <Td fontWeight="300">{die.name || i + 1}</Td>
            <Td fontWeight="300">{die.sides}</Td>
            <Td fontWeight="600">{die.result}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RollsHistory;
