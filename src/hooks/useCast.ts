import { useContext } from "react";
import { CastContext } from "@/Contexts/CastContext.ts";

export function useCast() {
  const loaded = useContext<boolean>(CastContext);

  return {
    loaded,
    cast: window['cast'] as unknown,
    chrome: window['chrome'] as unknown,
  }

}