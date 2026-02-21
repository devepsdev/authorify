import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, token) => {
    setAuthToken(token);
    setCurrentUser(username);
  };

  const logout = () => {
    setAuthToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
