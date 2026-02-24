"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 150;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/transformer-sequence/${String(i).padStart(3, "0")}.jpg`;
      images.push(img);
    }

    const render = (index: number) => {
      if (!images[index]) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / scrollHeight;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * TOTAL_FRAMES)
      );

      render(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);

    images[0].onload = () => render(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "500vh" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
}