import axios from "axios";
import md5 from "md5";
import { nanoid } from "nanoid";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  generateAuthParams,
  generateAuthParamsObject,
  ping,
  sanitizeServer,
} from "./auth";

beforeAll(() => {
  vi.mock("nanoid");
  vi.mocked(nanoid).mockReturnValue("nanoid");
});

describe(generateAuthParamsObject, async () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should return an object containing the required auth values", async () => {
    const result = generateAuthParamsObject({
      username: "username",
      password: "password",
    });

    expect(result.u).toBe("username");
    expect(result.s).toBe("nanoid");
    expect(result.t).toBe(md5("passwordnanoid"));
    expect(result.v).toBe("1.15.0");
    expect(result.c).toBe("react-airsonic");
    expect(result.f).toBe("json");
  });
});

describe(generateAuthParams, async () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a string containing the required auth values", async () => {
    const result = generateAuthParams({
      username: "username",
      password: "password",
    });

    expect(result).toBe(
      `u=username&t=${md5("passwordnanoid")}&s=nanoid&v=1.15.0&c=react-airsonic&f=json`,
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

    expect(axiosGetMock).toHaveBeenCalledExactlyOnceWith(
      "https://example.com/rest/ping.view",
      {
        params: {
          u: "username",
          t: md5("passwordnanoid"),
          s: "nanoid",
          v: "1.15.0",
          c: "react-airsonic",
          f: "json",
        },
      },
    );
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
