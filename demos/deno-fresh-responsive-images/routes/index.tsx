import { asset, Head } from "$fresh/runtime.ts";
import { Image } from "npm:@unpic/preact";

export default function Home() {
  const imageHost = "http://localhost:8000"
  return (
    <>
      <Head>
      <link rel="stylesheet" href={asset("/fonts.css")} />
        <link rel="stylesheet" href={asset("/global.css")} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <title>Fresh App</title>
      </Head>
      <main className="wrapper">
        <h1 className="heading">FRESH!</h1>
        <section class="images">
      <Image
          src={`${imageHost}/api/images/dinosaur-selfie.png`}
          layout="constrained"
          width={128}
          height={128}
          alt="A dinosaur posing for a selfie"
          cdn="imgix"
        />
        <Image
          src={`${imageHost}/api/images/dinosaur-selfie.png`}
          loading="eager"
          layout="constrained"
          width={256}
          height={256}
          alt="A dinosaur posing for a selfie"
          cdn="imgix"
        />
        <Image
          src={`${imageHost}/api/images/dinosaur-selfie.png`}
          layout="constrained"
          width={64}
          height={64}
          alt="A dinosaur posing for a selfie"
          cdn="imgix"
        />
        </section>
      </main>
    </>
  );
}
