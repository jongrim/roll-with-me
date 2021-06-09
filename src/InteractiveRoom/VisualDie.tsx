import * as React from 'react';
import {
  Box,
  Grid,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { BsTriangle, BsSquare, BsDiamond, BsOctagon } from 'react-icons/bs';
import { API } from 'aws-amplify';
import gsap, { Elastic } from 'gsap';
import { AnimationControls, motion, useAnimation } from 'framer-motion';
import { Draggable } from 'gsap/all';
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { VisualDie } from '../types';
import { LightDie } from '../TrophyShared/LightDiceDarkDice';

const Heptagon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M7.779.052a.5.5 0 0 1 .442 0l6.015 2.97a.5.5 0 0 1 .267.34l1.485 6.676a.5.5 0 0 1-.093.415l-4.162 5.354a.5.5 0 0 1-.395.193H4.662a.5.5 0 0 1-.395-.193L.105 10.453a.5.5 0 0 1-.093-.415l1.485-6.676a.5.5 0 0 1 .267-.34L7.779.053zM2.422 3.813l-1.383 6.212L4.907 15h6.186l3.868-4.975-1.383-6.212L8 1.058 2.422 3.813z" />
    </svg>
  );
};

const VDie: React.FC<{
  die: VisualDie;
  setActionInProgress: (val: boolean) => void;
  isSelected: boolean;
  selectDie: (die: {
    id: string;
    sides: number;
    version: number;
    type?: string;
  }) => void;
  updateActivity: () => void;
}> = ({ die, setActionInProgress, isSelected, selectDie, updateActivity }) => {
  const [trackedDie, setTrackedDie] = React.useState<VisualDie>(die);
  const el = React.useRef(null);

  React.useEffect(() => {
    Draggable.create(el.current, {
      allowEventDefault: true,
      type: 'x,y',
      bounds: document.getElementById('dice-box'),
      onClick: function () {
        selectDie({
          id: trackedDie.id,
          sides: trackedDie.sides,
          version: trackedDie.version,
          type: trackedDie.type,
        });
      },
      onDragEnd: async function () {
        setActionInProgress(true);
        try {
          await API.graphql({
            query: mutations.updateVisualDie,
            variables: {
              input: {
                x: this.endX,
                y: this.endY,
                id: trackedDie.id,
              },
            },
          });
        } catch (e) {
          console.warn(e);
        } finally {
          setActionInProgress(false);
        }
      },
    });
  }, [
    trackedDie.id,
    trackedDie.sides,
    trackedDie.version,
    trackedDie.type,
    setActionInProgress,
    selectDie,
  ]);

  React.useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.onUpdateVisualDieById,
      variables: {
        id: trackedDie.id,
      },
      // @ts-ignore
    }).subscribe({
      // @ts-ignore
      next: ({ value }) => {
        gsap.to(el.current, {
          x: value.data?.onUpdateVisualDieById?.x,
          y: value.data?.onUpdateVisualDieById?.y,
          duration: 0.25,
          ease: Elastic.easeOut.config(1, 1),
        });
        setTrackedDie((cur) => ({
          ...cur,
          result: value.data?.onUpdateVisualDieById?.result,
          version: value.data?.onUpdateVisualDieById?.version,
        }));
        setActionInProgress(false);
      },
    });
    return () => subscription.unsubscribe();
  }, [trackedDie.id, setActionInProgress]);

  React.useEffect(() => {
    gsap.to(el.current, {
      x: trackedDie.x,
      y: trackedDie.y,
      duration: 0.5,
      ease: Elastic.easeOut.config(1, 1),
    });
  }, [trackedDie.x, trackedDie.y]);

  const controls = useAnimation();
  React.useEffect(() => {
    controls.start({
      rotateX: 360,
      transition: {
        from: 0,
        duration: 0.75,
      },
    });
  }, [trackedDie.version, controls]);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const boxShadow = 'lg';
  const buttonHighlight = {
    border: '3px solid',
    borderColor: trackedDie.color,
    bgColor,
    boxShadow,
  };

  if (trackedDie.type === 'fudge') {
    return (
      <FudgeDie
        ref={el}
        trackedDie={trackedDie}
        controls={controls}
        buttonHighlight={buttonHighlight}
        isSelected={isSelected}
      />
    );
  }

  switch (trackedDie.sides) {
    case 4:
      return (
        <Box ref={el} position="absolute">
          <HStack>
            <Grid
              area="1 / 1"
              width="72px"
              height="72px"
              placeItems="center"
              borderRadius="md"
            >
              <Box gridArea="1 / 1">
                <motion.div animate={controls}>
                  <IconButton
                    {...(isSelected ? buttonHighlight : {})}
                    p={3}
                    aria-label={`${trackedDie.sides} sided die`}
                    onClick={() => {}}
                    variant="ghost"
                    color={trackedDie.color}
                    width="72px"
                    height="72px"
                    icon={
                      <Icon p={3} width="72px" height="72px" as={BsTriangle} />
                    }
                    gridArea="1 / 1"
                  />
                </motion.div>
              </Box>
              <Text gridArea="1 / 1" zIndex={2} _hover={{ cursor: 'pointer' }}>
                {trackedDie.result}
              </Text>
            </Grid>
          </HStack>
        </Box>
      );
    case 6:
      return (
        <Box
          id={trackedDie.id}
          ref={el}
          display="inline-block"
          position="absolute"
        >
          <HStack>
            <Grid
              area="1 / 1"
              width="72px"
              height="72px"
              placeItems="center"
              borderRadius="md"
            >
              <Box gridArea="1 / 1">
                <motion.div animate={controls}>
                  <IconButton
                    {...(isSelected ? buttonHighlight : {})}
                    role="button"
                    p={3}
                    aria-label={`${trackedDie.sides} sided die`}
                    onClick={() => {}}
                    variant="ghost"
                    color={trackedDie.color}
                    width="72px"
                    height="72px"
                    icon={
                      trackedDie.type === 'd6Pip' ? (
                        <LightDie
                          result={trackedDie.result?.toString() || ''}
                        />
                      ) : (
                        <Icon p={3} width="72px" height="72px" as={BsSquare} />
                      )
                    }
                  />
                </motion.div>
              </Box>
              {trackedDie.type !== 'd6Pip' && (
                <Text
                  gridArea="1 / 1"
                  zIndex={2}
                  _hover={{ cursor: 'pointer' }}
                >
                  {trackedDie.result}
                </Text>
              )}
            </Grid>
          </HStack>
        </Box>
      );
    case 8:
      return (
        <Box
          id={trackedDie.id}
          ref={el}
          display="inline-block"
          position="absolute"
        >
          <HStack>
            <VStack>
              <Text fontSize="xs" textAlign="center">
                D8
              </Text>
              <Grid
                area="1 / 1"
                width="72px"
                height="72px"
                placeItems="center"
                borderRadius="md"
              >
                <Box gridArea="1 / 1">
                  <motion.div animate={controls}>
                    <IconButton
                      {...(isSelected ? buttonHighlight : {})}
                      p={3}
                      aria-label={`${trackedDie.sides} sided die`}
                      onClick={() => {}}
                      variant="ghost"
                      color={trackedDie.color}
                      width="72px"
                      height="72px"
                      icon={
                        <Icon p={3} width="72px" height="72px" as={BsDiamond} />
                      }
                      gridArea="1 / 1"
                    />
                  </motion.div>
                </Box>
                <Text
                  gridArea="1 / 1"
                  zIndex={2}
                  _hover={{ cursor: 'pointer' }}
                >
                  {trackedDie.result}
                </Text>
              </Grid>
            </VStack>
          </HStack>
        </Box>
      );
    case 10:
      return (
        <Box
          id={trackedDie.id}
          ref={el}
          display="inline-block"
          position="absolute"
        >
          <HStack>
            <VStack>
              <Text fontSize="xs" textAlign="center">
                D10
              </Text>
              <Grid
                area="1 / 1"
                width="72px"
                height="72px"
                placeItems="center"
                borderRadius="md"
              >
                <Box gridArea="1 / 1">
                  <motion.div animate={controls}>
                    <IconButton
                      {...(isSelected ? buttonHighlight : {})}
                      p={3}
                      aria-label={`${trackedDie.sides} sided die`}
                      onClick={() => {}}
                      variant="ghost"
                      color={trackedDie.color}
                      width="72px"
                      height="72px"
                      icon={
                        <Icon p={3} width="72px" height="72px" as={BsDiamond} />
                      }
                      gridArea="1 / 1"
                    />
                  </motion.div>
                </Box>
                <Text
                  gridArea="1 / 1"
                  zIndex={2}
                  _hover={{ cursor: 'pointer' }}
                >
                  {trackedDie.result}
                </Text>
              </Grid>
            </VStack>
          </HStack>
        </Box>
      );
    case 12:
      return (
        <Box
          id={trackedDie.id}
          ref={el}
          display="inline-block"
          position="absolute"
        >
          <HStack>
            <VStack>
              <Grid
                area="1 / 1"
                width="72px"
                height="72px"
                placeItems="center"
                borderRadius="md"
              >
                <Box gridArea="1 / 1">
                  <motion.div animate={controls}>
                    <IconButton
                      {...(isSelected ? buttonHighlight : {})}
                      p={3}
                      aria-label={`${trackedDie.sides} sided die`}
                      onClick={() => {}}
                      variant="ghost"
                      color={trackedDie.color}
                      width="72px"
                      height="72px"
                      gridArea="1 / 1"
                      icon={
                        <Icon
                          viewBox="0 0 16 16"
                          width="64px"
                          height="64px"
                          color={trackedDie.color}
                        >
                          <Heptagon />
                        </Icon>
                      }
                    />
                  </motion.div>
                </Box>
                <Text
                  gridArea="1 / 1"
                  zIndex={2}
                  _hover={{ cursor: 'pointer' }}
                >
                  {trackedDie.result}
                </Text>
              </Grid>
            </VStack>
          </HStack>
        </Box>
      );
    case 20:
      return (
        <Box
          id={trackedDie.id}
          ref={el}
          display="inline-block"
          position="absolute"
        >
          <HStack>
            <Grid
              area="1 / 1"
              width="72px"
              height="72px"
              placeItems="center"
              borderRadius="md"
            >
              <Box gridArea="1 / 1">
                <motion.div animate={controls}>
                  <IconButton
                    {...(isSelected ? buttonHighlight : {})}
                    p={3}
                    aria-label={`${trackedDie.sides} sided die`}
                    onClick={() => {}}
                    variant="ghost"
                    color={trackedDie.color}
                    width="72px"
                    height="72px"
                    icon={
                      <Icon p={3} width="72px" height="72px" as={BsOctagon} />
                    }
                    gridArea="1 / 1"
                  />
                </motion.div>
              </Box>
              <Text gridArea="1 / 1" zIndex={2} _hover={{ cursor: 'pointer' }}>
                {trackedDie.result}
              </Text>
            </Grid>
          </HStack>
        </Box>
      );
    default:
      return null;
  }
};

