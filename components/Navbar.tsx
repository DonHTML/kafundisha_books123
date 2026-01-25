"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, MenuIcon, XIcon } from "./Icons";
import { useState } from "react";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Stories", href: "/stories" },
    { name: "For Teachers", href: "/teachers" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full glass">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(249,112,21,0.2)]">
                        <BookOpenIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                            Kafundisha
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                            Books & Media
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-10 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`group relative text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-zinc-500"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === link.href ? "w-full" : "w-0"
                                }`} />
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/260977755766"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-zinc-900 px-8 py-2.5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-primary shadow-xl hover:shadow-primary/20"
                    >
                        Order Now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg font-bold uppercase tracking-widest ${pathname === link.href ? "text-primary" : "text-zinc-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/260977755766"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center rounded-2xl bg-primary py-4 font-black uppercase tracking-widest text-white shadow-xl"
                    >
                        Order on WhatsApp
                    </a>
                </div>
            )}
        </nav>
    );
}
