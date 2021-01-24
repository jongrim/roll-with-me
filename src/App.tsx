import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import AuthProvider from './AuthProvider';
import SignIn from './SignIn';
import Profile from './Profile/Profile';
import Home from './Home';
import RoomProvider from './RoomProvider';
import Feedback from './Feedback/Feedback';
import Privacy from './Privacy/Privacy';
import NewRoom from './NewRoom/NewRoom';

export const rollWithMeTheme = extendTheme({
  colors: {
    brand: {
      50: '#ffe6ff',
      100: '#f8bbf2',
      200: '#f18ee6',
      300: '#ea62db',
      400: '#e337d0',
      500: '#c91db6',
      600: '#9d158e',
      700: '#710d67',
      800: '#45063e',
      900: '#1a0018',
    },
  },
  fonts: {
    body: 'Poppins, sans-serif',
    title: 'QuiteMagicalRegular, Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    monospace: 'Menlo, monospace',
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

function App() {
  return (
    <ChakraProvider theme={rollWithMeTheme} resetCSS>
      <AuthProvider>
        <Box className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/new-room">
                <NewRoom />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/:type/:name">
                <RoomProvider />
              </Route>
              <Route path="/feedback">
                <Feedback />
              </Route>
              <Route path="/privacy">
                <Privacy />
              </Route>
            </Switch>
          </Router>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
