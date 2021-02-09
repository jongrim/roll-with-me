import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RoomRadioCard from './RoomRadioCard';
import {
  useRadioGroup,
  HStack,
  Container,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import capitalize from 'lodash.capitalize';
import { RiArrowRightLine } from 'react-icons/ri';
import { handleNewRoomRequest } from './handleNewRoomRequest';
import getNewRoomNames from '../functions/randomNames';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface RoomTypeState {
  roomShortCode: 'r' | 'i';
}

const getRoomShortCode = (type: string) => {
  switch (type) {
    case 'Text':
      return 'r';
    case 'Visual':
      return 'i';
    default:
      return 'r';
  }
};

type roomTypeReducerEvent = { payload: 'Text' | 'Visual' | string };

const roomTypeReducer = (
  state: RoomTypeState,
  event: roomTypeReducerEvent
): RoomTypeState => {
  switch (event.payload) {
    case 'Text':
      return {
        roomShortCode: 'r',
      };
    case 'Visual':
      return {
        roomShortCode: 'i',
      };
  }
  return state;
};

const NewRoom: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const showNotFound = query.get('notFound') ?? false;
  const options = ['Text', 'Visual'];
  const inputEl = React.useRef<HTMLInputElement>(null);

  const [name, setName] = React.useState(query.get('name') ?? '');
  const [starterNames, setStarterNames] = React.useState<string[]>([]);
  React.useEffect(() => {
    async function starterName() {
      const result = await getNewRoomNames(6);
      setStarterNames(result);
      if (!name) {
        setName(result[0]);
      }
    }
    starterName();
  }, [name]);

  const [{ roomShortCode }, dispatch] = React.useReducer(roomTypeReducer, {
    roomShortCode: getRoomShortCode(query.get('type') ?? 'Text'),
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'room type',
    defaultValue: capitalize(query.get('type') ?? 'Text'),
    onChange: (nextValue) => dispatch({ payload: nextValue as string }),
  });

  const group = getRootProps();

  return (
    <Container maxW="4xl" h="full">
      <Center flexDirection="column" mt={12}>
        <Heading as="h1" size="md">
          {showNotFound
            ? "That room doesn't exist... yet"
            : 'Create a new room'}
        </Heading>
        <Text mt={6}>Room type</Text>
        <HStack {...group} mt={4}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RoomRadioCard key={value} {...radio}>
                {value}
              </RoomRadioCard>
            );
          })}
        </HStack>
        <Text mt={14}>Name it something fun?</Text>
        <Grid
          mt={4}
          templateColumns={['1fr', '360px 1fr', '540px, 1fr', '680px 1fr']}
          gap={4}
        >
          <GridItem>
            <Input
              variant="flushed"
              pl={2}
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder="Loading..."
              ref={inputEl}
              data-testid="room-name"
            />
            <VStack spacing={4} mt={4}>
              {starterNames.slice(1).map((cur) => (
                <Button
                  variant="ghost"
                  pl={2}
                  key={cur}
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => {
                    setName(cur);
                    inputEl?.current?.focus();
                  }}
                  isActive={name === cur}
                >
                  <Text isTruncated>{cur}</Text>
                </Button>
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            <Button
              rightIcon={<RiArrowRightLine />}
              colorScheme="brand"
              variant="outline"
              onClick={() => {
                handleNewRoomRequest(roomShortCode, name).then(() => {
                  history.push(`/${roomShortCode}/${name}`);
                });
              }}
            >
              Go
            </Button>
          </GridItem>
        </Grid>
      </Center>
    </Container>
  );
};

export default NewRoom;
