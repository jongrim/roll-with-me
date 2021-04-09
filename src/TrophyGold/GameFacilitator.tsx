import * as React from 'react';
import {
  Button,
  Box,
  Text,
  Spinner,
  Flex,
  Heading,
  Spacer,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { API, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import QuillEditor from '../QuillEditor/QuillEditor';
import { AuthContext } from '../AuthProvider';
import Bestiary from './Bestiary';
import { TrophyGoldBeast } from '../API';
import SpinningCube from '../SpinningCube/SpinningCube';
import { RawTrophyGoldCharacter } from '../APITypes';
import { updateCharacter } from './Character';

async function createGMModule(gameID: string) {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: mutations.createTrophyGoldGmModule,
      variables: {
        input: {
          gameID,
        },
      },
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });

    return data?.createTrophyGoldGMModule;
  } catch (e) {
    console.warn(e);
  }
}

async function updateGMModule(id: string, notes: string) {
  try {
    // @ts-ignore
    await API.graphql({
      query: mutations.updateTrophyGoldGmModule,
      variables: {
        input: {
          id,
          notes,
        },
      },
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
  } catch (e) {
    console.warn(e);
  }
}

async function getGMModule(gameID: string) {
  try {
    // @ts-ignore
    const { data } = await API.graphql({
      query: queries.goldGmByGameId,
      variables: {
        gameID,
      },
      // @ts-ignore
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
    return data?.goldGMByGameID?.items[0];
  } catch (e) {
    console.warn(e);
  }
}

interface GameFacilitatorProps {
  characters: RawTrophyGoldCharacter[];
  gameID: string;
}

export default function GameFacilitator({
  gameID,
  characters,
}: GameFacilitatorProps) {
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [moduleData, setModuleData] = React.useState<{
    id: string;
    bestiary: { items: TrophyGoldBeast[] };
    notes: string | null;
  }>();

  React.useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getGMModule(gameID)
      .then((data) => {
        setModuleData(data);
      })
      .finally(() => setLoading(false));
  }, [gameID, user]);

  async function updateNotes(val: string) {
    if (!moduleData?.id) return;
    setIsSaving(true);
    await updateGMModule(moduleData.id, val);
    setIsSaving(false);
  }

  if (loading) return <Spinner />;

  return (
    <Box>
      <Box>
        <Heading as="h2" fontFamily="Roboto Slab">
          Characters
        </Heading>
        <Text borderBottom="1px solid" borderColor="inherit">
          Hide characters from view
        </Text>
        <VStack spacing={3} alignItems="stretch" mt={3}>
          {characters.map((c) => (
            <Flex key={c.id}>
              <Text>
                {c.characterName} – {c.playerName}
              </Text>
              <Spacer />
              <Button
                colorScheme="teal"
                mr={2}
                onClick={async () => {
                  setIsSaving(true);
                  await updateCharacter({
                    id: c.id,
                    hidden: c.hidden ? false : true,
                  });
                  setIsSaving(false);
                }}
              >
                {c.hidden ? 'Show' : 'Hide'}
              </Button>
              {/* <Button colorScheme="red" variant="outline">
                Delete
              </Button> */}
            </Flex>
          ))}
        </VStack>
      </Box>
      <Divider my={3} />
      {!moduleData && (
        <Box>
          <Flex direction="column" alignItems="center">
            <Text>
              Create a private area for tracking notes, beasts, and rollable
              tables.
            </Text>
            {user ? (
              <Button
                mt={3}
                w="md"
                colorScheme="orange"
                variant="outline"
                onClick={() => {
                  createGMModule(gameID).then((data: any) =>
                    setModuleData(data)
                  );
                }}
              >
                Create
              </Button>
            ) : (
              <>
                <Text mt={3}>
                  {' '}
                  This feature requires a Roll With Me account.
                </Text>
                <Button
                  mt={1}
                  onClick={() =>
                    // @ts-ignore
                    Auth.federatedSignIn({
                      customState: `return=${window.location.pathname}`,
                    })
                  }
                  colorScheme="brand"
                >
                  Sign In or Create an Account
                </Button>
              </>
            )}
          </Flex>
        </Box>
      )}
      {moduleData && (
        <Box>
          <QuillEditor
            save={updateNotes}
            initial={moduleData.notes}
            saveDelay={1500}
          />
          <Bestiary
            beasts={moduleData.bestiary.items}
            gameID={{ gmModuleID: moduleData.id }}
            onCreate={(beast) => {
              console.log(beast);
              setModuleData({
                ...moduleData,
                bestiary: { items: [...moduleData.bestiary.items, beast] },
              });
            }}
          />
        </Box>
      )}
      {isSaving && <SpinningCube />}
    </Box>
  );
}
