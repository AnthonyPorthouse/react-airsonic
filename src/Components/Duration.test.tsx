import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Duration from "./Duration";

describe(Duration, async () => {
  it("should always show at least minutes", async () => {
    render(<Duration time={0} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("should take the time in seconds", async () => {
    render(<Duration time={1} />);
    expect(screen.getByText("00:01")).toBeInTheDocument();
  });

  it("should take the time in minutes", async () => {
    render(<Duration time={60 * 30} />);
    expect(screen.getByText("30:00")).toBeInTheDocument();
  });

  it("should show hours", async () => {
    render(<Duration time={60 * 60} />);
    expect(screen.getByText("01:00:00")).toBeInTheDocument();
  });

  it("should not show time in days", async () => {
    render(<Duration time={60 * 60 * 24 + 1} />);
    expect(screen.getByText("24:00:01")).toBeInTheDocument();
  });

  it("should return 0 on NaN", async () => {
    render(<Duration time={NaN} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });
});
