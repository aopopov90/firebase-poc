import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const getAuthToken = async () => {
  const user = firebase.auth().currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  }

  return null;
};
