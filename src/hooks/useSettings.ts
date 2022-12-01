import { useState } from "react";

export function useSetting(name: string): [string, (value: string) => void] {
  const calculatedKey = `settings.${name}`;

  const [setting, setSetting] = useState<string>(
    localStorage.getItem(calculatedKey) ?? ""
  );

  function dispatch(value: string) {
    localStorage.setItem(calculatedKey, value);
    setSetting(value);
  }

  return [setting, dispatch];
}
