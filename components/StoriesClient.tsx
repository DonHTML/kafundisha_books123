"use client";

import { useState } from "react";
import { YoutubeIcon, ArrowUpRightIcon, SearchIcon, XIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

export default function StoriesClient({ initialStories }: { initialStories: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(initialStories.map(s => s.category)))];

    const filteredStories = initialStories.filter(story => {
        const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || story.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-white pb-32">
            <section className="relative py-24 px-6 overflow-hidden bg-zinc-50">
                <div className="blob bg-blue-200/30 w-[600px] h-[600px] top-0 -right-24" />
                <div className="relative z-10 mx-auto max-w-7xl text-center">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Media Lab</span>
                    <h1 className="mt-4 text-5xl font-black uppercase tracking-tighter text-zinc-900 md:text-8xl">
                        Kafundisha <span className="text-primary italic">Stories</span>
                    </h1>
                    <p className="mt-8 mx-auto max-w-2xl text-xl text-zinc-500 font-medium mb-12">
                        Animated tales, traditional folktales, and read-alouds brought to life for the next generation.
                    </p>

                    {/* Search and Filters */}
                    <div className="max-w-2xl mx-auto flex flex-col gap-6">
                        <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                <SearchIcon className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search stories, folktales, or topics..."
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
                                            ? "bg-zinc-900 text-white shadow-xl scale-105"
                                            : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
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
                {filteredStories.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredStories.map((story: any) => (
                            <div
                                key={story.id || story.title}
                                className="group flex flex-col overflow-hidden rounded-[3rem] bg-white border border-zinc-100 transition-all hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={story.thumbnail_url || `https://img.youtube.com/vi/${story.youtube_id}/maxresdefault.jpg`}
                                        alt={story.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute inset-x-6 top-6">
                                        <span className="inline-block rounded-full bg-white/90 backdrop-blur px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 shadow-sm">
                                            {story.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-primary shadow-2xl">
                                            <YoutubeIcon className="h-8 w-8" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-8">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-4 line-clamp-1 italic">
                                        {story.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-medium mb-8 leading-relaxed line-clamp-3">
                                        {story.description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            href={`https://youtube.com/watch?v=${story.youtube_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full rounded-2xl bg-zinc-50 p-6 text-[10px] font-black uppercase tracking-widest text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white group/btn"
                                        >
                                            Watch on YouTube
                                            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center animate-in fade-in duration-500">
                        <div className="mx-auto w-24 h-24 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 mb-8">
                            <SearchIcon className="h-12 w-12" />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-4">No stories found</h3>
                        <p className="text-zinc-500 mb-12 uppercase text-[10px] font-bold tracking-widest">Adjust your search or category filters</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="bg-zinc-900 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
                        >
                            Show All Stories
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
