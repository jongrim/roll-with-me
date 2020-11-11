import * as React from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router-dom';

const SignIn: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    if (user) {
      history.push('/profile');
    } else {
      Auth.federatedSignIn();
    }
  }, [history, user]);

  return null;
};

export default SignIn;
