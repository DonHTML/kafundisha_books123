"use client";

import { useState } from "react";
import { WhatsAppIcon, BookOpenIcon, SearchIcon, XIcon, FilterIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

export default function ShopClient({ initialProducts }: { initialProducts: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = initialProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white pb-32">
            <section className="relative py-24 px-6 overflow-hidden bg-zinc-50">
                <div className="blob bg-primary/10 w-[600px] h-[600px] -top-24 left-1/2 -translate-x-1/2" />
                <div className="relative z-10 mx-auto max-w-7xl text-center">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Catalog</span>
                    <h1 className="mt-4 text-5xl font-black uppercase tracking-tighter text-zinc-900 md:text-8xl">
                        Our <span className="text-primary italic">Bookshelf</span>
                    </h1>
                    <p className="mt-8 mx-auto max-w-2xl text-xl text-zinc-500 font-medium mb-12">
                        Affordable, high-quality learning materials for every stage of early childhood education.
                    </p>

                    {/* Search and Filters */}
                    <div className="max-w-2xl mx-auto flex flex-col gap-6">
                        <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                <SearchIcon className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search books, flashcards, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-16 rounded-full bg-white border border-zinc-200 pl-14 pr-16 text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                                >
                                    <XIcon className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                            ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                                            : "bg-white border border-zinc-200 text-zinc-500 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 -mt-12 relative z-20">
                {filteredProducts.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product: any) => (
                            <div
                                key={product.id || product.name}
                                className="group flex flex-col justify-between overflow-hidden rounded-[3rem] bg-white border border-zinc-100 p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <div>
                                    <div className={`relative mb-8 aspect-[4/3] overflow-hidden rounded-[2rem] ${product.color_class || 'bg-zinc-50'} flex items-center justify-center`}>
                                        {product.image_url ? (
                                            <div className="relative h-full w-full">
                                                <Image
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                        ) : (
                                            <BookOpenIcon className="h-24 w-24 text-zinc-200 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                                        )}
                                        <div className="absolute inset-x-6 top-6">
                                            <span className="inline-block rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 shadow-sm">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tight text-zinc-900 mb-4 uppercase italic">
                                        {product.name}
                                    </h3>
                                    <div className="h-16">
                                        <p className="text-zinc-500 font-medium mb-8 leading-relaxed line-clamp-2 uppercase tracking-wide text-xs">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-4xl font-black text-primary">{product.price.startsWith('K') ? product.price : `K${product.price}`}</span>
                                    </div>
                                    <Link
                                        href={`https://wa.me/260977755766?text=Hi! I'd like to order ${product.name}.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-center gap-3 w-full rounded-2xl bg-zinc-900 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-primary shadow-lg shadow-zinc-900/10 hover:shadow-primary/20"
                                    >
                                        <WhatsAppIcon className="h-5 w-5" />
                                        Order on WhatsApp
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center animate-in fade-in duration-500">
                        <div className="mx-auto w-24 h-24 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 mb-8">
                            <SearchIcon className="h-12 w-12" />
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 mb-4">No matches found</h3>
                        <p className="text-xl text-zinc-500 mb-12">We couldn't find any products matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="bg-zinc-900 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
