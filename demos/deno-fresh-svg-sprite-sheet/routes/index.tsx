import { Head } from "$fresh/runtime.ts";
import BannerImage from "@/components/BannerImage.tsx";
import { DenoIcon } from "@/components/Icons/Deno.tsx";
import { LemonIcon } from "@/components/Icons/Lemon.tsx";
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
        <div class="feature">
          <DenoIcon colour="#fff" width={192} />
          <LemonIcon width={192} />
        </div>
      </main>
    </Fragment>
  );
}
