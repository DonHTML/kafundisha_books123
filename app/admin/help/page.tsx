"use client";

import {
    BookOpenIcon,
    ShoppingBagIcon,
    PlayIcon,
    UsersIcon,
    SettingsIcon,
    ArrowRightIcon,
    CheckCircle2 as CheckCircle2Icon,
    Info as InfoIcon
} from "lucide-react";
import Link from "next/link";

export default function AdminHelp() {
    const guides = [
        {
            title: "Adding a New Book",
            description: "Go to Products > Create Product. Fill in the name, price, and description. You can upload a photo directly from your phone/computer or paste a link.",
            icon: <ShoppingBagIcon className="text-orange-500" />
        },
        {
            title: "Managing Media Lab",
            description: "Go to Stories & Media. To add a YouTube video, just paste the 'ID' (the letters after v= in the link). You can also upload custom cover images.",
            icon: <PlayIcon className="text-blue-500" />
        },
        {
            title: "Handling Teacher Requests",
            description: "When a teacher fills out the form on your site, they appear in 'Teachers & Partners'. Click the WhatsApp button to chat with them instantly!",
            icon: <UsersIcon className="text-green-500" />
        },
        {
            title: "Changing your Access Key",
            description: "Found under 'Site Settings'. This is the password you use to log in to this workspace. Keep it safe!",
            icon: <SettingsIcon className="text-zinc-500" />
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="text-center space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 text-primary mb-4">
                    <InfoIcon size={40} strokeWidth={2.5} />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-5xl">
                    Admin <span className="text-primary italic">Support Hub</span>
                </h1>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">Everything you need to know about managing Kafundisha</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {guides.map((guide, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all group">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 group-hover:scale-110 transition-transform">
                            {guide.icon}
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-4">{guide.title}</h3>
                        <p className="text-xs font-bold text-zinc-500 uppercase leading-loose tracking-widest">{guide.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-900 rounded-[3rem] p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,112,21,0.2)_0%,transparent_50%)]" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Still Need <span className="text-primary italic">Assistance?</span></h2>
                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-10 max-w-md mx-auto leading-relaxed">If you're stuck or notice something unusual, contact your developer directly.</p>
                    <a
                        href="https://wa.me/260977755766"
                        target="_blank"
                        className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-zinc-900 hover:bg-primary hover:text-white transition-all shadow-xl"
                    >
                        Contact Developer
                        <ArrowRightIcon size={16} />
                    </a>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-zinc-400">
                <CheckCircle2Icon size={16} className="text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Workspace Version 2.0.0 • Verified Secure</span>
            </div>
        </div>
    );
}
