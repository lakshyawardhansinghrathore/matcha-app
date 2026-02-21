"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [vh, setVh] = useState(1000);

    useEffect(() => {
        setVh(window.innerHeight);
        const handleResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fade in after scrolling past the 400vh hero section
    const opacity = useTransform(scrollY, [vh * 3.5, vh * 3.8], [0, 1]);

    return (
        <motion.nav
            style={{ opacity }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/10"
        >
            <div className="flex items-center gap-4">
                <span className="text-white/90 font-bold tracking-widest uppercase text-lg cursor-pointer">Artisan</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-white/60 text-sm tracking-widest uppercase cursor-pointer">
                <span className="hover:text-white transition-colors duration-300">Shop</span>
                <span className="hover:text-white transition-colors duration-300">Roasts</span>
                <span className="hover:text-white transition-colors duration-300">About</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative cursor-pointer">
                    <ShoppingBag className="w-5 h-5 text-white/90" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                        2
                    </span>
                </div>
                <Menu className="w-6 h-6 text-white/90 md:hidden cursor-pointer" />
            </div>
        </motion.nav>
    );
}
