import * as React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Text,
  useColorModeValue,
  Button,
  Icon,
} from '@chakra-ui/react';
import { GiPentacle } from 'react-icons/gi';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrophyGoldCharacterInput } from '../API';
import CharacterSectionHeading from './CharacterSectionHeading';
import useDelayedUpdate from './useDelayedUpdate';

export function listToMap(list: string[]): Map<string, string> {
  const map = new Map();
  list.forEach((entry) => map.set(uuidv4(), entry));
  return map;
}

interface CharacterRitualsProps {
  characterId: string;
  rituals: string[];
  onSubmit: (val: Omit<UpdateTrophyGoldCharacterInput, 'id'>) => Promise<void>;
  canEdit: boolean;
}

type eventType =
  | { type: 'add' }
  | {
      type: 'edit';
      payload: {
        key: string;
        value: string;
      };
    }
  | {
      type: 'clean';
    }
  | { type: 'set'; payload: { nextState: State } };

interface State {
  map: Map<string, string>;
  state: 'dirty' | 'ready';
}

function reducer(state: State, action: eventType): State {
  switch (action.type) {
    case 'add':
      state.map.set(uuidv4(), '');
      return { map: new Map(state.map), state: 'ready' };
    case 'edit':
      state.map.set(action.payload.key, action.payload.value);
      return { map: new Map(state.map), state: 'dirty' };
    case 'clean':
      return { map: new Map(state.map), state: 'ready' };
    case 'set':
      return action.payload.nextState;
    default:
      return state;
  }
}

const initRituals = (initialRituals: string[]): State => {
  const ritualsMap = new Map();
  const [first = '', second = '', third = '', ...rest] = initialRituals;
  ritualsMap.set('first', first);
  ritualsMap.set('second', second);
  ritualsMap.set('third', third);
  const remaining = listToMap(rest);
  return { map: new Map([...ritualsMap, ...remaining]), state: 'ready' };
};

function CharacterRituals({
  rituals,
  onSubmit,
  canEdit,
}: CharacterRitualsProps) {
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const [{ map: trackedRituals, state }, dispatch] = React.useReducer(
    reducer,
    rituals,
    initRituals
  );

  const handleUpdate = React.useCallback(
    async (val) => {
      onSubmit(val);
      dispatch({ type: 'clean' });
    },
    [onSubmit]
  );
  const { delayedUpdate } = useDelayedUpdate(handleUpdate);

  React.useEffect(() => {
    if (!canEdit) {
      dispatch({ type: 'set', payload: { nextState: initRituals(rituals) } });
    }
  }, [rituals, canEdit]);

  React.useEffect(() => {
    if (canEdit && state === 'dirty') {
      delayedUpdate({ rituals: [...trackedRituals.values()] });
    }
  }, [trackedRituals, delayedUpdate, canEdit, state]);

  let items: React.ReactNode[] = [];
  trackedRituals.forEach((value, key) => {
    items.push(
      <InputGroup key={key} variant="flushed" borderColor={inputBorderColor}>
        {['first', 'second', 'third'].includes(key) && (
          <InputLeftAddon borderBottomWidth="1px">
            <Icon as={GiPentacle} />
          </InputLeftAddon>
        )}
        <Input
          pl={['first', 'second', 'third'].includes(key) ? 2 : 0}
          isReadOnly={!canEdit}
          value={value}
          onChange={({ target }) => {
            const nextVal = target.value;
            dispatch({
              type: 'edit',
              payload: { key, value: nextVal },
            });
          }}
        />
      </InputGroup>
    );
  });

  return (
    <Box>
      <CharacterSectionHeading>Rituals</CharacterSectionHeading>
      <Text fontStyle="italic">
        Starting rituals{' '}
        {<Icon as={GiPentacle} h={4} w={4} top="-2px" position="relative" />}{' '}
        increase base ruin by 1 each
      </Text>
      <VStack spacing={3}>{items}</VStack>
      {canEdit && (
        <Button
          onClick={() => dispatch({ type: 'add' })}
          mt={2}
          variant="ghost"
        >
          Add new ritual
        </Button>
      )}
    </Box>
  );
}

export default CharacterRituals;
