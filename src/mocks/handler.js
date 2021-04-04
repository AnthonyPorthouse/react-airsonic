import { rest } from "msw";

export const handlers = [
  rest.get("/rest/ping", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "subsonic-response": {
          status: "ok",
          version: "1.15.0",
        },
      })
    );
  }),
];
