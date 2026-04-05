"use client";

import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1530103862676-de88d1cbdbb3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516483638261-f4085eeea26e?q=80&w=600&auto=format&fit=crop",
];

export default function Gallery() {
  return (
    <section id="gallery" className="w-full py-32 bg-black px-4 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-20 tracking-tight text-center">
          Captured Memories
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
