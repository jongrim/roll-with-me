import * as React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorMode,
  Link,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import { Link as ReactRouterLink } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { RiPencilLine } from 'react-icons/ri';
import { userRoom, UserRoomContext } from '../UserRoomProvider';
import * as mutations from '../graphql/mutations';

const ActiveRooms = () => {
  const { userRooms } = React.useContext(UserRoomContext);
  return (
    <Box>
      <Heading size="md" as="h1">
        Active Rooms
      </Heading>
      <Text mt={3}>Rooms you've been active in during the last 30 days</Text>
      <Grid mt={6} templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gap={6}>
        {userRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Grid>
    </Box>
  );
};

const RoomCard = ({ room }: { room: userRoom }) => {
  let roomType: string;
  switch (room.roomKey) {
    case 'textRoom':
      roomType = 'r';
      break;
    case 'interactiveRoom':
      roomType = 'i';
      break;
    case 'trophyDarkRoom':
      roomType = 'trophy-dark';
      break;
  }
  const { colorMode } = useColorMode();
  const itemBorder =
    colorMode === 'dark'
      ? { border: '1px solid', borderColor: 'inherit' }
      : { boxShadow: 'md' };
  const name = room[room.roomKey]?.name;
  return (
    <GridItem
      key={room.id}
      {...itemBorder}
      rounded="lg"
      py={3}
      px={4}
      _hover={{ boxShadow: 'lg' }}
    >
      <Text fontWeight="400" fontSize="xs" opacity="0.8">
        {roomType === 'r' && 'text dice'}
        {roomType === 'i' && 'visual dice'}
        {roomType === 'trophy-dark' && 'trophy dark room'}
      </Text>
      <Link as={ReactRouterLink} to={`/${roomType}/${name}`}>
        <Text fontWeight="600" fontSize="lg">
          {name}
        </Text>
      </Link>
      <Text mt={2} fontWeight="400" fontSize="sm" opacity="0.8">
        Last Active
      </Text>
      <Text fontWeight="400">
        {format(parseISO(room.updatedOn), 'LLL do, h:mm aaa')}
      </Text>
      <RoomDescription room={room} />
      <RoomUsername room={room} />
    </GridItem>
  );
};

const RoomDescription = ({ room }: { room: userRoom }) => {
  const [description, setDescription] = React.useState(room.description || '');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputEl = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Text fontSize="sm" opacity="0.8" mt={6}>
        Description
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          API.graphql({
            query: mutations.updateUserRoom,
            // @ts-ignore
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            variables: {
              input: {
                id: room.id,
                description,
              },
            },
            // @ts-ignore
          }).then(() => {
            setIsEditing(false);
            setIsSubmitting(false);
          });
        }}
      >
        <Input
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          variant="flushed"
          ref={inputEl}
          isReadOnly={!isEditing}
        />
        {isEditing ? (
          <HStack spacing={2} mt={2}>
            <Button
              type="submit"
              colorScheme="teal"
              size="sm"
              isLoading={isSubmitting}
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </HStack>
        ) : (
          <Button
            leftIcon={<RiPencilLine />}
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(true);
              inputEl?.current?.focus();
            }}
            mt={2}
          >
            Edit
          </Button>
        )}
      </form>
    </>
  );
};

const RoomUsername = ({ room }: { room: userRoom }) => {
  const [username, setUsername] = React.useState(
    room.defaultRoomUsername || ''
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputEl = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Text fontSize="sm" opacity="0.8" mt={6}>
        Room Username
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          API.graphql({
            query: mutations.updateUserRoom,
            // @ts-ignore
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            variables: {
              input: {
                id: room.id,
                defaultRoomUsername: username,
              },
            },
            // @ts-ignore
          }).then(() => {
            setIsEditing(false);
            setIsSubmitting(false);
          });
        }}
      >
        <Input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          variant="flushed"
          ref={inputEl}
          isReadOnly={!isEditing}
        />
        {isEditing ? (
          <HStack spacing={2} mt={2}>
            <Button
              type="submit"
              colorScheme="teal"
              size="sm"
              isLoading={isSubmitting}
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </HStack>
        ) : (
          <Button
            leftIcon={<RiPencilLine />}
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(true);
              inputEl?.current?.focus();
            }}
            mt={2}
          >
            Edit
          </Button>
        )}
      </form>
    </>
  );
};

export default ActiveRooms;
