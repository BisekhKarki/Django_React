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
    if (!getToken) {
      router.replace("/login");
      return;
    } else {
      setToken(getToken);
    }
  }, [token, setToken, router]);

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
