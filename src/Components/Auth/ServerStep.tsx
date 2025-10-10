import { useAuth } from "@hooks/useAuth.ts";
import { t } from "i18next";
import { ChevronRight } from "lucide-react";
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
          {t("auth:server")}{" "}
          <input
            name="server"
            data-testid="server"
            className={`block w-full`}
            type="url"
            value={server}
            pattern="https?://.*"
            placeholder="https://example.com"
            autoComplete="url"
            onChange={(e) => setServer(e.target.value)}
            required
          />
        </label>

        <button
          data-testid="next"
          className={`flex w-full items-center justify-center gap-2 rounded border bg-gradient-to-br from-amber-400 to-pink-600 px-4 py-2 text-lg text-white shadow-sm`}
        >
          {t("auth:next")} <ChevronRight />
        </button>
      </form>
    </div>
  );
}

export default ServerStep;
