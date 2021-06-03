import * as React from 'react';
import { Box, Button, DrawerHeader, DrawerBody, Text } from '@chakra-ui/react';
import { updateMapConfiguration } from './useMap';
import { HexSpaceConfig, ParsedHexMapModule } from './gridConfiguration';
import { ViewBox } from './viewBox';

interface MapSpaceSettingsDrawerProps {
  clickedHex: HexSpaceConfig;
  updateClickedHex: (hex: HexSpaceConfig) => void;
  mapModule: ParsedHexMapModule;
  fontFamily?: string;
  gridControl?: (newViewBox: ViewBox) => void;
}

function MapSpaceSettingsDrawer({
  clickedHex,
  updateClickedHex,
  mapModule,
  fontFamily,
  gridControl,
}: MapSpaceSettingsDrawerProps) {
  const [doubleConfirmVisible, setDoubleConfirmVisible] = React.useState(false);
  return (
    <>
      <DrawerHeader fontFamily={fontFamily}>Space Settings</DrawerHeader>
      <DrawerBody fontFamily={fontFamily}>
        <Text color="red.400" fontWeight="600" fontSize="lg">
          Danger Zone
        </Text>
        <Button
          w="full"
          mt={8}
          onClick={() => {
            setDoubleConfirmVisible(true);
          }}
        >
          Reset Everything
        </Button>
        {doubleConfirmVisible && (
          <Box mt={6}>
            <Text mb={3}>
              This will clear all backgrounds, notes, and added background
              images. Are you sure you want to proceed?
            </Text>
            <Button
              colorScheme="red"
              mr={2}
              onClick={() => {
                updateMapConfiguration({
                  id: mapModule.id,
                  gridConfiguration: {},
                });
              }}
            >
              Clear Grid
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDoubleConfirmVisible(false)}
            >
              Cancel
            </Button>
          </Box>
        )}
      </DrawerBody>
    </>
  );
}

export default MapSpaceSettingsDrawer;
