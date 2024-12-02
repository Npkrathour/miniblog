import { useState } from "react";
import UserContext from "./UserContext";

const ContextUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>;
};

export default ContextUserProvider;
