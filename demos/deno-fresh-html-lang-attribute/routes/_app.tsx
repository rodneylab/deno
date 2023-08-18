import type { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en-GB">
      <body>
        <Component />
      </body>
    </html>
  );
}
