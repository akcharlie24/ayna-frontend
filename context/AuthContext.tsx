"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  authToken: string | null;
  loading: boolean;
  login: (responseData: { jwt: string; user: User }) => void;
  logout: () => void;
};

const initialState: AuthContextType = {
  user: null,
  authToken: null,
  loading: true,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialState.user);
  const [authToken, setAuthToken] = useState<string | null>(
    initialState.authToken,
  );
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    // Check if user data and token exist in localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = (responseData: { jwt: string; user: User }) => {
    const { jwt, user } = responseData;

    // Store user details and token
    setUser(user);
    setAuthToken(jwt);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", jwt);
  };

  const logout = () => {
    // Clear user data and token
    setUser(null);
    setAuthToken(null);

    // Remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  const value: AuthContextType = {
    user,
    authToken,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
