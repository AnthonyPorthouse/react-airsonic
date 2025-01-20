import { afterEach, beforeEach, describe } from "vitest";

import { getCoverArtUrl, getScaledCoverArtUrl } from "./artwork";
import { generateAuthParams, sanitizeServer } from "./auth";

describe(getCoverArtUrl, async () => {
  const authParamsMock = vi.mocked(generateAuthParams);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("./auth");

    authParamsMock.mockReturnValueOnce("auth");
    sanitizeServerMock.mockReturnValueOnce("https://example.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    getCoverArtUrl("ar-1", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(authParamsMock).toHaveBeenCalledExactlyOnceWith({
      username: "user",
      password: "password",
    });
  });

  it("sanitizes the passed server name", async () => {
    getCoverArtUrl("ar-1", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(sanitizeServerMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com",
    );
  });

  it("returns a cover art url", async () => {
    const result = getCoverArtUrl("ar-1", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(result).toBe(
      "https://example.com/rest/getCoverArt.view?id=ar-1&auth",
    );
  });
});

describe(getScaledCoverArtUrl, async () => {
  const authParamsMock = vi.mocked(generateAuthParams);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("./auth");

    authParamsMock.mockReturnValueOnce("auth");
    sanitizeServerMock.mockReturnValueOnce("https://example.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("generates auth params for the passed credentials", async () => {
    getScaledCoverArtUrl("ar-1", "256", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(authParamsMock).toHaveBeenCalledExactlyOnceWith({
      username: "user",
      password: "password",
    });
  });

  it("sanitizes the passed server name", async () => {
    getScaledCoverArtUrl("ar-1", "256", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(sanitizeServerMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com",
    );
  });

  it("returns a scaled cover art url", async () => {
    const result = getScaledCoverArtUrl("ar-1", "256", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(result).toBe(
      "https://example.com/rest/getCoverArt.view?id=ar-1&size=256&auth",
    );
  });
});
