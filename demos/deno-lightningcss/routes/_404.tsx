import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div>
        <div>
          <img
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1>404 - Page not found</h1>
          <p>
            The page you were looking for doesn&rsquo;t exist.
          </p>
          <a href="/">Go back home</a>
        </div>
      </div>
    </>
  );
}
