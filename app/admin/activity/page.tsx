"use client";

import {
    ClockIcon,
    ArrowLeftIcon,
    SearchIcon,
    FilterIcon,
    ShoppingBagIcon,
    UsersIcon,
    PlayIcon,
    SettingsIcon
} from "lucide-react";
import Link from "next/link";

export default function ActivityLog() {
    const logs = [
        { id: 1, type: "system", title: "System Initialized", sub: "Cloud Link Established", time: "Jan 23, 15:45", icon: <SettingsIcon size={14} />, color: "text-zinc-400" },
        { id: 2, type: "auth", title: "Admin Login", sub: "Kafundisha Workspace Entry", time: "Jan 23, 15:30", icon: <UsersIcon size={14} />, color: "text-blue-500" },
        { id: 3, type: "prod", title: "Supabase Connected", sub: "Real-time Sync Active", time: "Jan 23, 14:10", icon: <SettingsIcon size={14} />, color: "text-green-500" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 transition-all shadow-sm"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Activity <span className="text-primary italic">Stream</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Full audit log of workspace actions and system events
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-zinc-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                    <div className="relative max-w-md w-full">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Filter by event..."
                            className="w-full rounded-xl bg-white border border-zinc-200 pl-10 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <FilterIcon size={14} />
                        Filter Log
                    </button>
                </div>

                <div className="divide-y divide-zinc-50">
                    {logs.map((log) => (
                        <div key={log.id} className="p-8 group hover:bg-zinc-50/50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className={`h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center ${log.color} group-hover:bg-white border border-transparent group-hover:border-zinc-100 transition-all`}>
                                    {log.icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900">{log.title}</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{log.sub}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 justify-end">
                                    <ClockIcon size={12} />
                                    {log.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-10 text-center bg-zinc-50/80">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        Older events are archived after 30 days.
                    </p>
                </div>
            </div>
        </div>
    );
}
