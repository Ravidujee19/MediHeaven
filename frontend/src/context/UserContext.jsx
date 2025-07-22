// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user details if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Store user data
        } catch (error) {
          console.error("Error fetching user data:", error);
          logoutUser(); // Clear session on error
        }
      }
    };
    fetchUser();
  }, []);

  // Update user details
  const updateUser = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/update",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data); // Update local state
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  // Delete user account
  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      logoutUser(); // Clear session on delete
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, deleteUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
