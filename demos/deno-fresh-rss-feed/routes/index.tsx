import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rodney Lab Camera Blog</title>

        <link
          rel="alternate"
          title="Rodney Lab Camera Blog"
          href="/rss.xml"
          type="application/rss+xml"
        />
      </Head>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
      </div>
    </>
  );
}
