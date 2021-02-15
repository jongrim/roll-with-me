import * as React from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}

const SignIn: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (user) {
      history.push('/profile');
    }
  }, [history, user]);

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn({ username, password });
        }}
      >
        <FormControl isRequired id="username">
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormControl>
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default SignIn;
