import { useAuth } from "@hooks/useAuth.ts";
import { FormEvent, useState } from "react";

function ServerStep({
  onSubmit,
}: {
  onSubmit: (e: FormEvent, server: string) => void;
}) {
  const auth = useAuth();
  const [server, setServer] = useState(auth.credentials.server);

  return (
    <div>
      <form
        className={`grid grid-cols-1 gap-6`}
        onSubmit={(e) => {
          onSubmit(e, server);
        }}
      >
        <label className={`block w-full`}>
          Server{" "}
          <input
            name="server"
            data-testid="server"
            className={`block w-full`}
            type="url"
            value={server}
            autoComplete="url"
            onChange={(e) => setServer(e.target.value)}
          />
        </label>

        <button data-testid="next" className={`block w-full`}>
          Next
        </button>
      </form>
    </div>
  );
}

export default ServerStep;
