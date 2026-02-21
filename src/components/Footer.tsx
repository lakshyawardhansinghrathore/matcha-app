"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#0f0f11] border-t border-white/10 pt-20 pb-10 px-6 md:px-12 relative z-10 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                <div className="flex flex-col space-y-6">
                    <h2 className="text-white/90 font-bold tracking-widest uppercase text-2xl">Artisan</h2>
                    <p className="text-white/50 font-light tracking-wide max-w-sm text-sm leading-relaxed">
                        Elevating the coffee and matcha experience through obsessive sourcing, roasting, and preparation.
                    </p>
                    <div className="flex space-x-6 pt-4">
                        <Instagram className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                        <Mail className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>

                <div className="flex flex-col space-y-6 md:items-end">
                    <h3 className="text-white/90 font-medium tracking-widest uppercase text-sm">Join the Club</h3>
                    <p className="text-white/50 font-light tracking-wide text-sm md:text-right max-w-sm">
                        Subscribe for early access to limited edition single origins and exclusive merchandise.
                    </p>
                    <div className="flex w-full max-w-md mt-2 relative">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="w-full bg-transparent border-b border-white/20 pb-3 text-white/90 text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                        />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-0 bottom-3 text-white/90 text-xs tracking-widest uppercase hover:text-white transition-colors"
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 mt-8 text-xs text-white/40 tracking-widest uppercase">
                <p>© 2026 Artisan Roasters. All rights reserved.</p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    <span className="cursor-pointer hover:text-white/80 transition-colors">Privacy</span>
                    <span className="cursor-pointer hover:text-white/80 transition-colors">Terms</span>
                </div>
            </div>
        </footer>
    );
}
