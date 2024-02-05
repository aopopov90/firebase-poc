// AuthButton.js
import React from 'react';
import { useAuthFirebase } from './AuthContextFirebase';

const AuthButton = () => {
  const { authUser, loading, signInWithGoogle, signOut } = useAuthFirebase();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {authUser ? (
            <div>
              <p>Welcome, {authUser.displayName || authUser.email}!</p>
              <button onClick={signOut}>Sign Out</button>
            </div>
          ) : (
            <button onClick={signInWithGoogle}>Sign In with Google</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthButton;