// const DieActions = ({
//   id,
//   isVisible,
//   sides,
//   setActionInProgress,
//   version,
//   updateActivity,
// }: {
//   id: string;
//   isVisible: boolean;
//   sides: number;
//   setActionInProgress: (val: boolean) => void;
//   version: number;
//   updateActivity: () => void;
// }) => {
//   const { getNumbers } = React.useContext(RandomNumbersContext);
//   const deleteDie = async () => {
//     setActionInProgress(true);
//     updateActivity();
//     try {
//       await API.graphql({
//         query: mutations.deleteVisualDie,
//         variables: {
//           input: {
//             id,
//           },
//         },
//       });
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       setActionInProgress(false);
//     }
//   };
//   const rerollDie = async () => {
//     setActionInProgress(true);
//     updateActivity();
//     const results = await getNumbers(1);
//     try {
//       const finalResult = (results[0] % sides) + 1;
//       API.graphql({
//         query: mutations.updateVisualDie,
//         variables: {
//           input: {
//             id,
//             result: finalResult || 0,
//             version: version + 1,
//           },
//         },
//       });
//     } catch (e) {
//       console.warn(e);
//     }
//   };
//   return (
//     <>
//       <ScaleFade unmountOnExit initialScale={0.9} in={isVisible}>
//         <HStack spacing={2} mt={4}>
//           <IconButton
//             variant="ghost"
//             icon={<RiRestartLine />}
//             size="sm"
//             aria-label="roll die"
//             onClick={rerollDie}
//           />
//           <IconButton
//             variant="ghost"
//             icon={<RiDeleteBin4Line />}
//             size="sm"
//             aria-label="delete die"
//             onClick={deleteDie}
//           />
//         </HStack>
//       </ScaleFade>
//     </>
//   );
// };

