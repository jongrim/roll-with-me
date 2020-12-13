import * as React from 'react';
import {
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
} from '@chakra-ui/react';
import { RiInformationLine } from 'react-icons/ri';

const fakeRolls = [
  {
    id: 'some long string',
    rolledBy: 'George',
    modifier: 1,
    sum: 9,
    dice: [
      { id: 'a unique ID', sides: 6, result: 4 },
      { id: 'a unique ID2', sides: 6, result: 4 },
    ],
    rollName: 'Fight',
  },
  {
    id: 'some other long string',
    rolledBy: 'Georgette',
    modifier: 0,
    sum: 12,
    dice: [
      { id: 'a unique ID3', sides: 10, result: 4 },
      { id: 'a unique ID4', sides: 10, result: 5 },
      { id: 'a unique ID5', sides: 6, result: 3 },
    ],
    rollName: 'Challenge',
  },
];

const RollsHistory: React.FC = () => {
  return (
    <>
      <Heading
        as="h3"
        size="md"
        textAlign="center"
        borderBottom="1px"
        borderColor="gray.200"
        borderStyle="solid"
      >
        Rolls History
      </Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Rolled By</Th>
            <Th>Result</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fakeRolls.map((roll) => (
            <Tr key={roll.id}>
              <Td>{roll.rolledBy}</Td>
              <Td>
                <HStack>
                  <Box>{roll.sum}</Box>
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
                          <Flex justify="center" w="full" my={2}>
                            <HStack>
                              <Heading as="h5" size="sm">
                                Total
                              </Heading>
                              <Text fontWeight="600">{roll.sum}</Text>
                              <Text fontSize="xs" color="gray.400">
                                (
                                {roll.dice
                                  .map(({ result }) => result)
                                  .join(' + ')}{' '}
                                + {roll.modifier})
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
                                  <Td px={3}>Die {i + 1}</Td>
                                  <Td>{die.sides}</Td>
                                  <Td>{die.result}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </VStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>
              </Td>
              <Td>{roll.rollName}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default RollsHistory;
