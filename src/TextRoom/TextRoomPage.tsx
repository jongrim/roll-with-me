import * as React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  InputGroup,
  InputLeftElement,
  Kbd,
} from '@chakra-ui/react';
import { Grid, GridItem, Input } from '@chakra-ui/react';
import BuildRollForm from './BuildRollForm';
import CustomDieForm from './CustomDieForm';
import SettingsBar from '../SettingsBar/SettingsBar';
import RollsHistory from './RollsHistory';

const TextRoomPage: React.FC = () => {
  const quickRollRef = React.useRef();
  React.useEffect(() => {
    const checkForSlash = (e: KeyboardEvent) => {
      if (e.key === '/') {
        //@ts-ignore
        quickRollRef.current?.focus();
      }
    };
    document.addEventListener('keyup', checkForSlash);
    return () => document.removeEventListener('keyup', checkForSlash);
  }, [quickRollRef]);

  return (
    <>
      <SettingsBar />
      <Container maxW="6xl" centerContent p={3}>
        <Grid templateColumns={['1fr', '1fr', '1fr 1fr']} w="full" gap={4}>
          <GridItem colSpan={[1, 1, 2]}>
            <InputGroup mb={3}>
              <InputLeftElement>
                <Kbd>/</Kbd>
              </InputLeftElement>
              <Input
                variant="flushed"
                pl={5}
                placeholder="Quick roll (ex. 2d6+1 as Resist)"
                //@ts-ignore
                ref={quickRollRef}
              />
            </InputGroup>
          </GridItem>
          <GridItem order={[2, 2, 1]}>
            <Tabs variant="line" size="sm" align="center">
              <TabList>
                <Tab>Build a Roll</Tab>
                <Tab>Saved Rolls</Tab>
                <Tab>Create a Custom Die</Tab>
              </TabList>
              <TabPanels>
                <TabPanel p={0} pt={3}>
                  <BuildRollForm />
                </TabPanel>
                <TabPanel p={0} pt={3}>
                  Saved rolls
                </TabPanel>
                <TabPanel p={0} pt={3}>
                  <CustomDieForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          <GridItem order={[1, 1, 2]}>Rolls results</GridItem>
          <GridItem order={3} colSpan={[1, 1, 2]}>
            <RollsHistory />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default TextRoomPage;
