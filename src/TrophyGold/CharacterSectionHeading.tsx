import * as React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

export default function CharacterSectionHeading({
  children,
  ...rest
}: {
  children: React.ReactChild;
} & HeadingProps) {
  return (
    <Heading as="h3" size="md" fontFamily="Roboto Slab" mb={2} {...rest}>
      {children}
    </Heading>
  );
}
