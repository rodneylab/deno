import { asset, Head } from "$fresh/runtime.ts";
import BannerImage from "@/components/BannerImage.tsx";
import Video from "@/islands/Video.tsx";
import { Fragment } from "preact";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href={asset("/styles/fonts.css")} />
        <link rel="stylesheet" href={asset("/styles/global.css")} />
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/manifest.webmanifest")} />
        <link rel="preconnect" href="www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="www.youtube-nocookie.com" />
        <title>Trying Deno Fresh 🍋</title>
        <meta
          name="description"
          content="Trying out Deno Fresh: first look at the new, fast web framework from the Deno team with Island hydration and zero JS by default."
        />
      </Head>
      <main className="wrapper">
        <BannerImage />
        <h1 className="heading">FRESH</h1>
        <p className="feature">Fresh 🍋 new framework!</p>
        <Video />
      </main>
    </Fragment>
  );
}
