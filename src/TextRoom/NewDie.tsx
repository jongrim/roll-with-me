import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  GridItem,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Button,
  Switch,
  FormHelperText,
  Grid,
} from '@chakra-ui/react';
import { RiAddCircleLine } from 'react-icons/ri';
import { Die } from '../types';
import { createDieOfNSides } from '../utils/rolls';

interface NewDieProps {
  onSubmit: (die: Die) => void;
}

const NewDie: React.FC<NewDieProps> = ({ onSubmit }) => {
  const [name, setName] = React.useState<string>('');
  const [sides, setSides] = React.useState<number>();
  const [qty, setQty] = React.useState<number>(1);
  const [saveCustomDie, setSaveCustomDie] = React.useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO should show errors
        if (!sides || !qty) return;
        for (let i = 0; i < qty; i++) {
          onSubmit(createDieOfNSides({ name: name || `d${sides}`, n: sides }));
        }
        setName('');
        setSides(undefined);
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Heading textAlign="left" as="h3" size="md">
            1 — Add dice to your roll
          </Heading>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Die Name</FormLabel>
            <Input
              size="sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
            />
            <FormHelperText textAlign="left">
              Leave blank to autofill
            </FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Sides</FormLabel>
            <NumberInput
              size="sm"
              min={1}
              onChange={(_, val) => setSides(val)}
              value={sides || ''}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              size="sm"
              min={1}
              onChange={(_, val) => setQty(val)}
              value={qty || ''}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl display="flex" alignItems="center">
            <FormLabel>Save this as a custom die?</FormLabel>
            <Switch
              isChecked={saveCustomDie}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSaveCustomDie(e.target.checked)
              }
            />
          </FormControl>
        </GridItem>
        <GridItem colStart={2} justifySelf="end">
          <Button
            leftIcon={<RiAddCircleLine />}
            colorScheme="brand"
            variant="outline"
            type="submit"
          >
            Add Die
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default NewDie;
