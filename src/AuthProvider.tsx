import * as React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

interface user {
  username: string;
}

export const AuthContext = React.createContext<{ user: user | undefined }>({
  user: undefined,
});

function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log('Not signed in'));
}

const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>(
    AuthState.Loading
  );
  const [user, setUser] = React.useState<user | undefined>();

  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then((userData) => {
            setUser(userData);
            setAuthState(AuthState.SignedIn);
          });
          break;
        case 'signOut':
          setUser(undefined);
          setAuthState(AuthState.SignOut);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then((userData) => {
      setUser(userData);
      setAuthState(AuthState.SignedIn);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
