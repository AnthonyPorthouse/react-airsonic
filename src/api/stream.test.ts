import { generateAuthParams, sanitizeServer } from "./auth";
import { getStreamUrl } from "./stream";

describe(getStreamUrl, async () => {
  const authParamsMock = vi.mocked(generateAuthParams);
  const sanitizeServerMock = vi.mocked(sanitizeServer);

  beforeEach(() => {
    vi.mock("./auth");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a stream url", async () => {
    authParamsMock.mockReturnValueOnce("auth");
    sanitizeServerMock.mockReturnValueOnce("http://example.com");

    const result = getStreamUrl("st-1", {
      server: "",
      username: "",
      password: "",
    });

    expect(authParamsMock).toHaveBeenCalledOnce();
    expect(sanitizeServerMock).toHaveBeenCalledOnce();

    expect(result).toBe("http://example.com/rest/stream.view?id=st-1&auth");
  });
});
