import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();
app.use("*", logger());
app.use("*", prettyJSON({ space: 2 }));

// app.notFound((ctx) => {
// const params = ctx.req.param();
//   return ctx.json({ message: "Not Found", ok: false }, 404);
// });

app.get("/hello", (ctx) => {
  const query = ctx.req.query();

  const message = query
    ? `Hello, Cloudflare Pages! query string is ${JSON.stringify(query)}`
    : `Hello, Cloudflare Pages!`;

  return ctx.json({ message });
});

app.get("/users/:username", (ctx) => {
  const { username } = ctx.req.param();
  return ctx.text(`Hello ${username}`);
});

// app.get("/jsx", (ctx) => {
//   console.log("🚀 ~ Layout ~ style:", style);
//   const messages = ["Good Morning", "Good Evening", "Good Night"];
//   return ctx.html(<Top messages={messages} />);
// });

export const onRequest = handle(app, "/api");
