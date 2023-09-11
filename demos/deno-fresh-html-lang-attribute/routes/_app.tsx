import { asset } from "$fresh/runtime.ts";
import type { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>my-fresh-project</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/manifest.webmanifest")} />
        <link
          rel="alternate"
          title="Rodney Lab Camera Blog"
          href="/rss.xml"
          type="application/rss+xml"
        />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
