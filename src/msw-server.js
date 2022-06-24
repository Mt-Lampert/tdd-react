import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.put("/user", (req, res, ctx) => {
    ctx.status(200);
    ctx.json({
      _id: "abc1234",
      name: req.body.name,
      email: req.body.email,
    });

    rest.put("*", (req, res, ctx) => {
      const errmsg = "Please add proper endpoint!";
      console.error(errmsg);
      ctx.status(500);
      ctx.json({ error: errmsg });
    });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { rest, server }