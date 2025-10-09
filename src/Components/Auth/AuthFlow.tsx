import logoAvif from "@/images/logo192.avif";
import logoPng from "@/images/logo192.png";
import logoWebp from "@/images/logo192.webp";
import { checkAuthentication, checkServerInfo } from "@api/auth.tsx";
import CredentialStep from "@components/Auth/CredentialStep.tsx";
import ServerStep from "@components/Auth/ServerStep.tsx";
import { useAuth } from "@hooks/useAuth.ts";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

const routeApi = getRouteApi("/login");

function AuthFlow() {
  const auth = useAuth();
  const navigate = useNavigate();
  const search = routeApi.useSearch();

  const [isPending, startTransition] = useTransition();

  const initialCheck = useRef(false);
  const [step, setStep] = useState<"server" | "credentials">("server");

  const {
    isError: isServerError,
    error: serverError,
    mutate: serverCheckMutation,
  } = useMutation({
    mutationKey: ["authServerCheck"],
    mutationFn: async () => await checkServerInfo(auth.credentials.server),

    onMutate: (server: string) => {
      auth.setAuth({
        credentials: {
          server,
          username: auth.credentials.username,
          password: auth.credentials.password,
        },
        isAuthenticated: false,
      });

      localStorage.setItem("ra.server", server);
    },

    onSuccess: (data) => {
      // Check Server capabilities

      // Is this an opensubsonic supported server?
      if (data.isOpenSubsonic) {
        console.log("OpenSubsonic Server Found");
      }

      // What capabilities does this server support?

      // Navigate to Credentials Step
      setStep("credentials");
    },
  });

  const {
    isError: isCredentialsError,
    error: credentialsError,
    mutate: credentialsCheckMutation,
  } = useMutation({
    mutationKey: ["authCredentialsCheck"],
    mutationFn: async () =>
      await checkAuthentication(
        auth.credentials.server,
        auth.credentials.username,
        auth.credentials.password,
      ),

    onMutate: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      auth.setAuth({
        credentials: { server: auth.credentials.server, username, password },
        isAuthenticated: false,
      });

      localStorage.setItem("ra.username", username);
      localStorage.setItem("ra.password", password);
    },

    onSuccess: () => {
      // Update authentication state
      auth.setAuth({
        credentials: auth.credentials,
        isAuthenticated: true,
      });

      // Navigate to Credentials Step
      startTransition(async () => {
        await navigate({ to: search.redirect });
      });
    },
  });

  const validateServer = useCallback(
    (e: FormEvent, server: string) => {
      e.preventDefault();
      serverCheckMutation(server);
    },
    [serverCheckMutation],
  );

  const validateCredentials = useCallback(
    (e: FormEvent, username: string, password: string) => {
      e.preventDefault();
      credentialsCheckMutation({ username, password });
    },
    [credentialsCheckMutation],
  );

  useEffect(() => {
    if (auth.isAuthenticated && !isPending) {
      console.log("Authenticated, redirecting to: ", search.redirect);
      startTransition(async () => {
        await navigate({ to: search.redirect });
      });
    }
  }, [auth.isAuthenticated, isPending, navigate, search.redirect]);

  useEffect(() => {
    if (!initialCheck.current && !isPending) {
      initialCheck.current = true;

      if (
        auth.credentials.server &&
        auth.credentials.username &&
        auth.credentials.password
      ) {
        credentialsCheckMutation(auth.credentials);
      } else if (auth.credentials.server) {
        serverCheckMutation(auth.credentials.server);
      }
    }
  }, [
    auth.credentials,
    credentialsCheckMutation,
    isPending,
    serverCheckMutation,
  ]);

  return (
    <div className={`flex h-auto flex-auto items-center`}>
      <div className={`mx-auto w-64`}>
        <header className="mx-auto">
          <picture>
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
        </header>

        {isServerError && (
          <div className="rounded-full border border-red-800 bg-red-600 px-4 py-2 text-white">
            {serverError.message}
          </div>
        )}
        {isCredentialsError && (
          <div className="rounded-full border border-red-800 bg-red-600 px-4 py-2 text-white">
            {credentialsError.message}
          </div>
        )}

        {step === "server" && <ServerStep onSubmit={validateServer} />}
        {step === "credentials" && (
          <CredentialStep onSubmit={validateCredentials} />
        )}
      </div>
    </div>
  );
}

export default AuthFlow;
