// import { createContext, useContext, useEffect, useState } from "react";
// import { getToken } from "../utils/token";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = getToken();

//     if (token) {
//       // ✅ RESTORE USER FROM TOKEN
//       setUser({ email: "restored-user" }); // later decode token
//     }

//     setLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/token";
import api from "../api/api.js"; // ✅ your axios instance

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // ✅ restore user quickly from localStorage (fast UI)
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const token = getToken();

        if (!token) {
          setUser(null);
          localStorage.removeItem("user");
          setLoading(false);
          return;
        }

        // ✅ Fetch real user from backend
        const res = await api.get("/user/me");

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.log("Restore user error:", err?.response?.data?.message);

        // ✅ invalid token -> logout
        removeToken();
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
