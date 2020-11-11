import * as React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';

import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  React.useEffect(() => {
    if (!user) history.push('/sign-in');
  }, [history, user]);

  return (
    <div>
      <AmplifySignOut />
      {JSON.stringify(user)}
    </div>
  );
};

export default Profile;
