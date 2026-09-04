import React from "react";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/data/content";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Bantuan WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat WhatsApp Admin"
      >
        <MessageSquare className="w-5 h-5" />
      </a>
    </aside>
  );
}
