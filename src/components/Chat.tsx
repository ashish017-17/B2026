"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetch("/api/chat")
      .then(res => res.json())
      .then(data => {
         if (data.messages) setMessages(data.messages);
      });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const optimisticMessage: Message = {
      id: Date.now(),
      sender: "Me",
      text,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, optimisticMessage]);
    setText("");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "Me", text: optimisticMessage.text })
      });
      if (!res.ok) throw new Error("Failed to send");
      const data = await res.json();
      setMessages(prev => prev.map(m => m.id === optimisticMessage.id ? data.message : m));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="chat" className="w-full py-32 bg-[#050505] flex justify-center items-center px-4">
      <div className="w-full max-w-2xl flex flex-col h-[600px]">
         <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Drop a Message</h2>
           <p className="text-white/40 text-lg">Send your wishes directly here.</p>
         </div>

         <div className="flex-1 bg-[#111] backdrop-blur-xl rounded-[32px] p-2 md:p-4 flex flex-col shadow-2xl border border-white/10 overflow-hidden relative">
           {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
             {messages.length === 0 ? (
               <div className="h-full flex items-center justify-center text-white/20 text-sm">
                 No messages yet. Be the first!
               </div>
             ) : (
               messages.map((msg) => (
                 <motion.div 
                   key={msg.id}
                   initial={{ opacity: 0, scale: 0.95, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className={`flex flex-col p-4 rounded-2xl w-max max-w-[85%] ${
                     msg.sender === "Me" || msg.sender === "Guest" 
                     ? "bg-white text-black self-end ml-auto rounded-tr-sm" 
                     : "bg-white/10 text-white self-start mr-auto rounded-tl-sm"
                   }`}
                 >
                   <p className="text-[15px] leading-relaxed">{msg.text}</p>
                   <span className={`text-[10px] mt-2 opacity-50 ${msg.sender === "Me" ? "text-right" : "text-left"}`}>
                     {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </span>
                 </motion.div>
               ))
             )}
             <div ref={endRef} />
           </div>

           {/* Input Area */}
           <div className="mt-2 bg-black/40 p-2 md:p-3 rounded-full border border-white/5 flex items-center shrink-0">
             <input 
               type="text" 
               className="flex-1 bg-transparent border-none outline-none text-white px-5 text-[15px] placeholder:text-white/30"
               placeholder="Type your message..."
               value={text}
               onChange={(e) => setText(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSend()}
             />
             <button 
               onClick={handleSend}
               className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 hover:scale-105 transition-all shadow-lg"
             >
               <Send size={18} className="-ml-0.5 mt-0.5" />
             </button>
           </div>
         </div>
      </div>
    </section>
  );
}
