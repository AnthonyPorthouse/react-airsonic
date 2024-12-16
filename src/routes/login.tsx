import { ping } from "@api/auth.js";
import { useAuth } from "@hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { t } from "i18next";
import { Suspense, SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";

import logoAvif from "../images/logo192.avif";
import logoPng from "../images/logo192.png";
import logoWebp from "../images/logo192.webp";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),

  component: LogIn,
});

const routeApi = getRouteApi("/login");

function LogIn() {
  const auth = useAuth();

  const [server, setServer] = useState(auth.credentials.server);
  const [username, setUsername] = useState(auth.credentials.username);
  const [password, setPassword] = useState(auth.credentials.password);

  const [hasAutoChecked, setHasAutoChecked] = useState(false);

  const navigate = useNavigate();
  const search = routeApi.useSearch();

  const { isError, mutate } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async () => await ping(auth.credentials),

    onMutate: ({
      server,
      username,
      password,
    }: {
      server: string;
      username: string;
      password: string;
    }) => {
      auth.setAuth({
        credentials: { server, username, password },
        isAuthenticated: false,
      });

      localStorage.setItem("ra.server", server);
      localStorage.setItem("ra.username", username);
      localStorage.setItem("ra.password", password);
    },

    onSuccess: (_, { server, username, password }) => {
      auth.setAuth({
        credentials: { server, username, password },
        isAuthenticated: true,
      });
    },
  });

  useEffect(() => {
    if (server && username && password && !hasAutoChecked) {
      mutate({ server, username, password });
    }
    setHasAutoChecked(true);
  }, [mutate, server, username, password, hasAutoChecked]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: search.redirect });
    }
  }, [auth.isAuthenticated, navigate, search.redirect]);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    mutate({ server, username, password });
  };

  return (
    <Suspense>
      <div className={`flex h-auto flex-auto items-center`}>
        <div className={`mx-auto w-64`}>
          {isError && <div>Something Went Wrong</div>}

          <form className={`grid grid-cols-1 gap-6`} onSubmit={submit}>
            <picture className="mx-auto">
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <source srcSet={logoPng} type="image/png" />

              <img
                src={logoAvif}
                alt={t("common:title")}
                aria-hidden="true"
                className={`h-12 w-12 md:h-16 md:w-16`}
              />
            </picture>

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
            <button data-testid="login" className={`block w-full`}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
