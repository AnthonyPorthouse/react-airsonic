import { CastContext } from "@/Contexts/CastContext.ts";
import { useContext } from "react";

export function useCast() {
  const loaded = useContext<boolean>(CastContext);

  return {
    loaded,
    cast: window.cast,
    chrome: window.chrome,
  };
}
