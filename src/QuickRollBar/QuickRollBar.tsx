import * as React from 'react';
import { Input, InputGroup, InputLeftElement, Kbd } from '@chakra-ui/react';
import { getRollFromQuickString } from '../utils/rolls';
import { Roll } from '../types';

interface QuickRollBarProps {
  name: string;
  onSubmit: (roll: Roll) => void;
  placeholder: string;
}

const QuickRollBar = React.forwardRef<HTMLElement, QuickRollBarProps>(
  ({ name, onSubmit, placeholder }, ref) => {
    const [quickRollValue, setQuickRollValue] = React.useState('');
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const quickRoll = getRollFromQuickString(quickRollValue);
          quickRoll.rolledBy = name;
          onSubmit(quickRoll);
        }}
      >
        <InputGroup mb={3}>
          <InputLeftElement>
            <Kbd>/</Kbd>
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder={placeholder}
            value={quickRollValue}
            onChange={({ target }) => setQuickRollValue(target.value)}
            //@ts-ignore
            ref={ref}
          />
        </InputGroup>
      </form>
    );
  }
);

export default QuickRollBar;
