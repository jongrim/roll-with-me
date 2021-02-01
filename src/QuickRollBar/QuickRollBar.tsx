import * as React from 'react';
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Kbd,
} from '@chakra-ui/react';
import { getRollFromQuickString } from '../utils/rolls';
import { Roll } from '../types';

interface QuickRollBarProps {
  name: string;
  onSubmit: (roll: Roll) => void;
  placeholder: string;
}

const QuickRollBar = React.forwardRef<HTMLInputElement, QuickRollBarProps>(
  ({ name, onSubmit, placeholder }, ref) => {
    const [quickRollValue, setQuickRollValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            const quickRoll = getRollFromQuickString(quickRollValue);
            quickRoll.rolledBy = name;
            onSubmit(quickRoll);
            setErrorMessage('');
          } catch (e) {
            console.log(e);
            setErrorMessage("Sorry, I couldn't understand that");
          }
        }}
      >
        <FormControl id="quick-roll-input" isInvalid={!!errorMessage}>
          <InputGroup mb={3}>
            <InputLeftElement w={20}>
              <Kbd>Ctrl</Kbd> + <Kbd>/</Kbd>
            </InputLeftElement>
            <Input
              pl={24}
              variant="flushed"
              placeholder={placeholder}
              value={quickRollValue}
              onChange={({ target }) => setQuickRollValue(target.value)}
              ref={ref}
            />
          </InputGroup>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
      </form>
    );
  }
);

export default QuickRollBar;
