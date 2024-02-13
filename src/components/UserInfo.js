// UserInfo.js
import React, { useState, useEffect } from 'react';
import { useAuthFirebase } from './AuthContextFirebase';
import axiosInstance from '../axiosConfig';

const UserInfo = () => {
  const { authUser } = useAuthFirebase();
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authUser) {
        try {
          // Attach the JWT as a header
          const token = await authUser.getIdToken();
          setJwt(token);
          // const response = await axios.get('http://localhost:8080/sessions', {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });

          const response = await axiosInstance.get('http://localhost:8080/sessions');

          // Handle the response data
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [authUser]);

  return (
    <div>
      {authUser ? (
        <div>
          <h2>User Information</h2>
          <p>Name: {authUser.displayName || 'N/A'}</p>
          <p>Email: {authUser.email}</p>
          <p>UID: {authUser.uid}</p>
          <p>JWT: {jwt}</p>

          {userData && (
            <div>
              <h3>Additional User Data from /sessions endpoint:</h3>
              <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
};

export default UserInfo;
