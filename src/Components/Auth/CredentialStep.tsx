import { useAuth } from "@hooks/useAuth.ts";
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
          Username{" "}
          <input
            name="username"
            data-testid="username"
            className={`block w-full`}
            type="text"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={`block w-full`}>
          Password{" "}
          <input
            name="password"
            data-testid="password"
            className={`block w-full`}
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button data-testid="next" className={`block w-full`}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default CredentialStep;
