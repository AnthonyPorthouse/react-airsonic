import { UserIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../api/auth.js";

function LoggedInAs() {
  const { username, server } = useAuth().credentials;
  const { logout } = useAuth();

  const { t } = useTranslation("nav");

  const logoutHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className={`text-base flex flex-row items-center gap-2`}>
      <UserIcon className={`w-6 h-6`} />
      <div className={`flex flex-col text-center`}>
        <span title={server}>{username}</span>
      </div>
      <button onClick={logoutHandler}>{t("logout")}</button>
    </div>
  );
}

export default LoggedInAs;
