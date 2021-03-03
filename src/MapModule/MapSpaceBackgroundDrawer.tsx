import * as React from 'react';
import {
  Button,
  Image,
  DrawerHeader,
  DrawerBody,
  Text,
  VStack,
  Grid,
  Center,
  Divider,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { RiAnticlockwiseLine, RiClockwiseLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import { updateMapConfiguration } from './useMap';
import {
  BackgroundImage,
  HexSpaceConfig,
  ParsedHexMapModule,
} from './gridConfiguration';
import ImagePreviewHex from './ImagePreviewHex';

interface MapSpaceBackgroundDrawerProps {
  backgroundImages: BackgroundImage[];
  clickedHex: HexSpaceConfig;
  updateClickedHex: (hex: HexSpaceConfig) => void;
  mapModule: ParsedHexMapModule;
  fontFamily?: string;
}

function MapSpaceBackgroundDrawer({
  backgroundImages,
  clickedHex,
  updateClickedHex,
  mapModule,
  fontFamily,
}: MapSpaceBackgroundDrawerProps) {
  const [rotation, setRotation] = React.useState(clickedHex.rotation);
  const [newImage, setNewImage] = React.useState({
    id: uuidv4(),
    title: '',
    alt: '',
    path: '',
  });
  const [color, setColor] = React.useState(clickedHex.fill || '#ffffff');
  return (
    <>
      <DrawerHeader fontFamily={fontFamily}>Space Background</DrawerHeader>
      <DrawerBody fontFamily={fontFamily} pb={40}>
        <Center>
          <Button
            variant="ghost"
            aria-label="Rotate left"
            leftIcon={<RiAnticlockwiseLine />}
            onClick={() => {
              const nextRotation = rotation - 60;
              setRotation(nextRotation);
              const nextHex = {
                ...clickedHex,
                rotation: nextRotation,
              };
              updateClickedHex(nextHex);
              updateMapConfiguration({
                id: mapModule.id,
                gridConfiguration: {
                  ...mapModule.gridConfiguration,
                  [clickedHex?.position]: nextHex,
                },
              });
            }}
          >
            Rotate Left
          </Button>
          <Button
            variant="ghost"
            mx={2}
            onClick={() => {
              const nextHex = {
                ...clickedHex,
                fill: '',
              };
              updateClickedHex(nextHex);
              updateMapConfiguration({
                id: mapModule.id,
                gridConfiguration: {
                  ...mapModule.gridConfiguration,
                  [clickedHex?.position]: nextHex,
                },
              });
            }}
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            aria-label="Rotate right"
            rightIcon={<RiClockwiseLine />}
            onClick={() => {
              const nextRotation = rotation + 60;
              setRotation(nextRotation);
              const nextHex = {
                ...clickedHex,
                rotation: nextRotation,
              };
              updateClickedHex(nextHex);
              updateMapConfiguration({
                id: mapModule.id,
                gridConfiguration: {
                  ...mapModule.gridConfiguration,
                  [clickedHex?.position]: nextHex,
                },
              });
            }}
          >
            Rotate Right
          </Button>
        </Center>
        <Divider my={6} />
        <Grid templateColumns="1fr 1fr" gap={10}>
          {backgroundImages.map((image) => {
            return (
              <Button
                key={image.id}
                h="auto"
                py={3}
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  const nextHex = {
                    ...clickedHex,
                    fill: `url(#${image.id})`,
                  };
                  updateClickedHex(nextHex);
                  updateMapConfiguration({
                    id: mapModule.id,
                    gridConfiguration: {
                      ...mapModule.gridConfiguration,
                      [clickedHex?.position]: nextHex,
                    },
                  });
                }}
              >
                <VStack spacing={3}>
                  <Image
                    src={image.path}
                    alt={image.alt}
                    boxSize="100px"
                    transform={`rotate(${rotation}deg)`}
                    objectFit="contain"
                  />
                  <Text fontSize="md" flex="1">
                    {image.title}
                  </Text>
                </VStack>
              </Button>
            );
          })}
        </Grid>
        <Divider my={6} />
        <Text fontSize="lg" fontWeight="600" mb={4}>
          Add New Image
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nextHex = {
              ...clickedHex,
              fill: `url(#${newImage.id})`,
            };
            updateClickedHex(nextHex);
            updateMapConfiguration({
              id: mapModule.id,
              gridConfiguration: {
                ...mapModule.gridConfiguration,
                [clickedHex?.position]: nextHex,
              },
              backgroundImages: backgroundImages.concat(newImage),
            });
          }}
        >
          <FormControl id="url" isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              value={newImage.path}
              onChange={({ target }) =>
                setNewImage((cur) => ({ ...cur, path: target.value }))
              }
            />
          </FormControl>
          <FormControl id="label" isRequired mt={3}>
            <FormLabel>Image Title</FormLabel>
            <Input
              value={newImage.title}
              onChange={({ target }) =>
                setNewImage((cur) => ({ ...cur, title: target.value }))
              }
            />
          </FormControl>
          <FormControl id="alt-text" isRequired mt={3}>
            <FormLabel>Image Description</FormLabel>
            <Input
              value={newImage.alt}
              onChange={({ target }) =>
                setNewImage((cur) => ({ ...cur, alt: target.value }))
              }
            />
            <FormHelperText>Used as alt text</FormHelperText>
          </FormControl>
          <Text mt={3} fontWeight="500">
            Preview
          </Text>
          <Center>
            <ImagePreviewHex image={newImage} />
          </Center>
          <Button w="full" mt={3} type="submit">
            Save and Set
          </Button>
        </form>
        <Divider my={6} />
        <Text fontSize="lg" fontWeight="600">
          Fill Color
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const nextHex = {
              ...clickedHex,
              fill: color,
            };
            updateClickedHex(nextHex);
            updateMapConfiguration({
              id: mapModule.id,
              gridConfiguration: {
                ...mapModule.gridConfiguration,
                [clickedHex?.position]: nextHex,
              },
            });
          }}
        >
          <Input
            mt={2}
            type="color"
            value={color}
            onChange={({ target }) => setColor(target.value)}
          />
          <Button type="submit" mt={3} w="full">
            Set Fill Color
          </Button>
        </form>
      </DrawerBody>
    </>
  );
}

export default MapSpaceBackgroundDrawer;
