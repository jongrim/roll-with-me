import * as React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

interface user {
  username: string;
}

export const AuthContext = React.createContext<{ user: user | undefined }>({
  user: undefined,
});

const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>(
    AuthState.Loading
  );
  const [user, setUser] = React.useState<user | undefined>();

  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          setAuthState(AuthState.SignedIn);
          break;
        case 'signOut':
          setUser(undefined);
          setAuthState(AuthState.SignedOut);
          break;
        case 'customOAuthState':
          setUser(data);
          setAuthState(AuthState.SignedIn);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setAuthState(AuthState.SignedIn);
      })
      .catch(() => {
        console.log('Not signed in');
        setAuthState(AuthState.SignedOut);
      });
  }, []);

  console.log({ user });
  return authState === AuthState.Loading ? (
    <div>loading</div>
  ) : (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
