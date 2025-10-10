import { useAuth } from "@hooks/useAuth.ts";
import { t } from "i18next";
import { LogIn } from "lucide-react";
import { FormEvent, useState } from "react";

function CredentialStep({
  onSubmit,
}: {
  onSubmit: (e: FormEvent, username: string, password: string) => void;
}) {
  const auth = useAuth();

  const [username, setUsername] = useState(auth.credentials.username);
  const [password, setPassword] = useState(auth.credentials.password);

  return (
    <div>
      <form
        className={`grid grid-cols-1 gap-6`}
        onSubmit={(e) => {
          onSubmit(e, username, password);
        }}
      >
        <label className={`block w-full`}>
          {t("auth:username")}{" "}
          <input
            name="username"
            data-testid="username"
            className={`block w-full`}
            type="text"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className={`block w-full`}>
          {t("auth:password")}{" "}
          <input
            name="password"
            data-testid="password"
            className={`block w-full`}
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          data-testid="next"
          className={`flex w-full items-center justify-center gap-2 rounded border bg-gradient-to-br from-amber-400 to-pink-600 px-4 py-2 text-lg text-white shadow-sm`}
        >
          {t("auth:login")} <LogIn />
        </button>
      </form>
    </div>
  );
}

export default CredentialStep;
