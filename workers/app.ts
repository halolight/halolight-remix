import { createRequestHandler } from "@react-router/cloudflare";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Import from built server output
import * as serverBuild from "../build/server/index.js";

declare module "react-router" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppLoadContext {}
}

interface Env {
  ASSETS: Fetcher;
}

const requestHandler = createRequestHandler({
  build: serverBuild,
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (requestHandler as any)({
      request,
      env,
      waitUntil: ctx.waitUntil.bind(ctx),
      passThroughOnException: ctx.passThroughOnException.bind(ctx),
    });
  },
} satisfies ExportedHandler<Env>;
