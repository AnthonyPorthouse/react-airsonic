import AuthFlow from "@components/Auth/AuthFlow.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthFlow />;
}
