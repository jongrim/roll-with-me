import * as React from 'react';
import { Flex, Link, Spacer, Stack, useColorModeValue } from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

export default function SidebarNav({
  name,
  xCardButton,
}: {
  name: string;
  xCardButton: React.ReactNode;
}) {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  return (
    <Flex direction={['row', 'row', 'column']} h="full">
      <Stack
        direction={['row', 'row', 'column']}
        spacing={4}
        ml={-3}
        alignItems={['center', 'center', 'stretch']}
      >
        <Link
          rounded="md"
          px={3}
          py={2}
          opacity="0.8"
          _activeLink={activeLink}
          as={ReactRouterLink}
          to={`/trophy-gold/${name}/table`}
        >
          Table
        </Link>
        <Link
          rounded="md"
          px={3}
          py={2}
          opacity="0.8"
          _activeLink={activeLink}
          as={ReactRouterLink}
          to={`/trophy-gold/${name}/bestiary`}
        >
          Bestiary
        </Link>
        <Link
          rounded="md"
          px={3}
          py={2}
          opacity="0.8"
          _activeLink={activeLink}
          as={ReactRouterLink}
          to={`/trophy-gold/${name}/safety`}
        >
          Safety
        </Link>
        {xCardButton}
      </Stack>
      <Spacer />
      <Link
        rounded="md"
        ml={-3}
        px={3}
        py={2}
        opacity="0.8"
        _activeLink={activeLink}
        as={ReactRouterLink}
        to={`/trophy-gold/${name}/credits`}
      >
        Credits
      </Link>
      <Link isExternal href="https://trophyrpg.com/" justifySelf="end">
        Get Trophy
      </Link>
    </Flex>
  );
}
