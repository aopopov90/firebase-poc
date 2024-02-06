// AuthContextFirebase.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';

const config = {
//   apiKey: 'AIzaSyA7s_URPH4wqeG5HDwaO04Iiup96sAltVY',
//   authDomain: 'protean-atom-410915.firebaseapp.com'
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'protean-atom-410915.firebaseapp.com'
};

console.log(config);

firebase.initializeApp(config);

const AuthContextFirebase = createContext();

export const AuthProviderFirebase = ({ children }) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  const signInWithGoogle = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleAuthProvider)
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const refreshAuthToken = async () => {
    if (authUser) {
      try {
        const refreshedToken = await authUser.getIdToken(true);
        console.log('Token refreshed:', refreshedToken);
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
  };

  useEffect(() => {
    const tokenRefreshInterval = setInterval(() => {
      refreshAuthToken();
    }, 30 * 60 * 1000); // Refresh token every 30 minutes

    return () => clearInterval(tokenRefreshInterval);
  }, [authUser]);

  return (
    <AuthContextFirebase.Provider value={{ authUser, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContextFirebase.Provider>
  );
};

export const useAuthFirebase = () => {
  return useContext(AuthContextFirebase);
};
