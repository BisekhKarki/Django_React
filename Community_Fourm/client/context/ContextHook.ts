import { useContext } from "react";
import { Context } from "./ContextProvider";

const ContextHook = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useUserContext must be used within a ContextProvider");
  }
  return context;
};

export default ContextHook;
