import * as React from 'react';
import {
  Box,
  Stat,
  StatNumber,
  StatHelpText,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  Grid,
  GridItem,
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { SavedRoll } from '../types';
import {
  RiArrowDropDownLine,
  RiCloudy2Line,
  RiDeleteBin4Line,
  RiPencilLine,
} from 'react-icons/ri';
import { describeRoll } from '../utils/rolls';
import EditRollModal from '../TextRoom/EditRollModal';
import DeleteRollDialog from '../TextRoom/DeleteRollModal';

const UserSavedRolls = () => {
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [isSavingRoll, setIsSavingRoll] = React.useState(false);
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
    setIsSavingRoll(true);
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
    } finally {
      setIsSavingRoll(false);
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
      ? { border: '1px solid', borderColor: 'inherit' }
      : { boxShadow: 'lg' };

  if (firstLoad) {
    return <Spinner />;
  }
  return (
    <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gap={6}>
      {savedRolls.length > 0 ? (
        savedRolls.map((roll) => {
          return (
            <GridItem rounded="lg" {...itemBorder} px={4} py={3} key={roll.id}>
              <Stat>
                <StatNumber>{roll.rollName}</StatNumber>
                <StatHelpText>{describeRoll(roll)}</StatHelpText>
              </Stat>
              <Flex>
                <Button
                  leftIcon={<RiPencilLine />}
                  onClick={(e) => setRollToEdit(roll)}
                  flex="1"
                  mr={1}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  leftIcon={<RiDeleteBin4Line />}
                  onClick={() => setRollToDelete(roll)}
                  flex="1"
                  ml={1}
                >
                  Delete
                </Button>
              </Flex>
            </GridItem>
          );
        })
      ) : (
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
