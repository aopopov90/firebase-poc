import React from 'react';
import AuthButton from './components/AuthButton';
import UserInfo from './components/UserInfo';
import { AuthProviderFirebase } from './components/AuthContextFirebase';

function App() {
  return (
    <AuthProviderFirebase>
      <div>
        <AuthButton />
        <hr />
        <UserInfo />
      </div>
    </AuthProviderFirebase>
  );
}

export default App;
