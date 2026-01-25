"use client";

import { useState, useEffect } from "react";
import {
    SettingsIcon,
    SaveIcon,
    SmartphoneIcon,
    GlobeIcon,
    TypeIcon,
    PowerIcon,
    CheckCircle2Icon,
    LockIcon,
    KeyIcon,
    EyeIcon,
    EyeOffIcon
} from "lucide-react";
import { FacebookIcon, YoutubeIcon, TiktokIcon } from "@/components/Icons";
import { createClient } from "@/utils/supabase/client";

export default function SiteSettings() {
    const [saving, setSaving] = useState(false);
    const [accessKey, setAccessKey] = useState("");
    const [showKey, setShowKey] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await supabase
                    .from('site_settings')
                    .select('config_value')
                    .eq('config_key', 'admin_access_key')
                    .single();

                if (data?.config_value?.key) {
                    setAccessKey(data.config_value.key);
                } else {
                    const localKey = localStorage.getItem("admin_access_key") || "admin123";
                    setAccessKey(localKey);
                }
            } catch (err) {
                const localKey = localStorage.getItem("admin_access_key") || "admin123";
                setAccessKey(localKey);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save to Cloud
            await supabase.from('site_settings').upsert({
                config_key: 'admin_access_key',
                config_value: { key: accessKey }
            });

            // Save to Local (Backup)
            localStorage.setItem("admin_access_key", accessKey);
        } catch (err) {
            console.error("Cloud save failed, using local only", err);
            localStorage.setItem("admin_access_key", accessKey);
        }
        setTimeout(() => setSaving(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Site <span className="text-primary italic">Settings</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Global configuration for phone, social links, and visibility
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-8 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-zinc-900/10 min-w-[200px]"
                >
                    {saving ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Saving Changes...
                        </>
                    ) : (
                        <>
                            <SaveIcon size={18} />
                            Save Config
                        </>
                    )}
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Core Contact */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-8 flex items-center gap-3">
                            <SmartphoneIcon size={20} className="text-primary" />
                            Contact & WhatsApp
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Primary WhatsApp Number</label>
                                <input
                                    type="text"
                                    defaultValue="+260 977 755 766"
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                                <p className="text-[10px] font-bold text-zinc-400 mt-3 px-1 uppercase tracking-widest">Updates all wa.me links on every page automatically.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-8 flex items-center gap-3">
                            <GlobeIcon size={20} className="text-primary" />
                            Social Media Presence
                        </h2>
                        <div className="space-y-6">
                            <SocialInput icon={<FacebookIcon size={18} />} label="Facebook" value="facebook.com/kafundishabooks" />
                            <SocialInput icon={<YoutubeIcon size={18} />} label="YouTube" value="youtube.com/@kafundishabooks1" />
                            <SocialInput icon={<TiktokIcon size={18} />} label="TikTok" value="tiktok.com/@kafundishabooks" />
                        </div>
                    </section>
                </div>

                {/* Content & Visibility */}
                <div className="space-y-8">
                    <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-8 flex items-center gap-3">
                            <TypeIcon size={20} className="text-primary" />
                            Site Branding
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Main Slogan</label>
                                <input
                                    type="text"
                                    defaultValue="Opening New Worlds, One Page at a Time!"
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Footer Copyright Text</label>
                                <input
                                    type="text"
                                    defaultValue="© 2026 KAFUNDISHA BOOKS & MEDIA"
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-8 flex items-center gap-3">
                            <PowerIcon size={20} className="text-primary" />
                            Feature Toggles
                        </h2>
                        <div className="space-y-4">
                            <ToggleItem label="Public Shop Page" enabled />
                            <ToggleItem label="Animated Stories Section" enabled />
                            <ToggleItem label="Teacher Partnership Form" enabled />
                            <ToggleItem label="Kafundisha Academy Teaser" enabled />
                            <ToggleItem label="Wholesale Application" enabled />
                        </div>
                    </section>
                    <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-8 flex items-center gap-3">
                            <LockIcon size={20} className="text-primary" />
                            Security
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Workspace Access Key</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <KeyIcon size={18} />
                                    </div>
                                    <input
                                        type={showKey ? "text" : "password"}
                                        value={accessKey}
                                        onChange={(e) => setAccessKey(e.target.value)}
                                        className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-14 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowKey(!showKey)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-primary transition-colors"
                                    >
                                        {showKey ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                    </button>
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 mt-3 px-1 uppercase tracking-widest">This key is required to enter the admin workspace.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function SocialInput({ icon, label, value }: any) {
    return (
        <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">{label} URL</label>
            <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                    {icon}
                </div>
                <input
                    type="text"
                    defaultValue={value}
                    className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>
        </div>
    );
}

function ToggleItem({ label, enabled = false }: any) {
    const [isOn, setIsOn] = useState(enabled);
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 group transition-colors hover:bg-white border border-transparent hover:border-zinc-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`relative h-6 w-11 rounded-full transition-colors ${isOn ? 'bg-primary' : 'bg-zinc-200'}`}
            >
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${isOn ? 'left-6' : 'left-1'}`} />
            </button>
        </div>
    );
}
