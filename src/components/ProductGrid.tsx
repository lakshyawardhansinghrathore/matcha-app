"use client";

import { motion } from "framer-motion";
import { Leaf, Droplet, Coffee } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Signature Iced Matcha",
        notes: "Ceremonial Grade • Uji, Japan",
        price: "$24.00",
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Single Origin Espresso",
        notes: "Dark Roast • Antigua, Guatemala",
        price: "$18.00",
        image: "https://images.unsplash.com/photo-1514432324607-a2ebd0c1cebf?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Cold Brew Bottle",
        notes: "Steeped 24hrs • Smooth & Bold",
        price: "$32.00",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
    }
];

export default function ProductGrid() {
    return (
        <section className="w-full bg-gradient-to-b from-black to-[#0f0f11] py-32 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center justify-center text-center mb-24 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-widest text-white/90 uppercase">
                        The Collection
                    </h2>
                    <div className="h-[1px] w-24 bg-white/20"></div>
                    <p className="text-white/60 font-light tracking-wide max-w-xl text-sm md:text-base leading-relaxed">
                        Exceptionally sourced. Masterfully roasted. Explore our curated selection of premium beverages and beans.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="flex flex-col group cursor-pointer"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-md bg-[#1a1a1a]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                                    style={{ transitionProperty: 'opacity, transform' }}
                                />
                            </div>
                            <h3 className="text-xl font-medium tracking-wide text-white/90 mb-1">{product.name}</h3>
                            <p className="text-sm font-light text-white/50 mb-4 tracking-wider">{product.notes}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-lg font-light text-white/80">{product.price}</span>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 border border-white/20 text-white/90 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quality / Sourcing Banner */}
                <div className="mt-40 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <Droplet className="w-8 h-8 text-white/60 mb-6" />
                        <h4 className="text-white/90 uppercase tracking-widest text-sm mb-3">Direct Trade</h4>
                        <p className="text-white/50 text-xs font-light tracking-wider leading-relaxed max-w-[250px]">
                            We source directly from farmers, ensuring fair compensation and superior quality control.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Leaf className="w-8 h-8 text-white/60 mb-6" />
                        <h4 className="text-white/90 uppercase tracking-widest text-sm mb-3">Organic Matcha</h4>
                        <p className="text-white/50 text-xs font-light tracking-wider leading-relaxed max-w-[250px]">
                            Ceremonial grade, shade-grown leaves from the historic hills of Uji, Japan.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Coffee className="w-8 h-8 text-white/60 mb-6" />
                        <h4 className="text-white/90 uppercase tracking-widest text-sm mb-3">Small Batch Roasted</h4>
                        <p className="text-white/50 text-xs font-light tracking-wider leading-relaxed max-w-[250px]">
                            Roasted to order in small volumes to highlight each bean's unique tasting notes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
