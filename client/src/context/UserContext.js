

import React, { createContext, useContext, useState ,useEffect} from 'react';
import axios from 'axios';

// Create a context to hold user-related data
const UserContext = createContext();

// UserProvider component manages user state and provides it to the context
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState(null);

  // State to manage loading status
  const [loading, setLoading] = useState(true);


  
  // Function to update user data
  const updateUser = (newUser) => {
    setUser(newUser);
  };


   // Fetch user data or perform authentication logic
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          "/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          updateUser(res.data.data);
        } else {
          // Handle the case where the authentication fails
          updateUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);





  // Provide user and updateUser values to the context
  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// useUserContext hook to access user-related data from the context
export const useUserContext = () => {
  // Get context values
  const context = useContext(UserContext);

  // Throw an error if the hook is not used within a UserProvider
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  // Return user-related context values
  return context;
};

