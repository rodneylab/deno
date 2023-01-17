import { asset, Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Image from "@/islands/Image.tsx";
import { base64_placeholder, instantiate } from "@/lib/rs_lib.generated.js";
import { Fragment } from "preact";

interface Data {
  placeholder: string;
}

export const handler: Handlers<Data | null> = {
  async GET(_request, context) {
    try {
      await instantiate();

      const data = await Deno.readFile("./content/dinosaur-lemon.png");
      const placeholder = base64_placeholder(data);

      return context.render({ placeholder });
    } catch (error: unknown) {
      console.error(`Error doing stuff with image file: ${error as string}`);
      return context.render(null);
    }
  },
};

export default function Home(context: PageProps<Data | null>) {
  const { data } = context;
  if (!data) {
    return (
      <Fragment>
        <div>Something went wrong!</div>
      </Fragment>
    );
  }
  const { placeholder } = data;
  return (
    <>
      <Head>
        <title>Deno Fresh 🍋 Rust WASM</title>

        <link rel="stylesheet" href={asset("/fonts.css")} />
        <link rel="stylesheet" href={asset("/global.css")} />
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/manifest.webmanifest")} />
        <title>Deno Fresh 🍋 Rust WASM</title>
        <meta
          name="description"
          content="Deno Fresh WASM: how you can code your own WASM modules in Rust 🦀 and easily integrate them into your Deno Fresh 🍋 project."
        />
      </Head>
      <main className="wrapper">
        <h1 className="heading">FRESH!</h1>
        <Image
          src="/content/dinosaur-lemon.png"
          placeholder={placeholder}
          alt="Cartoon style image of a dinosaur wiht a mouth full of lemons"
        />
      </main>
    </>
  );
}
