import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import AuthProvider from './AuthProvider';
import SignIn from './SignIn';
import Profile from './Profile';

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

function App() {
  React.useEffect(() => {
    Amplify.configure(updatedAwsConfig);
  }, []);

  return (
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
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

function Home() {
  return <div>home</div>;
}

export default App;
