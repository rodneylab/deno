import { asset } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="stylesheet" href={asset("/fonts.css")} />
        <link rel="stylesheet" href={asset("/global.css")} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
