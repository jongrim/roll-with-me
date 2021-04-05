import React from 'react';
import ReactDOM from 'react-dom';
import App, { rollWithMeTheme } from './App';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ColorModeScript } from '@chakra-ui/react';

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

const redirectSignIn = isLocalhost
  ? localRedirectSignIn
  : isDevDeploy
  ? devDeployRedirectSignIn
  : isMainDeploy
  ? mainDeployRedirectSignIn
  : productionRedirectSignIn;

const redirectSignOut = isLocalhost
  ? localRedirectSignOut
  : isDevDeploy
  ? devDeployRedirectSignOut
  : isMainDeploy
  ? mainDeployRedirectSignOut
  : productionRedirectSignOut;

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn,
    redirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript
      initialColorMode={rollWithMeTheme.config.initialColorMode}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
