import * as React from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';
import {
  useColorModeValue,
  Box,
  Icon,
  IconButton,
  Center,
  HStack,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import {
  RiImageAddFill,
  RiStickyNoteLine,
  RiSettings3Line,
  RiZoomOutLine,
  RiZoomInLine,
  RiArrowDropDownLine,
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowDropUpLine,
  RiFocus3Line,
} from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { makeViewBox, ViewBox } from './viewBox';
import {
  createEmptyHexSpaceConfig,
  GridConfig,
  HexSpaceConfig,
} from './gridConfiguration';

const defaultViewBox = makeViewBox({ x: 0, y: 0, width: 150, height: 100 });

interface GridContextI {
  viewBox: ViewBox;
  updateViewBox: (newViewBox: ViewBox) => void;
}
export const GridContext = React.createContext<GridContextI>({
  viewBox: defaultViewBox,
  updateViewBox: (newViewBox) => {},
});

interface HexGridProps {
  backgroundImages: { path: string; id: string }[];
  children: React.ReactElement;
  gridConfig: GridConfig;
  handleSetBackgroundClick: (hex: HexSpaceConfig) => void;
  handleNotesClick: (hex: HexSpaceConfig) => void;
  handleSettingsClick: (
    hex: HexSpaceConfig,
    cb: (newViewBox: ViewBox) => void
  ) => void;
}

const HexGrid = ({
  backgroundImages,
  children,
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
  const [viewBox, setViewBox] = React.useState<ViewBox>(defaultViewBox);
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
    <Box
      w="full"
      h="full"
      onClick={() => {
        if (controlsVisible) {
          setControlsVisible(false);
        }
      }}
    >
      <GridContext.Provider value={{ viewBox, updateViewBox: setViewBox }}>
        <Center>
          <HStack my={3} spacing={2}>
            <IconButton
              icon={<Icon as={RiArrowDropLeftLine} w={8} h={8} />}
              variant="ghost"
              rounded="lg"
              aria-label="pan left"
              onClick={() => setViewBox(viewBox.panLeft())}
            />
            <IconButton
              icon={<Icon as={RiArrowDropUpLine} w={8} h={8} />}
              variant="ghost"
              rounded="lg"
              aria-label="pan up"
              onClick={() => setViewBox(viewBox.panUp())}
            />
            <IconButton
              icon={<Icon as={RiArrowDropDownLine} w={8} h={8} />}
              variant="ghost"
              rounded="lg"
              aria-label="pan down"
              onClick={() => setViewBox(viewBox.panDown())}
            />
            <IconButton
              icon={<Icon as={RiArrowDropRightLine} w={8} h={8} />}
              variant="ghost"
              rounded="lg"
              aria-label="pan right"
              onClick={() => setViewBox(viewBox.panRight())}
            />
            <IconButton
              icon={<RiZoomInLine />}
              variant="ghost"
              rounded="lg"
              aria-label="zoom in"
              onClick={() => {
                setViewBox(viewBox.zoomIn());
              }}
            />
            <IconButton
              icon={<RiZoomOutLine />}
              variant="ghost"
              rounded="lg"
              aria-label="zoom out"
              onClick={() => setViewBox(viewBox.zoomOut())}
            />
            <Tooltip
              label="Reset zoom and center"
              aria-label="reset zoom and center"
            >
              <IconButton
                icon={<RiFocus3Line />}
                variant="ghost"
                rounded="lg"
                aria-label="reset zoom and center"
                onClick={() => {
                  setViewBox(
                    viewBox.centerOnPoint({
                      centerX: 75,
                      centerY: 50,
                      newWidth: 150,
                      newHeight: 100,
                    })
                  );
                }}
              />
            </Tooltip>
          </HStack>
        </Center>
        <Center>
          <motion.svg
            animate={{
              viewBox: viewBox.toString(),
            }}
            initial={{
              viewBox: '0 0 150 100',
            }}
            preserveAspectRatio="xMidYMid slice"
            style={{
              minHeight: '36rem',
              maxHeight: '80vh',
              border: '2px solid',
              borderColor: 'inherit',
              borderRadius: '12px',
            }}
            transition={{
              duration: 0.8,
            }}
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
                <SpaceWrapper notes={config.notes} key={`${x}, ${y}`}>
                  <Box
                    as="polygon"
                    fill={config.fill || 'transparent'}
                    stroke={defaultStrokeColor}
                    strokeWidth="0.5"
                    points={cornersPath}
                    _hover={{ fill: config.fill || hoverColor, opacity: 0.6 }}
                    transform={`translate(${x}px, ${y}px) rotate(${
                      config.rotation ?? 0
                    }deg)`}
                    transformOrigin="center"
                    style={{
                      transformBox: 'fill-box',
                    }}
                    cursor="pointer"
                    // @ts-ignore
                    onClick={(e) => {
                      e.stopPropagation();
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
                </SpaceWrapper>
              );
            })}
          </motion.svg>
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
                  onClick={() => {
                    const maybeHex =
                      gridConfig[`${coords.rawX}-${coords.rawY}`];
                    const hex =
                      maybeHex ||
                      createEmptyHexSpaceConfig({
                        x: coords.rawX,
                        y: coords.rawY,
                      });
                    if (!hex.x) {
                      hex.x = coords.rawX;
                      hex.y = coords.rawY;
                    }
                    handleSetBackgroundClick(hex);
                  }}
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
                  onClick={() => {
                    const maybeHex =
                      gridConfig[`${coords.rawX}-${coords.rawY}`];
                    const hex =
                      maybeHex ||
                      createEmptyHexSpaceConfig({
                        x: coords.rawX,
                        y: coords.rawY,
                      });
                    if (!hex.x) {
                      hex.x = coords.rawX;
                      hex.y = coords.rawY;
                    }
                    handleNotesClick(hex);
                  }}
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
                  onClick={() => {
                    const maybeHex =
                      gridConfig[`${coords.rawX}-${coords.rawY}`];
                    const hex =
                      maybeHex ||
                      createEmptyHexSpaceConfig({
                        x: coords.rawX,
                        y: coords.rawY,
                      });
                    if (!hex.x) {
                      hex.x = coords.rawX;
                      hex.y = coords.rawY;
                    }
                    handleSettingsClick(hex, setViewBox);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {children}
      </GridContext.Provider>
    </Box>
  );
};

function SpaceWrapper({
  notes,
  children,
}: {
  notes?: string;
  children: React.ReactNode;
}) {
  if (notes) {
    return (
      <Tooltip label={<Text whiteSpace="pre-wrap">{notes}</Text>}>
        {children}
      </Tooltip>
    );
  }
  return <>{children}</>;
}

export default HexGrid;
