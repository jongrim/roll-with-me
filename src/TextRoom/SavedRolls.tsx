import * as React from 'react';
import {
  Box,
  Link,
  Text,
  useColorMode,
  Button,
  Stat,
  StatNumber,
  Flex,
  StatHelpText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  RiArrowDropDownLine,
  RiCloudOffLine,
  RiCloudy2Line,
} from 'react-icons/ri';
import { AuthContext } from '../AuthProvider';
import { SavedRoll } from '../types';
import { createEmptySavedRoll, describeRoll } from '../utils/rolls';
import EditRollModal from './EditRollModal';
import DeleteRollDialog from './DeleteRollModal';
import { CustomDie } from '../utils/dice';

interface SavedRollsProps {
  savedRolls: SavedRoll[];
  createRoll: (roll: SavedRoll) => void;
  deleteRoll: (roll: SavedRoll) => void;
  editRoll: (roll: SavedRoll) => void;
  rollSavedRoll: (roll: SavedRoll) => void;
  savedCustomDice: CustomDie[];
  roomId: string;
}

const SavedRolls: React.FC<SavedRollsProps> = ({
  createRoll,
  deleteRoll,
  editRoll,
  savedRolls,
  rollSavedRoll,
  savedCustomDice,
  roomId,
}) => {
  const { user } = React.useContext(AuthContext);
  const { colorMode } = useColorMode();

  const [isNewRoll, setIsNewRoll] = React.useState(false);
  const [rollToEdit, setRollToEdit] = React.useState<SavedRoll | undefined>();
  const cleanUpModal = () => {
    setRollToEdit(undefined);
    setIsNewRoll(false);
  };

  const [rollToDelete, setRollToDelete] = React.useState<
    SavedRoll | undefined
  >();
  return (
    <Box>
      {!user && (
        <Text mb={6} mt={2}>
          <Link
            isExternal
            href="/sign-in"
            color={colorMode === 'dark' ? 'brand.200' : 'brand.600'}
          >
            Sign up or log in
          </Link>{' '}
          to save rolls to your account
        </Text>
      )}
      {savedRolls.length > 0 && <Text fontSize="sm">Click name to roll</Text>}
      <Box my={2} p={2}>
        {savedRolls.length > 0
          ? savedRolls.map((roll) => {
              return (
                <Flex key={roll.id} mb={3}>
                  <Stat>
                    <Button
                      variant="ghost"
                      onClick={() => rollSavedRoll(roll)}
                      rightIcon={
                        roll.offline ? <RiCloudOffLine /> : <RiCloudy2Line />
                      }
                    >
                      <StatNumber>{roll.rollName}</StatNumber>
                    </Button>
                    <StatHelpText>{describeRoll(roll)}</StatHelpText>
                  </Stat>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<RiArrowDropDownLine />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={(e) => setRollToEdit(roll)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => setRollToDelete(roll)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              );
            })
          : null}
      </Box>
      <Button
        variant="ghost"
        onClick={() => {
          setIsNewRoll(true);
          setRollToEdit(createEmptySavedRoll());
        }}
      >
        {user ? 'Create a new roll' : 'Create a new offline roll'}
      </Button>
      <EditRollModal
        savedRoll={rollToEdit}
        savedCustomDice={savedCustomDice}
        onSubmit={(roll) => {
          if (isNewRoll) {
            createRoll(roll);
          } else {
            editRoll(roll);
          }
          cleanUpModal();
        }}
        onCancel={cleanUpModal}
        roomId={roomId}
      />
      <DeleteRollDialog
        isOpen={Boolean(rollToDelete)}
        onClose={() => setRollToDelete(undefined)}
        submitDelete={() => {
          if (rollToDelete) deleteRoll(rollToDelete);
          setRollToDelete(undefined);
        }}
      />
    </Box>
  );
};

export default SavedRolls;
