import { afterEach, beforeEach, describe } from "vitest";

import { getCoverArtUrl, getScaledCoverArtUrl } from "./artwork";
import { generateAuthParams, sanitizeServer } from "./auth";

describe(getCoverArtUrl, async () => {
  const authParamsMock = vi.mocked(generateAuthParams);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("./auth");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a cover art url", async () => {
    authParamsMock.mockReturnValueOnce("auth");
    sanitizeServerMock.mockReturnValueOnce("https://example.com");

    const result = getCoverArtUrl("ar-1", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(authParamsMock).toHaveBeenCalledExactlyOnceWith({
      username: "user",
      password: "password",
    });
    expect(sanitizeServerMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com",
    );

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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a scaled cover art url", async () => {
    authParamsMock.mockReturnValueOnce("auth");
    sanitizeServerMock.mockReturnValueOnce("https://example.com");

    const result = getScaledCoverArtUrl("ar-1", "256", {
      server: "https://example.com",
      username: "user",
      password: "password",
    });

    expect(authParamsMock).toHaveBeenCalledExactlyOnceWith({
      username: "user",
      password: "password",
    });
    expect(sanitizeServerMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com",
    );

    expect(result).toBe(
      "https://example.com/rest/getCoverArt.view?id=ar-1&size=256&auth",
    );
  });
});
