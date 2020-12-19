import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import AuthProvider from './AuthProvider';
import SignIn from './SignIn';
import Profile from './Profile';
import Home from './Home';
import RoomProvider from './RoomProvider';

const rollWithMeTheme = extendTheme({
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
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '32px',
    5: '64px',
    6: '128px',
    7: '256px',
    8: '512px',
    9: '640px',
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
});

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const isDevDeploy = Boolean(window.location.hostname.includes('dev'));

const isMainDeploy = Boolean(window.location.hostname.includes('main'));

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
  mainDeployRedirectSignIn,
  devDeployRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(',');

const [
  localRedirectSignOut,
  productionRedirectSignOut,
  mainDeployRedirectSignOut,
  devDeployRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : isDevDeploy
      ? devDeployRedirectSignIn
      : isMainDeploy
      ? mainDeployRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : isDevDeploy
      ? devDeployRedirectSignOut
      : isMainDeploy
      ? mainDeployRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

function App() {
  return (
    <ChakraProvider theme={rollWithMeTheme} resetCSS>
      <AuthProvider>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
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
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
