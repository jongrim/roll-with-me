import * as React from 'react';
import {
  Button,
  Flex,
  Image,
  DrawerHeader,
  DrawerBody,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import HexGrid, { GridConfig } from '../MapModule/HexGrid';
import MapDrawer from '../MapModule/MapDrawer';

const heartBackgroundImages = [
  {
    path: `${process.env.PUBLIC_URL}/Delve 1.png`,
    id: 'delve-1',
    title: 'Delve 1',
    alt: 'Delve 1 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 2.png`,
    id: 'delve-2',
    title: 'Delve 2',
    alt: 'Delve 2 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 3.png`,
    id: 'delve-3',
    title: 'Delve 3',
    alt: 'Delve 3 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 4.png`,
    id: 'delve-4',
    title: 'Delve 4',
    alt: 'Delve 4 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 5.png`,
    id: 'delve-5',
    title: 'Delve 5',
    alt: 'Delve 5 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 6.png`,
    id: 'delve-6',
    title: 'Delve 6',
    alt: 'Delve 6 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Delve 7.png`,
    id: 'delve-7',
    title: 'Delve 7',
    alt: 'Delve 7 space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Cursed.png`,
    id: 'cursed',
    title: 'Cursed',
    alt: 'Cursed space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Desolate.png`,
    id: 'desolate',
    title: 'Desolate',
    alt: 'Desolate space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Haven.png`,
    id: 'haven',
    title: 'Haven',
    alt: 'Haven space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Occult.png`,
    id: 'occult',
    title: 'Occult',
    alt: 'Occult space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Religion.png`,
    id: 'religion',
    title: 'Religion',
    alt: 'Religion space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Technology.png`,
    id: 'technology',
    title: 'Technology',
    alt: 'Technology space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Warren.png`,
    id: 'warren',
    title: 'Warren',
    alt: 'Warren space',
  },
  {
    path: `${process.env.PUBLIC_URL}/Wild.png`,
    id: 'wild',
    title: 'Wild',
    alt: 'Wild space',
  },
];

const HeartMap = () => {
  // temporary to test out API
  const [gridConfig, setGridConfig] = React.useState<GridConfig>({});
  const [drawerMode, setDrawerMode] = React.useState<
    'closed' | 'background' | 'notes' | 'settings'
  >('closed');
  const [clickedHex, setClickedHex] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const handleSetBackgroundClick = ({ x, y }: { x: number; y: number }) => {
    setClickedHex({ x, y });
    setDrawerMode('background');
  };
  const handleNotesClick = ({ x, y }: { x: number; y: number }) => {
    setClickedHex({ x, y });
    setDrawerMode('notes');
  };
  const handleSettingsClick = ({ x, y }: { x: number; y: number }) => {
    setClickedHex({ x, y });
    setDrawerMode('settings');
  };
  const [notes, setNotes] = React.useState('');
  return (
    <>
      <HexGrid
        backgroundImages={heartBackgroundImages}
        gridConfig={gridConfig}
        setGridConfig={setGridConfig}
        handleSetBackgroundClick={handleSetBackgroundClick}
        handleNotesClick={handleNotesClick}
        handleSettingsClick={handleSettingsClick}
      />
      <MapDrawer
        isOpen={drawerMode !== 'closed'}
        onClose={() => setDrawerMode('closed')}
      >
        {drawerMode === 'background' && (
          <>
            <DrawerHeader>Set a background</DrawerHeader>
            <DrawerBody>
              <Stack direction="column" spacing={3}>
                {heartBackgroundImages.map((image) => {
                  return (
                    <Flex key={image.id} alignItems="center">
                      <Image
                        src={image.path}
                        alt="heart alt"
                        width={16}
                        rounded="lg"
                      />
                      <Text fontSize="lg" ml={3} flex="1">
                        {image.title}
                      </Text>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setGridConfig((cur) => ({
                            ...cur,
                            [`${clickedHex.x}-${clickedHex.y}`]: {
                              fill: `url(#${image.id})`,
                            },
                          }));
                        }}
                      >
                        Set
                      </Button>
                    </Flex>
                  );
                })}
              </Stack>
            </DrawerBody>
          </>
        )}
        {drawerMode === 'notes' && (
          <>
            <DrawerHeader>Space notes</DrawerHeader>
            <DrawerBody>
              <Stack direction="column" spacing={3}>
                <Textarea
                  id="space-notes"
                  defaultValue={
                    gridConfig[`${clickedHex.x}-${clickedHex.y}`]?.notes ?? ''
                  }
                  onChange={({ target }) => setNotes(target.value)}
                />
                <Button
                  onClick={() => {
                    setGridConfig((cur) => ({
                      ...cur,
                      [`${clickedHex.x}-${clickedHex.y}`]: {
                        notes,
                      },
                    }));
                  }}
                >
                  Save
                </Button>
              </Stack>
            </DrawerBody>
          </>
        )}
        {drawerMode === 'settings' && null}
      </MapDrawer>
    </>
  );
};

export default HeartMap;
