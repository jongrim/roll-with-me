import * as React from 'react';
import {
  Button,
  DrawerHeader,
  DrawerBody,
  Stack,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import { updateMapConfiguration } from './useMap';
import { HexSpaceConfig, ParsedHexMapModule } from './gridConfiguration';
import QuillEditor from '../Common/QuillEditor/QuillEditor';

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
          <QuillEditor
            initial={clickedHex.notes}
            save={(val) => setNotes(val)}
            height="lg"
            editorId="space-notes"
            saveDelay={0}
            placeholder="Create notes about this space. Be careful with pasting content as it may paste color values that
            can make the text tough to read for light or dark backgrounds. Paste
            without formatting or add a color background using the toolbar."
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
