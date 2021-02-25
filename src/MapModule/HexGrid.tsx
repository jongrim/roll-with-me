import * as React from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';
import {
  useColorModeValue,
  Box,
  IconButton,
  Flex,
  HStack,
  Center,
} from '@chakra-ui/react';
import {
  RiImageAddFill,
  RiStickyNoteLine,
  RiSettings3Line,
  RiZoomOutLine,
  RiZoomInLine,
} from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';

export interface GridConfig {
  [point: string]: {
    backgroundImage?: string;
    fill?: string;
    notes?: string;
  };
}

interface HexGridProps {
  backgroundImages: { path: string; id: string }[];
  gridConfig: GridConfig;
  setGridConfig: React.Dispatch<React.SetStateAction<GridConfig>>;
  handleSetBackgroundClick: ({ x, y }: { x: number; y: number }) => void;
  handleNotesClick: ({ x, y }: { x: number; y: number }) => void;
  handleSettingsClick: ({ x, y }: { x: number; y: number }) => void;
}

const HexGrid = ({
  backgroundImages,
  gridConfig,
  handleSetBackgroundClick,
  handleNotesClick,
  handleSettingsClick,
}: HexGridProps) => {
  const [controlsVisible, setControlsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState<{
    x: number;
    rawX: number;
    y: number;
    rawY: number;
  }>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });
  const defaultStrokeColor = useColorModeValue('#CBD5E0', '#4A5568');
  const hoverColor = useColorModeValue('#F7FAFC', '#2D3748');
  const [cornersPath, hexRect, width, height] = React.useMemo(() => {
    const Hex = extendHex({ size: 7, orientation: 'flat' });
    const Grid = defineGrid(Hex);
    // get the corners of a hex (they're the same for all hexes created with the same Hex factory)
    const corners = Hex().corners();
    const hexRect = Grid.rectangle({ width: 15, height: 10 }).map((hex) =>
      hex.toPoint()
    );
    const cornersPath = corners.map(({ x, y }) => `${x},${y}`).join(' ');
    return [cornersPath, hexRect, Hex().width(), Hex().height()];
  }, []);

  const item = {
    visible: (i: number) => {
      switch (i) {
        case 0:
          return {
            x: coords.x - 35,
            y: coords.y - 24,
            opacity: 1,
            transition: {
              delay: i * 0.1,
            },
          };
        case 1:
          return {
            x: coords.x,
            y: coords.y - 54,
            opacity: 1,
            transition: {
              delay: i * 0.1,
            },
          };
        case 2:
          return {
            x: coords.x + 35,
            y: coords.y - 24,
            opacity: 1,
            transition: {
              delay: i * 0.1,
            },
          };
        default:
          return {
            x: coords.x + 35,
            y: coords.y - 24,
            opacity: 1,
            transition: {
              delay: i * 0.1,
            },
          };
      }
    },
  };

  return (
    <Box w="full" h="full">
      <Flex justifyContent="center">
        <HStack spacing={3} mb={3}>
          <IconButton
            icon={<RiZoomInLine />}
            variant="ghost"
            rounded="lg"
            aria-label="zoom in"
          ></IconButton>
          <IconButton
            icon={<RiZoomOutLine />}
            variant="ghost"
            rounded="lg"
            aria-label="zoom out"
          ></IconButton>
        </HStack>
      </Flex>
      <Center>
        <Box
          as="svg"
          viewBox="0 0 150 100"
          preserveAspectRatio="xMidYMid slice"
          minH="lg"
          maxH="xl"
          h="full"
          border="2px solid"
          borderColor={defaultStrokeColor}
          rounded="sm"
        >
          <defs>
            {backgroundImages.map(({ path, id }) => {
              return (
                <pattern
                  id={id}
                  key={id}
                  patternUnits="userSpaceOnUse"
                  width={width}
                  height={height}
                >
                  <image href={path} height={height} width={width} />
                </pattern>
              );
            })}
          </defs>
          {hexRect.map(({ x, y }) => {
            const config = gridConfig[`${x}-${y}`] || {};
            return (
              <Box
                as="polygon"
                fill="transparent"
                stroke={defaultStrokeColor}
                strokeWidth="0.5"
                points={cornersPath}
                _hover={{ fill: config.fill || hoverColor, opacity: 0.6 }}
                key={`${x}, ${y}`}
                transform={`translate(${x}px, ${y}px)`}
                {...config}
                cursor="pointer"
                // @ts-ignore
                onClick={(e) => {
                  // @ts-ignore
                  const box = e.target.getBoundingClientRect?.();
                  const boxCenter = (box.right + box.left) / 2;
                  const offset = 20;
                  const xMid = boxCenter - offset;
                  const yMid = box.top;
                  if (xMid === coords.x && yMid === coords.y) {
                    setControlsVisible((cur) => !cur);
                  } else if (!controlsVisible) {
                    setControlsVisible(true);
                  }
                  setCoords({ x: xMid, rawX: x, y: yMid, rawY: y });
                }}
              />
            );
          })}
        </Box>
      </Center>
      <AnimatePresence>
        {controlsVisible && (
          <>
            <motion.div
              variants={item}
              animate="visible"
              custom={0}
              initial={{ opacity: 0, x: coords.x, y: coords.y }}
              exit={{ opacity: 0, x: coords.x, y: coords.y }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            >
              <IconButton
                colorScheme="blue"
                borderRadius="full"
                className="control left-control"
                icon={<RiImageAddFill />}
                aria-label="Change space background"
                onClick={() =>
                  handleSetBackgroundClick({ x: coords.rawX, y: coords.rawY })
                }
              />
            </motion.div>
            <motion.div
              variants={item}
              animate="visible"
              custom={1}
              initial={{ opacity: 0, x: coords.x, y: coords.y }}
              exit={{ opacity: 0, x: coords.x, y: coords.y }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            >
              <IconButton
                colorScheme="blue"
                borderRadius="full"
                className="control center-control"
                icon={<RiStickyNoteLine />}
                aria-label="space notes"
                onClick={() =>
                  handleNotesClick({ x: coords.rawX, y: coords.rawY })
                }
              />
            </motion.div>
            <motion.div
              variants={item}
              animate="visible"
              custom={2}
              initial={{ opacity: 0, x: coords.x, y: coords.y }}
              exit={{ opacity: 0, x: coords.x, y: coords.y }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
              }}
            >
              <IconButton
                colorScheme="blue"
                borderRadius="full"
                className="control right-control"
                icon={<RiSettings3Line />}
                aria-label="space settings"
                onClick={() =>
                  handleSettingsClick({ x: coords.rawX, y: coords.rawY })
                }
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default HexGrid;
