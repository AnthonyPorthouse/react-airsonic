import { useCallback, useEffect, useState } from "react";

export function useUpdateAvailable() {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  const callback = useCallback(() => {
    setUpdateAvailable(true);
  }, [setUpdateAvailable]);

  useEffect(() => {
    document.addEventListener("update_available", callback);
    return () => document.removeEventListener("update_available", callback);
  }, [callback]);

  return [updateAvailable, setUpdateAvailable];
}
