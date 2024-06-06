import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../Providers/AuthProvider.js";

function LoggedInAs() {
  const navigate = useNavigate();

  const { username, server } = useAuth().credentials;
  const { logout } = useAuth();

  const { t } = useTranslation("nav");

  const logoutHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();

    navigate({ to: "/" });
  };

  return (
    <div className={`flex flex-row items-center gap-2 text-base`}>
      <UserIcon className={`h-6 w-6`} />
      <div className={`flex flex-col text-center`}>
        <span title={server}>{username}</span>
      </div>
      <button onClick={logoutHandler}>{t("logout")}</button>
    </div>
  );
}

export default LoggedInAs;
