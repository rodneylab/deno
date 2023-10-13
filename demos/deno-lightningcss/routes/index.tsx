import { Head } from "$fresh/runtime.ts";
import BannerImage from "@/components/BannerImage.tsx";
import Video from "@/islands/Video.tsx";
import { Fragment } from "preact";

export default function Home() {
  return (
    <Fragment>
      <Head>
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
