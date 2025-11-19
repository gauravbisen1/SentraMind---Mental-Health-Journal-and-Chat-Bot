import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentramind-backend.onrender.com";


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    axios.get(`${BASE_URL}/new`, { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
