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
  Popover,
  PopoverTrigger,
  IconButton,
  Icon,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  HStack,
  Box,
  VStack,
  Flex,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { RiInformationLine } from 'react-icons/ri';
import { Roll } from '../types';

interface RollsHistoryProps {
  rolls: Roll[];
}

const RollsHistory: React.FC<RollsHistoryProps> = ({ rolls }) => {
  return (
    <>
      <Heading
        as="h3"
        size="md"
        textAlign="center"
        borderBottom="2px solid"
        borderColor="inherit"
        pb={1}
        mb={2}
      >
        Rolls History
      </Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Rolled By</Th>
            <Th>Result</Th>
            <Th>Name</Th>
            <Th>
              <Tooltip
                label="Time info displayed in local time"
                placement="top-start"
              >
                <HStack>
                  <Text>Time</Text>
                  <Icon
                    aria-label="time info in local timezone"
                    as={RiInformationLine}
                  />
                </HStack>
              </Tooltip>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {rolls.map((roll) => (
            <Tr key={roll.id}>
              <Td>{roll.rolledBy}</Td>
              <Td>
                <HStack>
                  <Box>{roll.sum}</Box>
                  <RollInfo roll={roll} />
                </HStack>
              </Td>
              <Td>{roll.rollName}</Td>
              <Td>
                {format(parseISO(roll.createdAt), 'EEE, LLL do, h:mm aaa')}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

const RollInfo = ({ roll }: { roll: Roll }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="click to expand"
          icon={<RiInformationLine />}
          variant="ghost"
        ></IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Roll Details</PopoverHeader>
        <PopoverBody>
          <VStack>
            <Flex justify="center" w="full">
              <HStack>
                <Heading as="h5" size="sm">
                  Total
                </Heading>
                <Text fontWeight="600">{roll.sum}</Text>
                <Text fontSize="xs" color="gray.400">
                  ({roll.dice.map(({ result }) => result).join(' + ')} +{' '}
                  {roll.modifier})
                </Text>
              </HStack>
            </Flex>
            <Table size="sm">
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
                    <Td fontWeight="300">Die {die.name || i + 1}</Td>
                    <Td fontWeight="300">{die.sides}</Td>
                    <Td fontWeight="600">{die.result}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RollsHistory;
