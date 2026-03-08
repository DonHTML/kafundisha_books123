"use client";

import { useState, useEffect } from "react";
import {
    ShoppingBagIcon,
    PlayIcon,
    UsersIcon,
    TrendingUpIcon,
    PlusIcon,
    SettingsIcon,
    ArrowRightIcon,
    ClockIcon,
    EyeIcon,
    Info as InfoIcon,
    BookMarked as BookMarkedIcon,
    Sparkles as SparklesIcon,
    CheckCircle2 as CheckCircle2Icon
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { getAdminDashboardStatsAction } from "./actions";

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [activities, setActivities] = useState([
        { id: 1, icon: <SettingsIcon size={14} />, text: "System Initialized", sub: "Workspace Ready", time: "Just now" },
    ]);
    const [stats, setStats] = useState({ products: 0, stories: 0, requests: 0, visits: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);

        // Fetch Live Data securely via Server Action
        const fetchStats = async () => {
            try {
                const result = await getAdminDashboardStatsAction();
                if (result.success && result.data) {
                    setStats(result.data);
                } else {
                    console.error("Error fetching stats:", result.error);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Dynamic Header Info */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 flex items-center justify-between bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <SparklesIcon size={120} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                            Welcome back, <span className="text-primary italic">Admin</span>
                        </h1>
                        <p className="text-zinc-400 text-xs font-bold uppercase mt-2 tracking-widest">
                            Your website is healthy and <span className="text-green-400">fully operational.</span>
                        </p>
                    </div>
                    <div className="text-right relative z-10 hidden sm:block">
                        <p className="text-3xl font-black uppercase tracking-tighter text-white font-mono leading-none">{currentTime}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-2">Workspace Clock</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100 self-start">
                        <span className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-orange-400' : 'bg-green-500'} animate-pulse`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${loading ? 'text-orange-600' : 'text-green-600'}`}>
                            {loading ? "Connecting..." : "Cloud Connection Live"}
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Active Status</p>
                        <p className="text-sm font-black text-zinc-900 uppercase italic">Zambian Nodes Synced</p>
                    </div>
                </div>
            </div>

            {/* Beginner Friendly Guide */}
            <div className="bg-primary/5 border-2 border-dashed border-primary/20 p-10 rounded-[3.5rem] space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                        <InfoIcon size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900">Command <span className="text-primary italic">Center Guide</span></h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Quick overview for the new administrator</p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-primary mb-2">Bookshop</p>
                        <p className="text-xs font-black text-zinc-900 mb-2">Manage Shop Items</p>
                        <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">Update prices, add new books, or change cover images on the public store.</p>
                        <Link href="/admin/products" className="mt-4 flex items-center gap-2 text-primary text-[10px] font-black uppercase hover:translate-x-1 transition-transform">Get Started <ArrowRightIcon size={12} /></Link>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-blue-500 mb-2">Media Lab</p>
                        <p className="text-xs font-black text-zinc-900 mb-2">Manage Stories</p>
                        <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">Publish new animations and folktales. You can link YouTube videos directly.</p>
                        <Link href="/admin/stories" className="mt-4 flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase hover:translate-x-1 transition-transform">Get Started <ArrowRightIcon size={12} /></Link>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-green-600 mb-2">Partnerships</p>
                        <p className="text-xs font-black text-zinc-900 mb-2">Teacher Leads</p>
                        <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">View teachers who contacted you. You can chat with them directly on WhatsApp.</p>
                        <Link href="/admin/teachers" className="mt-4 flex items-center gap-2 text-green-600 text-[10px] font-black uppercase hover:translate-x-1 transition-transform">Get Started <ArrowRightIcon size={12} /></Link>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">Preferences</p>
                        <p className="text-xs font-black text-zinc-900 mb-2">Site Settings</p>
                        <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">Change the workspace access key or update your social media links.</p>
                        <Link href="/admin/settings" className="mt-4 flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase hover:translate-x-1 transition-transform">Get Started <ArrowRightIcon size={12} /></Link>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Live Products"
                    value={stats.products.toString()}
                    trend={loading ? "Loading..." : "Visible in Shop"}
                    icon={<ShoppingBagIcon size={24} />}
                    color="bg-orange-50 text-orange-600"
                />
                <StatCard
                    title="Media Lab Stories"
                    value={stats.stories.toString()}
                    trend={loading ? "Loading..." : "Animations Live"}
                    icon={<PlayIcon size={24} />}
                    color="bg-blue-50 text-blue-600"
                />
                <StatCard
                    title="Partner Inquiries"
                    value={stats.requests.toString()}
                    trend={loading ? "Loading..." : "Recent Leads"}
                    icon={<UsersIcon size={24} />}
                    color="bg-green-50 text-green-600"
                />
                <StatCard
                    title="Store Visits"
                    value={stats.visits.toString()}
                    trend={loading ? "Loading..." : "Total Page Loads"}
                    icon={<EyeIcon size={24} />}
                    color="bg-purple-50 text-purple-600"
                />
            </div>

            {/* Quick Buttons Overlay */}
            <div className="grid gap-6 md:grid-cols-4">
                <QuickButton icon={<ShoppingBagIcon size={20} />} label="Manage Shop" href="/admin/products" primary />
                <QuickButton icon={<PlayIcon size={20} />} label="Manage Stories" href="/admin/stories" />
                <QuickButton icon={<UsersIcon size={20} />} label="View Partner Leads" href="/admin/teachers" />
                <QuickButton icon={<SettingsIcon size={20} />} label="Site Config" href="/admin/settings" />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Traffic Chart Placeholder */}
                <div className="lg:col-span-2 rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-sm relative overflow-hidden group">
                    <div className="mb-12 flex items-center justify-between font-black uppercase tracking-widest">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Store <span className="text-primary italic">Visits</span></h2>
                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-2">How many people are viewing your books? (Coming soon)</p>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300 text-xs">
                            <TrendingUpIcon size={18} />
                            No Data Yet
                        </div>
                    </div>

                    <div className="relative h-64 w-full flex items-end gap-3 border-b border-zinc-100 pb-2">
                        {[5, 5, 5, 5, 5, 5, 5].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-zinc-50 rounded-t-xl transition-all duration-700 relative"
                                style={{ height: `${h}%` }}
                            >
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Checklist (Replacing Activity Stream for non-technical admins) */}
                <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-sm relative group">
                    <h2 className="mb-8 text-xl font-black uppercase tracking-tighter text-zinc-900 flex items-center gap-2">
                        Daily <span className="text-primary italic">Success Checklist</span>
                    </h2>

                    <div className="space-y-6">
                        <ChecklistItem
                            text="Check New Partner Leads"
                            sub="Reply to any teachers who contacted you."
                            href="/admin/teachers"
                            done={stats.requests > 0}
                        />
                        <ChecklistItem
                            text="Review Media Lab"
                            sub="Ensure all stories have working covers."
                            href="/admin/stories"
                        />
                        <ChecklistItem
                            text="Quick Site Scan"
                            sub="Visit your home page to see it like our users do."
                            href="/"
                            external
                        />
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary text-center leading-relaxed">
                                Tip: Use the 'Workspace' link in the bottom of your website footer to return here anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChecklistItem({ text, sub, href, done = false, external = false }: any) {
    return (
        <Link
            href={href}
            target={external ? "_blank" : "_self"}
            className="flex items-start gap-4 group/item p-2 -m-2 rounded-2xl hover:bg-zinc-50 transition-colors"
        >
            <div className={`mt-0.5 h-6 w-6 shrink-0 flex items-center justify-center rounded-lg border-2 ${done ? 'bg-green-500 border-green-500 text-white' : 'border-zinc-200 text-transparent'}`}>
                <CheckCircle2Icon size={14} strokeWidth={3} className={done ? 'opacity-100' : 'opacity-0'} />
            </div>
            <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-tight text-zinc-900 group-hover/item:text-primary transition-colors">{text}</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{sub}</p>
            </div>
        </Link>
    );
}

function StatCard({ title, value, trend, icon, color }: any) {
    return (
        <div className="group relative rounded-[2.5rem] border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden">
            <div className="mb-6 flex items-center justify-between relative z-10">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">{trend}</span>
            </div>

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{title}</p>
                <p className="mt-1 text-4xl font-black tracking-tighter text-zinc-900 leading-none">{value}</p>
            </div>
        </div>
    );
}

function QuickButton({ icon, label, href, primary = false }: any) {
    return (
        <Link
            href={href}
            className={`flex items-center justify-center gap-3 rounded-[2rem] p-5 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${primary
                ? "bg-zinc-900 text-white hover:bg-primary hover:shadow-primary/20"
                : "bg-white text-zinc-500 border border-zinc-200 hover:border-primary hover:text-primary"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}

function ActivityItem({ icon, text, sub, time }: any) {
    return (
        <div className="flex items-center gap-4 group/item">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-tight text-zinc-900">{text}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{time}</p>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{sub}</p>
            </div>
        </div>
    );
}
