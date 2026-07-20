/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/api";

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const res = await api.get("/api/user/me");

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(null);
       if (err.code === "ERR_NETWORK") {
        console.warn("Backend unavailable");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
 
  const logout = async () => {
    try {
    const res = await api.post("/api/user/logout");
    if (res.data.success){
    setUser(null); 
    window.location.href = res.data.redirect;
    }
     } catch (error) {
      //
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        getProfile,
        logout,
      }}
    >
      {loading ? null : children}
    </UserAuthContext.Provider>
  );
};
