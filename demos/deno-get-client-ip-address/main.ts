import "$std/dotenv/load.ts";
import { healthCheck } from "@/routes/health_check.ts";
import { logRequest } from "@/utilities/logging.ts";

const PORT = 8080;

function remoteAddress(
  connectionInfo: Deno.ServeHandlerInfo
): string | undefined {
  const { remoteAddr } = connectionInfo;
  if (!("hostname" in remoteAddr)) {
    return undefined;
  }

  const { hostname } = remoteAddr;
  return hostname;
}

const handler: Deno.ServeHandler = (request, connectionInfo) => {
  const { method, url } = request;
  const { pathname } = new URL(url);
  logRequest(request);

  switch (pathname) {
    case "/health_check": {
      if (method === "GET") {
        const response = healthCheck();
        return response;
      }
      const response = new Response("Method Not Allowed, {status: 405}");
      return response;
    }
    case "/v0/ip-example": {
      if (method === "GET") {
        const { headers } = request;

        const denoIP = remoteAddress(connectionInfo);
        const xForwardedIP = headers.get("X-Forwarded-For") ?? undefined;
        const cloudflareIP = headers.get("CF-Connecting-IP") ?? undefined;

        console.log({ denoIP, xForwardedIP, cloudflareIP });

        const finalAnswer = cloudflareIP ?? xForwardedIP ?? denoIP;

        console.log({ finalAnswer });

        const response = new Response("OK");
        return response;
      }

      const response = new Response("Method Not Allowed, {status: 405}");
      return response;
    }
    default: {
      const response = new Response("Not Found", { status: 404 });
      return response;
    }
  }
};

Deno.serve({ port: PORT }, handler);
