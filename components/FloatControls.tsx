"use client";

import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/Icons";
import { ChevronUpIcon } from "lucide-react";

export default function FloatControls() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 shadow-2xl transition-all duration-300 hover:text-zinc-900 hover:border-zinc-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
                    }`}
            >
                <ChevronUpIcon size={20} strokeWidth={2.5} />
            </button>

            {/* WhatsApp Chat */}
            <a
                href="https://wa.me/260977755766"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-16 w-16 items-center justify-center rounded-3xl bg-green-500 text-white shadow-2xl shadow-green-500/20 transition-all hover:scale-110 active:scale-95"
            >
                <WhatsAppIcon className="h-8 w-8" />
                <span className="absolute right-full mr-4 whitespace-nowrap rounded-xl bg-zinc-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Need Help? Chat with us
                </span>
            </a>
        </div>
    );
}
