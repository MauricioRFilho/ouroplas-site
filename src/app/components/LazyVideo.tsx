"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
}

export default function LazyVideo({ src, poster, className, overlayClassName }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Ignore play errors (mostly due to browser policies)
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.1, // Play when 10% is visible
        rootMargin: "100px", // Start loading 100px before it enters the viewport
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
