"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import ContextHook from "./ContextHook";
import { useRouter } from "next/navigation";

interface ContextType {
  token: string | null;
  setToken: (user: string) => void;
}

export const Context = createContext<ContextType | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

const TokenValidator = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken } = ContextHook();
  const router = useRouter();
  useEffect(() => {
    const getToken = localStorage.getItem("access_token");
    if (getToken) {
      setToken(getToken);
    } else {
      router.replace("/login");
    }
  }, [token, setToken]);

  return <>{children}</>;
};

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const value = {
    token,
    setToken,
  };
  return (
    <Context.Provider value={value}>
      <TokenValidator>{children}</TokenValidator>
    </Context.Provider>
  );
};

export default ContextProvider;
