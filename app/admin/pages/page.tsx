"use client";

import { FileTextIcon, ChevronRightIcon, Edit3Icon, EyeIcon } from "lucide-react";

export default function PagesEditor() {
    const pages = [
        { name: "Home Page", path: "/", updated: "2d ago" },
        { name: "Shop", path: "/shop", updated: "1w ago" },
        { name: "Stories", path: "/stories", updated: "3d ago" },
        { name: "For Teachers", path: "/teachers", updated: "2w ago" },
        { name: "About Us", path: "/about", updated: "1d ago" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                    Pages <span className="text-primary italic">Editor</span>
                </h1>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    Edit text and images across your website sections
                </p>
            </div>

            <div className="grid gap-6">
                {pages.map((page) => (
                    <div key={page.name} className="group flex items-center justify-between bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all">
                        <div className="flex items-center gap-6">
                            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-primary group-hover:text-white transition-all">
                                <FileTextIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black uppercase tracking-tighter text-zinc-900">{page.name}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Public Path: <span className="text-primary">{page.path}</span> • Last update: {page.updated}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:border-primary hover:text-primary transition-all">
                                <EyeIcon size={14} />
                                Preview
                            </button>
                            <button className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all">
                                <Edit3Icon size={14} />
                                Edit Content
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 rounded-[2.5rem] bg-orange-50 border border-orange-100 flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Editor Lock Active</h4>
                    <p className="text-sm font-bold text-orange-600 uppercase tracking-widest">Advanced code editing is disabled to protect your layout.</p>
                </div>
                <div className="h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
            </div>
        </div>
    );
}
