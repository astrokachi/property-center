import { useCallback } from "react";
import { useStore } from "./useStore";

export const useAuth = () => {
  const store = useStore();

  const handleSignOut = useCallback(() => {
    store.setAuth({});
    localStorage.removeItem("auth");
  }, [store]);

  const role = store.auth.user?.role;

  return {
    handleSignOut,
    role,
  };
};
