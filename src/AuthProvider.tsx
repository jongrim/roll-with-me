import * as React from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import qs from 'qs';

interface user {
  username: string;
  attributes: {
    email: string;
    preferred_username?: string;
    identities?: string;
  };
}

export const AuthContext = React.createContext<{
  user: user | undefined;
  authState: AuthState;
}>({
  user: undefined,
  authState: AuthState.Loading,
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
        case 'customOAuthState':
          if (data) {
            const query = qs.parse(data);
            if (query?.return) {
              window.location.replace(query.return as string);
            }
          }
          break;
      }
    });

    Hub.listen('internal-user-updates', ({ payload: { event, data } }) => {
      switch (event) {
        case 'update-user-display-name':
          setUser((cur) => ({
            username: cur?.username ?? '',
            ...cur,
            attributes: {
              ...cur?.attributes,
              email: cur?.attributes.email ?? '',
              preferred_username: data as string,
            },
          }));
      }
    });

    getUser()
      .then((userData) => {
        setUser(userData);
        setAuthState(AuthState.SignedIn);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
