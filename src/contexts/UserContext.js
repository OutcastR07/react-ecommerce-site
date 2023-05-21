import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password, email) => {
    // Perform login authentication logic here
    // Assuming the login is successful and the user object is returned from the backend
    if (email === "") {
      // Handle email validation error, e.g., display an error message
      return;
    }

    const user = {
      username,
      email,
      // other user data...
    };
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
