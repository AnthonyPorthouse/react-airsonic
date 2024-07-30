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
    sanitizeServerMock.mockReturnValueOnce("http://example.com");

    expect(
      getCoverArtUrl("ar-1", { server: "", username: "", password: "" }),
    ).toBe("http://example.com/rest/getCoverArt.view?id=ar-1&auth");
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
    sanitizeServerMock.mockReturnValueOnce("http://example.com");

    expect(
      getScaledCoverArtUrl("ar-1", "256", {
        server: "",
        username: "",
        password: "",
      }),
    ).toBe("http://example.com/rest/getCoverArt.view?id=ar-1&size=256&auth");
  });
});
