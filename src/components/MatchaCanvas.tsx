"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring } from "framer-motion";

const TOTAL_FRAMES = 162;

export default function MatchaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload Images
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
        img.onload = () => {
            loaded++;
            setLoadedCount(loaded);
            if (loaded === TOTAL_FRAMES) {
                setImages(loadedImages);
            }
        };
        img.onerror = () => {
           console.error(`Failed to load image frame ${i}`);
           // Attempting gracefully handled
           loaded++;
           setLoadedCount(loaded);
            if (loaded === TOTAL_FRAMES) {
                setImages(loadedImages);
            }
        };
        
        loadedImages.push(img);
    }
  }, []);

  // Frame Draw Logic
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentImage = images[frameIndex];
    if (!currentImage) return;

    // Responsive Canvas Scaling (Contain Fit)
    const { width: cWidth, height: cHeight } = canvas;
    const { width: iWidth, height: iHeight } = currentImage;

    const scale = Math.min(cWidth / iWidth, cHeight / iHeight);
    const x = (cWidth / 2) - (iWidth / 2) * scale;
    const y = (cHeight / 2) - (iHeight / 2) * scale;

    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(currentImage, x, y, iWidth * scale, iHeight * scale);
  }, [images]);

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-draw the current frame on resize
      const currentScroll = smoothProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(currentScroll * TOTAL_FRAMES)
      );
      if(images.length > 0) drawFrame(frameIndex);
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, smoothProgress, images.length]);

  // Scroll Sync Listener
  useEffect(() => {
    if (images.length === 0) return;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(latest * TOTAL_FRAMES)
      );
      requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Draw initial frame
    drawFrame(0);

    return () => unsubscribe();
  }, [images, drawFrame, smoothProgress]);

   const isLoaded = loadedCount >= TOTAL_FRAMES;

  return (
    <div className="relative w-full h-[400vh] bg-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white/90">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white/90 rounded-full animate-spin mb-6"></div>
            <div className="text-sm tracking-widest font-light mb-2">PREPARING EXPERIENCE</div>
            <div className="w-48 h-1 bg-white/20 overflow-hidden relative rounded">
               <div 
                 className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
                 style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                />
            </div>
        </div>
      )}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
