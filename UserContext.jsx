import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        userDoc,
        setUserDoc,
        loading,
        setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);