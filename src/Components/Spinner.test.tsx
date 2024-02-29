import { cleanup, render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

describe(Spinner, async () => {
  afterEach(() => {
    cleanup();
  });

  test("it renders a spinner", () => {
    render(<Spinner />);

    const node = screen.getByRole("img");

    expect(node).toBeInTheDocument();
    expect(node).toHaveClass("w-32", "stroke-current");
  });
});
