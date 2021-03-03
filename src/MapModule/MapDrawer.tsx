import * as React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

interface MapDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const MapDrawer = ({ children, isOpen, onClose }: MapDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="left" size="md" onClose={onClose}>
      <DrawerOverlay background="rgba(0, 0, 0, 0.12)">
        <DrawerContent>
          <DrawerCloseButton />
          {children}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MapDrawer;
