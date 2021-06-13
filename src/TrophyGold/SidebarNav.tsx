import * as React from "react";
import {
  Box,
  Flex,
  Link,
  LinkProps,
  Spacer,
  Stack,
  useColorModeValue,
  Collapse,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { NavLink as ReactRouterLink } from "react-router-dom";

export default function SidebarNav({
  children,
  name,
  xCardButton,
}: {
  children?: (onClick: () => void) => React.ReactNode;
  name: string;
  xCardButton: React.ReactNode;
}) {
  const isSmaller = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  });
  const bgColor = useColorModeValue("white", "gray.800");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <Box height="full">
      {isSmaller && (
        <IconButton
          ml={3}
          icon={<RiMenuLine />}
          aria-label="open menu"
          variant="outline"
          size="sm"
          position="absolute"
          top={3}
          left={12}
          onClick={() => setMenuOpen((cur) => !cur)}
        />
      )}
      <SidebarContainer isSmaller={Boolean(isSmaller)} menuOpen={menuOpen}>
        <Flex
          direction="column"
          height={["auto", "auto", "full"]}
          width="full"
          position={["absolute", "absolute", "inherit"]}
          bgColor={bgColor}
          zIndex="20"
          px={1}
          borderBottom={isSmaller ? "1px solid" : ""}
          borderColor={isSmaller ? "inherit" : ""}
        >
          <Stack direction="column" spacing={4} alignItems="stretch">
            <SidebarLink
              onClick={closeMenu}
              name={name}
              destination="characters"
            >
              Characters
            </SidebarLink>
            <SidebarLink onClick={closeMenu} name={name} destination="dice">
              Dice
            </SidebarLink>
            <SidebarLink onClick={closeMenu} name={name} destination="bestiary">
              Bestiary
            </SidebarLink>
            <SidebarLink onClick={closeMenu} name={name} destination="safety">
              Safety
            </SidebarLink>
            {children && children(closeMenu)}
            {xCardButton}
          </Stack>
          {!isSmaller && <Spacer />}
          <Stack direction="column" spacing={4} alignItems="stretch" py={4}>
            <SidebarLink onClick={closeMenu} name={name} destination="credits">
              Credits
            </SidebarLink>
            <Link
              isExternal
              href="https://trophyrpg.com/"
              justifySelf="end"
              my="auto"
              px={3}
              py={2}
            >
              Get Trophy
            </Link>
          </Stack>
        </Flex>
      </SidebarContainer>
    </Box>
  );
}

function SidebarContainer({
  isSmaller,
  menuOpen,
  children,
}: {
  isSmaller: boolean;
  menuOpen: boolean;
  children: React.ReactNode;
}) {
  return isSmaller ? (
    <Collapse in={menuOpen} animateOpacity>
      {children}
    </Collapse>
  ) : (
    <Box height="full">{children}</Box>
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
    { opacity: 1, backgroundColor: "gray.100" },
    { opacity: 1, backgroundColor: "gray.700" }
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
