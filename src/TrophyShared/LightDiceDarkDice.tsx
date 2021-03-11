import * as React from 'react';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import {
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
  GiDiceSixFacesOne,
  GiDiceSixFacesTwo,
  GiDiceSixFacesThree,
  GiDiceSixFacesFour,
  GiDiceSixFacesFive,
  GiDiceSixFacesSix,
} from 'react-icons/gi';

export const LightDie = ({ result }: { result: string }) => {
  const isLightMode = useColorModeValue(true, false);
  switch (result) {
    case '1':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice1} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesOne} />
      );
    case '2':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice2} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesTwo} />
      );
    case '3':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice3} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesThree} />
      );
    case '4':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice4} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesFour} />
      );
    case '5':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice5} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesFive} />
      );
    case '6':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiInvertedDice6} />
      ) : (
        <Icon h={14} w={14} as={GiDiceSixFacesSix} />
      );
    default:
      return null;
  }
};
export const DarkDie = ({ result }: { result: string }) => {
  const isLightMode = useColorModeValue(true, false);
  switch (result) {
    case '1':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesOne} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice1} />
      );
    case '2':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesTwo} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice2} />
      );
    case '3':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesThree} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice3} />
      );
    case '4':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesFour} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice4} />
      );
    case '5':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesFive} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice5} />
      );
    case '6':
      return isLightMode ? (
        <Icon h={14} w={14} as={GiDiceSixFacesSix} />
      ) : (
        <Icon h={14} w={14} as={GiInvertedDice6} />
      );
    default:
      return null;
  }
};
