import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // Set user as authenticated
      axios.get('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    .then(response => {
      setCurrentUser({user: response.data, token:userToken});
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
      
    });
    }
    setLoading(false);
  }, []);

  function logout() {
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  }

  function login(token) {
    localStorage.setItem('userToken', token);
    axios.get('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
        setCurrentUser({user: response.data, token:token});
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
      
    });
  }

  function setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  const value = {
    currentUser,
    setCurrentUser,
    logout,
    login,
    setAuthToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
