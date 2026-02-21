"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface TextOverlayProps {
    start: number;
    end: number;
    progress: MotionValue<number>;
    children: ReactNode;
    className?: string;
}

export default function TextOverlay({
    start,
    end,
    progress,
    children,
    className = "",
}: TextOverlayProps) {
    // Opacity Mapping: [start, start + 0.05, end - 0.05, end] → [0, 1, 1, 0]
    const opacity = useTransform(
        progress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    // Vertical Motion Mapping: enter: 20px -> 0, exit: 0 -> -20px
    const y = useTransform(
        progress,
        [start, start + 0.05, end - 0.05, end],
        [20, 0, 0, -20]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 z-10 pointer-events-none ${className}`}
        >
            <div className="pointer-events-auto w-full">{children}</div>
        </motion.div>
    );
}
