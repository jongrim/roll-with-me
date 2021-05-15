import * as React from 'react';
import { getRandomNumbers } from './functions/randomNumbers';

interface RandomNumbers {
  randomNumbers: number[];
  getNumbers: (val: number) => Promise<number[]>;
}

export const RandomNumbersContext = React.createContext<RandomNumbers>({
  randomNumbers: [],
  getNumbers: (val) => Promise.resolve([]),
});

export const useRandomNumberContext = () =>
  React.useContext(RandomNumbersContext);

function RandomNumbersProvider({ children }: { children: React.ReactNode }) {
  const [randomNumbers, setRandomNumbers] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (randomNumbers.length < 15) {
      getRandomNumbers(100).then((res) => setRandomNumbers(res));
    }
  }, [randomNumbers]);

  const getNumbers = async (val: number) => {
    if (val > randomNumbers.length) {
      await getRandomNumbers(100 + val).then((res) => {
        randomNumbers.splice(randomNumbers.length - 1, 0, ...res);
      });
    }
    const numbers = randomNumbers.splice(0, val);
    setRandomNumbers(randomNumbers);
    return numbers;
  };

  return (
    <RandomNumbersContext.Provider value={{ randomNumbers, getNumbers }}>
      {children}
    </RandomNumbersContext.Provider>
  );
}

export default RandomNumbersProvider;
