import { HandlerContext } from "$fresh/server.ts";
import { instantiate, resize_image } from "@/lib/rs_lib.generated.js";

await instantiate();

export const handler = async (
  request: Request,
  context: HandlerContext
): Promise<Response> => {
  if (request.method === "GET") {
    const {
      params: { file },
    } = context;
    // const { headers } = request;
    // console.log(headers.get("Accept")); // example: "image/avif,image/webp,*/*"
    
    const { url } = request;
    const { searchParams } = new URL(url);
    const width = searchParams.get("w");
    const height = searchParams.get("h");
    const fit = searchParams.get("fit");

    if (typeof width === "string" && typeof height === "string") {
      let image_bytes: Uint8Array | null = null;

      try {
        image_bytes = await Deno.readFile(`./images/${file}`);
      } catch (error: unknown) {
        if (error instanceof Deno.errors.NotFound) {
          console.error(`File "./images/${file}" not found.`);
          return new Response("Not found", {
            status: 404,
            headers: {
              "Content-Type": "text/plain",
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          });
        }
      }
      if (image_bytes) {
        const resizeOptions = {
          width: Number.parseInt(width),
          height: Number.parseInt(height),
          ...(typeof fit === "string" ? { fit } : {}),
        };
        const {
          error,
          resized_image_bytes: resizedImageBytes,
          mime_type: mimeType,
        } = resize_image(image_bytes, resizeOptions);

        if (error) {
          console.error(error);
        } else {
          return new Response(new Uint8Array(resizedImageBytes), {
            headers: {
              "Content-Type": mimeType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      }
      return new Response("Bad request", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }
  }
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
