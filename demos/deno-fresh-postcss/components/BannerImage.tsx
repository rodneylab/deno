import { asset } from "$fresh/runtime.ts";

export default function BannerImage() {
  return (
    <figure className="banner-image-wrapper">
      <picture>
        <source
          sizes="(max-width: 768px) 100vw, 768px"
          srcset="/lemon.ae4732da.avif 1536w, /lemon.707e4d2c.avif 768w"
          type="image/avif"
        />
        <source
          sizes="(max-width: 768px) 100vw, 768px"
          srcset="/lemon.4419bc0f.webp 1536w, /lemon.4f16b82e.webp 768w"
          type="image/webp"
        />
        <source
          sizes="(max-width: 768px) 100vw, 768px"
          srcset="/lemon.ce0b71ab.jpeg 1536w, /lemon.5f0650d2.jpeg 768w"
          type="image/jpeg"
        />
        <img
          alt="Picture of a lemon"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          height="432"
          width="768"
          src={asset("/lemon.5f0650d2.jpeg")}
        />
      </picture>
      <figcaption className="image-caption">
        Image credit:{" "}
        <a href="https://unsplash.com/@francescocantinellifoto">
          Francesco Cantinelli
        </a>
      </figcaption>
    </figure>
  );
}
