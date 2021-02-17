import * as React from 'react';
import { Text } from '@chakra-ui/react';

const quotes = [
  {
    quote:
      'When winding vine chokes chiseled stone,\nThese woods will claim a trophy of their own.',
    publication: 'Trophy Dark',
    by: 'Jesse Ross',
  },
  {
    quote:
      'When graven gods are overgrown,\nThese woods will claim a trophy of their own.',
    publication: 'Trophy Dark',
    by: 'Jesse Ross',
  },
  {
    quote:
      'When thorn bursts forth from living bone,\nThese woods will claim a trophy of their own.',
    publication: 'Trophy Dark',
    by: 'Jesse Ross',
  },
  {
    quote:
      'When vengeful seeds are finally sown,\nThese woods will claim a trophy of their own.',
    publication: 'Trophy Dark',
    by: 'Jesse Ross',
  },
];

const TrophyQuote = () => {
  const [quote] = React.useState(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  });
  return (
    <>
      <Text
        fontStyle="italic"
        fontWeight="500"
        fontSize="xl"
        whiteSpace="pre-wrap"
      >
        {quote.quote}
      </Text>
      <Text fontWeight="300" fontSize="sm" pl={4}>
        – {quote.publication}, by {quote.by}
      </Text>
    </>
  );
};

export default TrophyQuote;
