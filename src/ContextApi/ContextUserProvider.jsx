import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path as needed
import UserContext from "./UserContext";

const ContextUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return <UserContext.Provider value={{ user, setUser, login, logout }}>{children || null}</UserContext.Provider>;
};

// PropTypes validation
ContextUserProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' should be a React node
};

export default ContextUserProvider;
