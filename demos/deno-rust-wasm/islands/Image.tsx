import { useEffect, useRef } from "preact/hooks";

interface ImageProps {
  alt: string;
  placeholder: string;
  src: string;
}

export default function Image({ alt, placeholder, src }: ImageProps) {
  const imageElement = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageElement.current) {
      imageElement.current.src = src;
    }
  }, [src]);

  return (
    <figure className="image-wrapper">
      <img
        ref={imageElement}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        height="256"
        width="256"
        src={placeholder}
      />
    </figure>
  );
}
