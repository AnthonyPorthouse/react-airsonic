import { AuthContext, Authenticated } from "@/Contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  return useContext<Authenticated>(AuthContext);
}
