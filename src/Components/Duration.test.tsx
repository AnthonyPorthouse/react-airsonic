import { render, screen } from "@testing-library/react";
import { it } from "vitest";

import Duration from "./Duration";

describe(Duration, async () => {
  it("should always show at least minutes", () => {
    render(<Duration time={0} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("should take the time in seconds", () => {
    render(<Duration time={1} />);
    expect(screen.getByText("00:01")).toBeInTheDocument();
  });

  it("should take the time in minutes", () => {
    render(<Duration time={60 * 30} />);
    expect(screen.getByText("30:00")).toBeInTheDocument();
  });

  it("should show hours", () => {
    render(<Duration time={60 * 60} />);
    expect(screen.getByText("01:00:00")).toBeInTheDocument();
  });

  it("should not show time in days", () => {
    render(<Duration time={60 * 60 * 24 + 1} />);
    expect(screen.getByText("24:00:01")).toBeInTheDocument();
  });
});
