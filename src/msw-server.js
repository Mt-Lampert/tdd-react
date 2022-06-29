import { rest } from "msw";
import { setupServer } from "msw/node";

// const backend = "http://localhost:4000";

const server = setupServer(
  rest.post(
    "/api/1.0/users",
    (req, res, ctx) => {
      if (req.body.email.indexOf("used") !== -1) {
        return res(
          ctx.status(400),
          ctx.json({
            message: "email in use",
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          _id: "abc1234",
          name: req.body.name,
          email: req.body.email,
        })
      );
    },

    rest.post("*", (req, res, ctx) => {
      const errmsg = "Please add proper endpoint!";
      console.error(errmsg);
      return res(ctx.status(500), ctx.json({ error: errmsg }));
    })
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { rest, server };
