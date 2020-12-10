import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react';
import * as React from 'react';

const CustomDieForm: React.FC = () => {
  const [name, setName] = React.useState<string>();
  const [sides, setSides] = React.useState<number>();
  const [share, setShare] = React.useState<boolean>(true);
  return (
    <>
      <form>
        <Heading as="h3" size="md" mb={2}>
          New Custom Die
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Die Name</FormLabel>
              <Input
                size="sm"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                value={name}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Sides</FormLabel>
              <NumberInput
                size="sm"
                min={1}
                onChange={(valueString: string) =>
                  setSides(Number(valueString))
                }
                value={sides}
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
              <FormLabel>Share with room</FormLabel>
              <Switch
                isChecked={share}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShare(e.target.checked)
                }
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button w="full" type="submit" colorScheme="teal">
              Done
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};

export default CustomDieForm;
