"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import TextOverlay from "./TextOverlay";

const TOTAL_FRAMES = 120;

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Zoom effect mapped 1.0 -> 1.15 over the scroll progress
    const scale = useTransform(smoothProgress, [0, 1], [1.0, 1.15]);

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

        const { width: cWidth, height: cHeight } = canvas;
        const { width: iWidth, height: iHeight } = currentImage;

        const drawScale = Math.min(cWidth / iWidth, cHeight / iHeight);
        const x = (cWidth / 2) - (iWidth / 2) * drawScale;
        const y = (cHeight / 2) - (iHeight / 2) * drawScale;

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(currentImage, x, y, iWidth * drawScale, iHeight * drawScale);
    }, [images]);

    // Handle Resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const currentScroll = smoothProgress.get();
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(currentScroll * TOTAL_FRAMES)
            );
            if (images.length > 0) drawFrame(frameIndex);
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

        drawFrame(0);
        return () => unsubscribe();
    }, [images, drawFrame, smoothProgress]);

    const isLoaded = loadedCount >= TOTAL_FRAMES;

    return (
        <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
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
                <motion.canvas
                    ref={canvasRef}
                    style={{ scale }}
                    className="w-full h-full object-contain origin-center"
                />

                <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                    {/* Scroll indicator - Fades out early based on progress */}
                    <motion.div
                        style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0.6, 0]) }}
                        className="absolute top-[80vh] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-pulse"
                    >
                        <span className="text-white/60 tracking-[0.2em] text-sm uppercase mb-4">Scroll to Explore</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
                    </motion.div>

                    {/* Beat A — 5–25% Scroll */}
                    <TextOverlay start={0.05} end={0.25} progress={smoothProgress} className="flex flex-col items-center justify-center text-center px-6">
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-2xl">
                            EXPLOSIVE REFRESHMENT
                        </h1>
                        <p className="text-xl md:text-3xl text-white/60 font-light max-w-2xl mx-auto tracking-wide">
                            Experience the ultimate collision of artisan matcha and rich espresso.
                        </p>
                    </TextOverlay>

                    {/* Beat B — 30–50% Scroll */}
                    <TextOverlay start={0.3} end={0.5} progress={smoothProgress} className="flex flex-col items-start justify-center text-left px-8 md:px-24">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-6 w-full max-w-4xl drop-shadow-2xl">
                            EARTHY MATCHA
                        </h2>
                        <p className="text-lg md:text-2xl text-white/60 font-light max-w-xl tracking-wide">
                            Vibrant, smooth, and perfectly chilled.
                        </p>
                    </TextOverlay>

                    {/* Beat C — 55–75% Scroll */}
                    <TextOverlay start={0.55} end={0.75} progress={smoothProgress} className="flex flex-col items-end justify-center text-right px-8 md:px-24 w-full">
                        <div className="max-w-4xl ml-auto">
                            <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-6 drop-shadow-2xl">
                                BOLD ESPRESSO
                            </h2>
                            <p className="text-lg md:text-2xl text-white/60 font-light max-w-xl ml-auto tracking-wide">
                                A striking dark roast colliding in mid-air, creating a masterpiece of fluid dynamics.
                            </p>
                        </div>
                    </TextOverlay>

                    {/* Beat D — 80–98% Scroll */}
                    <TextOverlay start={0.8} end={0.98} progress={smoothProgress} className="flex flex-col items-center justify-center text-center px-6">
                        <h2 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-8 drop-shadow-2xl">
                            TASTE THE COLLISION
                        </h2>
                        <p className="text-xl md:text-3xl text-white/60 font-light max-w-2xl mx-auto tracking-wide mb-12">
                            Available now at our flagship stores.
                        </p>
                    </TextOverlay>
                </div>
            </div>
        </div>
    );
}