// const DieCreator: React.FC<{
//   createdBy: string;
//   sides: number | string;
//   isVisible: boolean;
// }> = ({ createdBy, sides, isVisible }) => {
//   return (
//     <ScaleFade unmountOnExit initialScale={0.9} in={isVisible}>
//       <VStack spacing={3} alignItems="start">
//         <HStack spacing={2}>
//           <Icon as={RiUser3Fill} w={3} h={3} opacity="0.8" />
//           <Text fontSize="sm" opacity="0.8">
//             {createdBy}
//           </Text>
//         </HStack>
//         <HStack spacing={2}>
//           <Icon as={RiSettings4Fill} w={3} h={3} opacity="0.8" />
//           <Text fontSize="sm" opacity="0.8">
//             {Number.isInteger(sides) ? `${sides} sided` : `${sides} die`}
//           </Text>
//         </HStack>
//       </VStack>
//     </ScaleFade>
//   );
// };

interface FudgeDieProps {
  trackedDie: VisualDie;
  isSelected: boolean;
  buttonHighlight: Record<string, unknown>;
  controls: AnimationControls;
}

const FudgeDie = React.forwardRef<HTMLDivElement, FudgeDieProps>(
  ({ trackedDie, isSelected, buttonHighlight, controls }, el) => {
    return (
      <Box
        id={trackedDie.id}
        ref={el}
        display="inline-block"
        position="absolute"
      >
        <HStack>
          <Grid
            area="1 / 1"
            width="72px"
            height="72px"
            placeItems="center"
            borderRadius="md"
          >
            <Box gridArea="1 / 1">
              <motion.div animate={controls}>
                <IconButton
                  {...(isSelected ? buttonHighlight : {})}
                  role="button"
                  p={3}
                  aria-label={`fudge die`}
                  onClick={() => {}}
                  variant="ghost"
                  color={trackedDie.color}
                  width="72px"
                  height="72px"
                  icon={<Icon p={3} width="72px" height="72px" as={BsSquare} />}
                />
              </motion.div>
            </Box>
            <Box gridArea="1 / 1" zIndex={2} _hover={{ cursor: 'pointer' }}>
              <FudgeDieResult result={trackedDie.result || 6} />
            </Box>
          </Grid>
        </HStack>
      </Box>
    );
  }
);

const FudgeDieResult: React.FC<{ result: number }> = ({ result }) => {
  switch (result) {
    case 1:
    case 2:
      return (
        <Text fontSize="3xl" fontWeight="600">
          +
        </Text>
      );
    case 3:
    case 4:
      return (
        <Text fontSize="2xl" fontWeight="600">
          —
        </Text>
      );
    default:
      return null;
  }
};

export default VDie;
