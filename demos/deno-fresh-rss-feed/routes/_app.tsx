import { asset } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html en-GB>
      <head>
        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />
        <link rel="manifest" href={asset("/manifest.webmanifest")} />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
