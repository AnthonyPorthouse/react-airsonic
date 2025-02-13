import { useAuth } from "@hooks/useAuth.js";
import { RouterProvider } from "@tanstack/react-router";

import { queryClient } from "./index.js";
import { router } from "./router.js";

function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

export default App;
