import * as React from 'react';
import { Auth } from 'aws-amplify';

import { AuthContext } from './AuthProvider';

const Profile: React.FC = () => {
  const { user } = React.useContext(AuthContext);

  return user ? (
    <div>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      {JSON.stringify(user)}
    </div>
  ) : (
    <a href="/sign-in">Sign In</a>
  );
};

export default Profile;
