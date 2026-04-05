"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const notes = [
  {
    id: 1,
    preview: "You make every room brighter ✨",
    message: "Wherever you go, you carry sunshine with you. The way you laugh, the way you care — it's impossible not to feel lighter around you. Happy Birthday, sunshine! ☀️",
    rotation: -6,
  },
  {
    id: 2,
    preview: "Thank you for being you 🌸",
    message: "There are no words big enough to say just how grateful I am that you exist in this world. Your kindness, warmth, and spirit are unlike anything I've ever known. 🌸",
    rotation: 4,
  },
  {
    id: 3,
    preview: "Some things I'll never forget 💭",
    message: "Every moment spent with you has left a mark on my heart. The little memories, the laughter, the silences — all of it is treasured more than you know. 💭",
    rotation: -3,
  },
  {
    id: 4,
    preview: "My birthday wish for you 🎂",
    message: "I wish for you a year full of beautiful surprises, deep peace, and the most amazing version of your life yet. You deserve every single magical thing. 🎂🧡",
    rotation: 7,
  },
  {
    id: 5,
    preview: "A reminder for today 💙",
    message: "On days when you feel unsure — remember that you are enough. More than enough. You are extraordinary, and today the whole world is celebrating you. 💙",
    rotation: -5,
  },
];

export default function FloatingNotes() {
  const [openNote, setOpenNote] = useState<typeof notes[0] | null>(null);

  return (
    <section className="w-full min-h-[90vh] bg-[#020202] flex flex-col items-center justify-center px-6 py-24 overflow-hidden relative">
      {/* Soft blur glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#97bbf4]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16 z-10"
      >
        <span className="text-[#97bbf4]/60 text-[11px] tracking-[0.3em] uppercase font-semibold">Just for you</span>
        <h2 className="text-4xl md:text-5xl font-light text-white mt-3 tracking-tight">Floating Notes 💌</h2>
        <p className="text-white/30 text-sm mt-3">Tap any note to read it</p>
      </motion.div>

      {/* Notes grid */}
      <div className="z-10 flex flex-wrap justify-center gap-6 max-w-[900px] w-full">
        {notes.map((note, i) => (
          <motion.button
            key={note.id}
            onClick={() => setOpenNote(note)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            animate={{ y: [0, -8, 0] }}
            whileHover={{ scale: 1.06, rotate: 0, boxShadow: "0 0 40px rgba(151,187,244,0.25)" }}
            style={{ rotate: note.rotation, transition: "box-shadow 0.3s" } as React.CSSProperties}
            className="w-[180px] md:w-[200px] h-[180px] bg-[#0f0f0f] border border-[#97bbf4]/15 rounded-[24px] flex flex-col items-center justify-center p-5 text-center shadow-xl cursor-pointer"
          >
            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <p className="text-white/70 text-sm font-light leading-relaxed">{note.preview}</p>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openNote && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenNote(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="max-w-[440px] w-full bg-[#0f0f0f] border border-[#97bbf4]/20 rounded-[32px] p-8 text-center shadow-[0_0_60px_rgba(151,187,244,0.2)] relative"
            >
              <button onClick={() => setOpenNote(null)} className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors">
                <X size={20} />
              </button>
              <p className="text-white/90 text-lg font-light leading-relaxed">{openNote.message}</p>
              <div className="mt-6 w-10 h-[1px] bg-[#97bbf4]/30 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
