"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenIcon, LockIcon, ArrowRightIcon } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await loginAction(password);
            if (result.success) {
                // Ensure local storage has a flag for compatibility if needed elsewhere, but not for security
                localStorage.setItem("admin_auth", "true");

                // Use window.location.href to force a hard reload so Middleware intercepts and sets cookies securely
                window.location.href = "/admin";
            } else {
                setError(result.error || "Login Failed");
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setError("Connection error. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,rgba(249,112,21,0.05)_0%,transparent_50%)]">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/30 text-white mb-6">
                        <BookOpenIcon size={32} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Kafundisha <span className="text-primary italic">Workspace</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-2">
                        Secure Administrator Access
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-xl shadow-zinc-200/50">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">
                                Secure Access Key
                            </label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <LockIcon size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-[10px] font-bold text-red-500 mt-3 px-1 uppercase tracking-widest animate-shake">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Enter Workspace
                                    <ArrowRightIcon size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    );
}
