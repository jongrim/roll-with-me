import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RoomRadioCard from './RoomRadioCard';
import {
  Box,
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
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';
import { motion, AnimateSharedLayout, useAnimation } from 'framer-motion';
import { handleNewRoomRequest } from './handleNewRoomRequest';
import getNewRoomNames from '../functions/randomNames';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface RoomTypeState {
  roomShortCode: 'r' | 'i' | 'trophy-dark';
}

const getRoomShortCode = (type: string) => {
  switch (type) {
    case 'Text':
      return 'r';
    case 'Visual':
      return 'i';
    case 'TrophyDark':
      return 'trophy-dark';
    default:
      return 'r';
  }
};

const getDefaultValueFromType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'text':
      return 'Text';
    case 'visual':
      return 'Visual';
    case 'trophydark':
      return 'Trophy Dark';
    default:
      return 'Text';
  }
};

type roomTypeReducerEvent = { payload: 'Text' | 'Visual' | 'Trophy Dark' };

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
    case 'Trophy Dark':
      return {
        roomShortCode: 'trophy-dark',
      };
  }
};

const NewRoom: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const showNotFound = query.get('notFound') ?? false;
  const options = ['Text', 'Visual', 'Trophy Dark'];
  const inputEl = React.useRef<HTMLInputElement>(null);

  const [name, setName] = React.useState(query.get('name') ?? '');
  const [namePlaceholder, setNamePlaceholder] = React.useState('Loading...');
  const [starterNames, setStarterNames] = React.useState<string[]>([]);
  React.useEffect(() => {
    async function starterName() {
      const result = await getNewRoomNames(6);
      setStarterNames(result);
      setNamePlaceholder('What should we call it?');
      if (!name) {
        setName(result[0]);
      }
    }
    if (starterNames.length === 0) {
      starterName();
    }
  }, [name, starterNames]);

  const [{ roomShortCode }, dispatch] = React.useReducer(roomTypeReducer, {
    roomShortCode: getRoomShortCode(query.get('type') ?? 'Text'),
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'room type',
    defaultValue: getDefaultValueFromType(query.get('type') ?? ''),
    onChange: (nextValue: 'Text' | 'Visual' | 'Trophy Dark') =>
      dispatch({ payload: nextValue }),
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
        <AnimateSharedLayout>
          <Text mt={14}>
            Name it something{' '}
            <Box as="span">
              <Terrifying visible={roomShortCode === 'trophy-dark'} />
              <Fun strike={roomShortCode === 'trophy-dark'} />
            </Box>
          </Text>
        </AnimateSharedLayout>
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
              placeholder={namePlaceholder}
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

const Terrifying = ({ visible }: { visible: boolean }) => {
  const controls = useAnimation();
  React.useEffect(() => {
    if (visible) {
      controls
        .start({
          width: 'auto',
          transition: {
            duration: 0.65,
            type: 'tween',
            ease: 'easeOut',
            delay: 1,
          },
        })
        .then(() => {
          controls.start({
            opacity: 1,
            transition: {
              duration: 0.5,
              type: 'tween',
              ease: 'easeOut',
            },
          });
        });
    } else {
      controls
        .start({
          opacity: 0,
          transition: { duration: 0.25, type: 'tween', ease: 'easeOut' },
        })
        .then(() => {
          controls.start({
            width: 0,
            transition: { duration: 0.25, type: 'tween', ease: 'easeOut' },
          });
        });
    }
  }, [visible, controls]);
  return (
    <motion.span
      layout
      initial={{ opacity: 0, width: '0px', display: 'inline-block' }}
      animate={controls}
    >
      <Box
        display="inline-block"
        fontFamily="Faith Collapsing"
        fontWeight="600"
        fontSize="1.25rem"
        transform="rotate(5deg)"
        mr={1}
      >
        terrifying?
      </Box>
    </motion.span>
  );
};

const Fun = ({ strike }: { strike: boolean }) => {
  const color = useColorModeValue('black', 'white');
  const controls = useAnimation();
  React.useEffect(() => {
    if (strike) {
      controls.start({
        width: '120%',
        transition: { duration: 1 },
      });
    } else {
      controls.start({
        width: 0,
        transition: {
          duration: 0.25,
          type: 'tween',
          ease: 'easeOut',
          delay: 1,
        },
      });
    }
  }, [strike, controls]);
  return (
    <motion.span layout>
      <Flex
        display="inline-block"
        alignItems="stretch"
        justifyContent="center"
        position="relative"
      >
        <motion.span
          initial={{
            width: 0,
            borderBottom: '2px groove',
            borderColor: color,
            position: 'absolute',
            top: '50%',
            left: '-2px',
            transform: 'rotate(-2deg)',
          }}
          animate={controls}
        />
        fun?
      </Flex>
    </motion.span>
  );
};

export default NewRoom;
