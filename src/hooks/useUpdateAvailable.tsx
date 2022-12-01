import { useEffect, useState } from "react";

export function useUpdateAvailable() {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  const callback = () => {
    setUpdateAvailable(true);
  };

  useEffect(() => {
    document.addEventListener("update_available", callback);
    return () => document.removeEventListener("update_available", callback);
  }, [callback]);

  return [updateAvailable, setUpdateAvailable];
}
