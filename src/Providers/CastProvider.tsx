import { CastContext } from "@/Contexts/CastContext.ts";
import { PropsWithChildren, useEffect, useState } from "react";

function CastProvider({ children }: Readonly<PropsWithChildren>) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.__onGCastApiAvailable = (isAvailable: boolean) => {
      const instance = window.cast.framework.CastContext.getInstance();
      instance.setOptions({
        receiverApplicationId:
          window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });

      console.log(instance);
    };

    const scriptTag = document.createElement("script");
    scriptTag.src =
      "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
    scriptTag.async = true;
    scriptTag.onload = () => setLoaded(true);
    document.body.appendChild(scriptTag);
  }, []);

  return <CastContext.Provider value={loaded}>{children}</CastContext.Provider>;
}

export default CastProvider;
