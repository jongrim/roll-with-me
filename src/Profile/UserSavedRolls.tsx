import * as React from 'react';
import {
  Stat,
  StatNumber,
  StatHelpText,
  Button,
  Text,
  useColorMode,
  Grid,
  GridItem,
  Spinner,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { SavedRoll } from '../types';
import { RiDeleteBin4Line, RiPencilLine } from 'react-icons/ri';
import { describeRoll } from '../utils/rolls';
import EditRollModal from '../TextRoom/EditRollModal';
import DeleteRollDialog from '../TextRoom/DeleteRollModal';

const UserSavedRolls = () => {
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [savedRolls, setSavedRolls] = React.useState<SavedRoll[]>([]);
  const [rollToEdit, setRollToEdit] = React.useState<SavedRoll>();
  const [rollToDelete, setRollToDelete] = React.useState<SavedRoll>();
  const { colorMode } = useColorMode();
  const cleanUpModal = () => {
    setRollToEdit(undefined);
  };
  React.useEffect(() => {
    async function loadSavedRolls() {
      try {
        // @ts-ignore
        const { data } = await API.graphql({
          query: queries.listSavedRolls,
          // @ts-ignore
          authMode: 'AMAZON_COGNITO_USER_POOLS',
        });
        const rolls = data?.listSavedRolls?.items ?? [];
        setSavedRolls(
          rolls.map((roll: any) => {
            return {
              id: roll?.id || '',
              rollName: roll?.rollName || '',
              modifier: roll?.modifier || 0,
              dice: roll?.dice.map((r: string) => JSON.parse(r)) || [],
            };
          })
        );
      } catch (e) {
        console.warn(e);
      } finally {
        setFirstLoad(false);
      }
    }
    loadSavedRolls();
  }, []);

  async function updateRollInAmplify(roll: SavedRoll) {
    const rollToSave = {
      id: roll.id,
      rollName: roll.rollName,
      dice: roll.dice.map((d) => JSON.stringify(d)),
      modifier: roll.modifier,
    };
    try {
      // @ts-ignore
      const { data } = await API.graphql({
        query: mutations.updateSavedRoll,
        variables: {
          input: rollToSave,
        },
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      const createdRoll = data?.updateSavedRoll;
      setSavedRolls((cur) =>
        cur
          .filter((roll) => roll.id !== createdRoll.id)
          .concat({
            id: createdRoll.id,
            rollName: createdRoll.rollName,
            modifier: createdRoll.modifier,
            dice: createdRoll.dice.map((d: string) => JSON.parse(d)),
          })
      );
    } catch (e) {
      console.warn(e);
    }
  }

  async function deleteRollInAmplify(roll: SavedRoll) {
    try {
      await API.graphql({
        query: mutations.deleteSavedRoll,
        variables: {
          input: {
            id: roll.id,
          },
        },
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      setSavedRolls((cur) => cur.filter((r) => r.id !== roll.id));
    } catch (e) {
      console.warn(e);
    }
  }

  const itemBorder =
    colorMode === 'dark'
      ? { borderColor: 'inherit' }
      : { boxShadow: 'md', borderColor: 'gray.50' };

  return (
    <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gap={6}>
      <GridItem colSpan={[1, 2, 3]}>
        <Heading size="md" as="h1">
          Cloud Saved Rolls
        </Heading>
      </GridItem>
      {firstLoad && <Spinner />}
      {savedRolls.length > 0 &&
        savedRolls.map((roll) => {
          return (
            <GridItem
              rounded="lg"
              border="1px solid"
              {...itemBorder}
              px={4}
              py={3}
              key={roll.id}
            >
              <Stat>
                <StatNumber>{roll.rollName}</StatNumber>
                <StatHelpText>{describeRoll(roll)}</StatHelpText>
              </Stat>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  leftIcon={<RiPencilLine />}
                  onClick={(e) => setRollToEdit(roll)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  leftIcon={<RiDeleteBin4Line />}
                  onClick={() => setRollToDelete(roll)}
                >
                  Delete
                </Button>
              </HStack>
            </GridItem>
          );
        })}
      {!firstLoad && savedRolls.length === 0 && (
        <Text>You don't have any saved rolls</Text>
      )}
      <EditRollModal
        savedRoll={rollToEdit}
        onSubmit={(roll) => {
          updateRollInAmplify(roll);
          cleanUpModal();
        }}
        onCancel={cleanUpModal}
      />
      <DeleteRollDialog
        isOpen={Boolean(rollToDelete)}
        onClose={() => setRollToDelete(undefined)}
        submitDelete={() => {
          if (rollToDelete) deleteRollInAmplify(rollToDelete);
          setRollToDelete(undefined);
        }}
      />
    </Grid>
  );
};

export default UserSavedRolls;
