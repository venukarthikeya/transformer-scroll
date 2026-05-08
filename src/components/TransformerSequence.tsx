"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

const TOTAL_FRAMES = 192; // Assuming the transformer sequence goes up to 192 as mentioned, but let me double check the directory

export function TransformerSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/transformer-sequence/${String(i).padStart(3, "0")}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;

    // Load first image
    if (images[0]) {
      images[0].onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          if (context) {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
          }
        }
      }
    }
  }, []);

  // Update canvas on frame change
  useEffect(() => {
    const updateCanvas = (latestFrame: number) => {
      const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latestFrame) - 1));
      const image = imagesRef.current[index];
      const canvas = canvasRef.current;

      if (image && image.complete && canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          // Keep canvas sized correctly
          if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }
          context.clearRect(0, 0, canvas.width, canvas.height);
          // Simple cover drawing
          const canvasAspect = canvas.width / canvas.height;
          const imageAspect = image.width / image.height;
          let drawWidth = canvas.width;
          let drawHeight = canvas.height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasAspect > imageAspect) {
             drawHeight = canvas.width / imageAspect;
             offsetY = (canvas.height - drawHeight) / 2;
          } else {
             drawWidth = canvas.height * imageAspect;
             offsetX = (canvas.width - drawWidth) / 2;
          }

          context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    };

    const unsubscribe = frameIndex.on("change", updateCanvas);

    const handleResize = () => {
       updateCanvas(frameIndex.get());
    };
    window.addEventListener("resize", handleResize);

    return () => {
       unsubscribe();
       window.removeEventListener("resize", handleResize);
    };
  }, [frameIndex]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
    </div>
  );
}
