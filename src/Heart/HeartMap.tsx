import * as React from 'react';
import HexGrid from '../MapModule/HexGrid';
import MapDrawer from '../MapModule/MapDrawer';
import {
  createEmptyHexSpaceConfig,
  HexSpaceConfig,
  ParsedHexMapModule,
} from '../MapModule/gridConfiguration';
import MapNotesDrawer from '../MapModule/MapNotesDrawer';
import MapSpaceSettingsDrawer from '../MapModule/MapSpaceSettingsDrawer';
import MapSpaceBackgroundDrawer from '../MapModule/MapSpaceBackgroundDrawer';
import { ViewBox } from '../MapModule/viewBox';

interface HeartMapProps {
  hexMap: ParsedHexMapModule;
}

const HeartMap = ({ hexMap }: HeartMapProps) => {
  const [drawerMode, setDrawerMode] = React.useState<
    'closed' | 'background' | 'notes' | 'settings'
  >('closed');
  const [clickedHex, setClickedHex] = React.useState<HexSpaceConfig>(
    createEmptyHexSpaceConfig({ x: 0, y: 0 })
  );

  const handleSetBackgroundClick = (hex: HexSpaceConfig) => {
    setClickedHex(hex);
    setDrawerMode('background');
  };
  const handleNotesClick = (hex: HexSpaceConfig) => {
    setClickedHex(hex);
    setDrawerMode('notes');
  };
  const handleSettingsClick = (
    hex: HexSpaceConfig,
    cb: (newViewBox: ViewBox) => void
  ) => {
    setClickedHex(hex);
    setDrawerMode('settings');
  };
  return (
    <>
      <HexGrid
        backgroundImages={hexMap.backgroundImages}
        gridConfig={hexMap.gridConfiguration}
        handleSetBackgroundClick={handleSetBackgroundClick}
        handleNotesClick={handleNotesClick}
        handleSettingsClick={handleSettingsClick}
      >
        <MapDrawer
          isOpen={drawerMode !== 'closed'}
          onClose={() => {
            setDrawerMode('closed');
          }}
        >
          {drawerMode === 'background' && (
            <MapSpaceBackgroundDrawer
              fontFamily="Roboto Slab"
              backgroundImages={hexMap.backgroundImages}
              clickedHex={clickedHex}
              updateClickedHex={setClickedHex}
              mapModule={hexMap}
            />
          )}
          {drawerMode === 'notes' && (
            <MapNotesDrawer
              fontFamily="Roboto Slab"
              clickedHex={clickedHex}
              updateClickedHex={setClickedHex}
              mapModule={hexMap}
            />
          )}
          {drawerMode === 'settings' && (
            <MapSpaceSettingsDrawer
              clickedHex={clickedHex}
              updateClickedHex={setClickedHex}
              mapModule={hexMap}
              fontFamily="Roboto Slab"
            />
          )}
        </MapDrawer>
      </HexGrid>
    </>
  );
};

export default HeartMap;
