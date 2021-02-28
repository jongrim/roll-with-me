import * as React from 'react';
import {
  Button,
  DrawerHeader,
  DrawerBody,
  Stack,
  Text,
  Textarea,
  useToast,
  Link,
} from '@chakra-ui/react';
import { updateMapConfiguration } from './useMap';
import { HexSpaceConfig, ParsedHexMapModule } from './gridConfiguration';

interface MapNotesDrawerProps {
  clickedHex: HexSpaceConfig;
  updateClickedHex: (hex: HexSpaceConfig) => void;
  mapModule: ParsedHexMapModule;
  fontFamily?: string;
}

function MapNotesDrawer({
  clickedHex,
  updateClickedHex,
  mapModule,
  fontFamily,
}: MapNotesDrawerProps) {
  const [notes, setNotes] = React.useState('');
  const toast = useToast();
  return (
    <>
      <DrawerHeader fontFamily={fontFamily}>Space Notes</DrawerHeader>
      <DrawerBody fontFamily={fontFamily}>
        <Stack direction="column" spacing={3}>
          <Textarea
            id="space-notes"
            defaultValue={clickedHex.notes}
            onChange={({ target }) => setNotes(target.value)}
          />
          <Button
            onClick={() => {
              const nextHex = {
                ...clickedHex,
                notes,
              };
              updateClickedHex(nextHex);
              updateMapConfiguration({
                id: mapModule.id,
                gridConfiguration: {
                  ...mapModule.gridConfiguration,
                  [clickedHex?.position]: nextHex,
                },
              })
                .then(() => {
                  toast({
                    status: 'success',
                    title: 'Note Saved',
                    duration: 3000,
                  });
                })
                .catch(() => {
                  toast({
                    status: 'warning',
                    title: 'Unable to save note',
                    description: (
                      <Text>
                        Please try again. If the problem persists, please{' '}
                        <Link
                          href="/feedback"
                          isExternal
                          fontWeight="600"
                          textDecoration="underline"
                        >
                          report an issue
                        </Link>
                      </Text>
                    ),
                    duration: 5000,
                  });
                });
            }}
          >
            Save
          </Button>
        </Stack>
      </DrawerBody>
    </>
  );
}

export default MapNotesDrawer;
