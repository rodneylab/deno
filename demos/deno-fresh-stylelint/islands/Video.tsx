import { Button } from "@/components/Button.tsx";
import { useState } from "preact/hooks";

export default function Video() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <figure class="video-container">
      {!showVideo
        ? (
          <Button
            onClick={() => {
              setShowVideo(true);
            }}
          >
            📼 Click to enable YouTube video playback
          </Button>
        )
        : (
          <iframe
            class="video"
            width="768"
            height="432"
            loading="lazy"
            src="https://www.youtube-nocookie.com/embed/4boXExbbGCk"
            title="a fresh new web framework is out"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        )}
      <figcaption>Fireship: A fresh new web framework is out!</figcaption>
    </figure>
  );
}
