import * as React from 'react';
import { Box } from '@chakra-ui/react';

import './cube.css';

const SpinningCube = () => {
  return (
    <div className="scene">
      <div className="cube">
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--front"
        ></Box>
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--back"
        ></Box>
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--right"
        ></Box>
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--left"
        ></Box>
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--top"
        ></Box>
        <Box
          borderColor="inherit"
          bg="inherit"
          border="1px solid"
          className="cube__face cube__face--bottom"
        ></Box>
      </div>
    </div>
  );
};

export default SpinningCube;
