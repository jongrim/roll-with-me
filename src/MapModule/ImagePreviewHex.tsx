import * as React from 'react';
import { useColorModeValue, Box } from '@chakra-ui/react';
import { BackgroundImage } from './gridConfiguration';

interface ImagePreviewHexProps {
  image?: BackgroundImage;
}

const ImagePreviewHex = ({ image }: ImagePreviewHexProps) => {
  const defaultStrokeColor = useColorModeValue('#CBD5E0', '#4A5568');
  const { width, height } = { width: 14, height: 12.12 };

  return (
    <Box
      as="svg"
      viewBox="0 -1 15 15"
      preserveAspectRatio="xMidYMid meet"
      h={32}
    >
      <defs>
        {image?.path && (
          <pattern
            id={image.id}
            patternUnits="userSpaceOnUse"
            width={width}
            height={height}
          >
            <image href={image.path} height={height} width={width} />
          </pattern>
        )}
      </defs>
      <Box
        as="polygon"
        fill={image?.path ? `url(#${image.id})` : 'transparent'}
        stroke={defaultStrokeColor}
        strokeWidth="0.5"
        points="14,6.06217782649107 10.5,12.12435565298214 3.5,12.12435565298214 0,6.06217782649107 3.5,0 10.5,0"
      />
    </Box>
  );
};

export default ImagePreviewHex;
