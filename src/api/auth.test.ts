import axios from "axios";
import md5 from "md5";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  generateAuthParams,
  generateAuthParamsObject,
  ping,
  sanitizeServer,
} from "./auth";

describe(generateAuthParamsObject, async () => {
  beforeEach(() => {
    vi.mock("uuid", () => {
      return { v4: () => "test" };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return an object containing the required auth values", async () => {
    const result = generateAuthParamsObject({
      username: "username",
      password: "password",
    });

    expect(result.u).toBe("username");
    expect(result.t).toBe(md5(`passwordtest`));
    expect(result.s).toBe("test");
  });
});

describe(generateAuthParams, async () => {
  beforeEach(() => {
    vi.mock("uuid", () => {
      return { v4: () => "test" };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a string containing the required auth values", async () => {
    const result = generateAuthParams({
      username: "username",
      password: "password",
    });

    expect(result).toBe(
      `u=username&t=${md5(`passwordtest`)}&s=test&v=1.15.0&c=react-airsonic&f=json`,
    );
  });
});

describe(sanitizeServer, async () => {
  it.each([["http://example.com"], ["https://example.com"]])(
    "passes with a valid url %s",
    async (url) => {
      expect(sanitizeServer(url)).toBe(url);
    },
  );

  it.each([[""], ["notaurl"], ["example.com"]])(
    "fails with an invalid url %s",
    async (url) => {
      expect(() => sanitizeServer(url as string)).toThrowError(
        `Invalid Server URL ${url}`,
      );
    },
  );
});

describe(ping, async () => {
  beforeEach(() => {
    vi.mock("axios");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns authenticated on success", async () => {
    const axiosGetMock = vi.mocked(axios.get);

    axiosGetMock.mockResolvedValue({
      data: {
        "subsonic-response": {
          status: "ok",
        },
      },
    });

    const res = await ping({
      server: "https://example.com",
      username: "username",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res.authenticated).toBe(true);
  });

  it("returns unauthenticated on failure", async () => {
    const axiosGetMock = vi.mocked(axios.get);

    axiosGetMock.mockResolvedValue({
      data: {
        "subsonic-response": {
          status: "failed",
        },
      },
    });

    const res = await ping({
      server: "https://example.com",
      username: "username",
      password: "password",
    });

    expect(axiosGetMock).toHaveBeenCalledOnce();
    expect(res.authenticated).toBe(false);
  });
});
