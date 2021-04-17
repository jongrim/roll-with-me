import * as React from 'react';
import {
  Heading,
  Box,
  useColorModeValue,
  Link,
  LinkProps,
} from '@chakra-ui/react';

interface StyleComponent {
  children: React.ReactNode;
}

export function GuideHeading({ children }: StyleComponent) {
  return (
    <Heading as="h3" size="lg" mb={2}>
      {children}
    </Heading>
  );
}

export function GuideCode({ children }: StyleComponent) {
  const bg = useColorModeValue('gray.100', 'gray.700');
  return (
    <Box as="code" bg={bg} px={2}>
      {children}
    </Box>
  );
}

export function GuideLink({ children, ...rest }: StyleComponent & LinkProps) {
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  return (
    <Link color={linkColor} {...rest}>
      {children}
    </Link>
  );
}

export function GuideStickyHeading({ children }: StyleComponent) {
  const bgColor = useColorModeValue('white', 'gray.800');
  return (
    <Heading as="h4" size="sm" bg={bgColor} mt={12} mb={6} pb={1}>
      {children}
    </Heading>
  );
}
