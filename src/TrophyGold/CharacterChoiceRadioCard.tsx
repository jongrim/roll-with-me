import * as React from 'react';
import {
  Box,
  useColorModeValue,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';

const CharacterChoiceRadioCard: React.FC<UseRadioProps> = (props) => {
  const color = useColorModeValue('yellow.700', 'yellow.500');
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="sm"
        _checked={{
          color,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
        py={1}
        textAlign="center"
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default CharacterChoiceRadioCard;
