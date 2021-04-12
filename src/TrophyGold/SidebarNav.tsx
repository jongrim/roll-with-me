import * as React from 'react';
import {
  Flex,
  Link,
  LinkProps,
  Spacer,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

export default function SidebarNav({
  children = null,
  name,
  xCardButton,
}: {
  children?: React.ReactNode;
  name: string;
  xCardButton: React.ReactNode;
}) {
  return (
    <Flex direction={['row', 'row', 'column']} h="full">
      <Stack
        direction={['row', 'row', 'column']}
        spacing={4}
        ml={[0, 0, 0, -3]}
        alignItems={['center', 'center', 'stretch']}
      >
        <SidebarLink name={name} destination="table">
          Table
        </SidebarLink>
        <SidebarLink name={name} destination="bestiary">
          Bestiary
        </SidebarLink>
        <SidebarLink name={name} destination="safety">
          Safety
        </SidebarLink>
        {children}
        {xCardButton}
      </Stack>
      <Spacer />
      <SidebarLink name={name} destination="credits" ml={[0, 0, 0, -3]}>
        Credits
      </SidebarLink>
      <Link
        isExternal
        href="https://trophyrpg.com/"
        justifySelf="end"
        my="auto"
      >
        Get Trophy
      </Link>
    </Flex>
  );
}

export function SidebarLink({
  children,
  name,
  destination,
  ...rest
}: {
  children: React.ReactNode;
  name: string;
  destination: string;
} & LinkProps) {
  const activeLink = useColorModeValue(
    { opacity: 1, backgroundColor: 'gray.100' },
    { opacity: 1, backgroundColor: 'gray.700' }
  );
  return (
    <Link
      rounded="md"
      px={3}
      py={2}
      opacity="0.8"
      _activeLink={activeLink}
      as={ReactRouterLink}
      to={`/trophy-gold/${name}/${destination}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
