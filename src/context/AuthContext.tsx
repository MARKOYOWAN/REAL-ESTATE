// src/context/AuthContext.tsx
import { createContext, useContext, type ReactNode } from "react"; 
import type { User } from "@supabase/supabase-js";
import { useAuth } from "../auth/services/useAuth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginService: (email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};