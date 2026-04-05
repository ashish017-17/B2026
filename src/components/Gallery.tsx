"use client";

import { motion } from "framer-motion";

const images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
  "/images/7.jpeg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="w-full py-32 bg-black px-4 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-20 tracking-tight text-center">
          Gallery
        </h2>
        
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <motion.div 
              key={idx}
              className="relative overflow-hidden rounded-2xl break-inside-avoid shadow-2xl bg-white/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
            >
              <img 
                src={src} 
                alt={`Memory ${idx+1}`} 
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
