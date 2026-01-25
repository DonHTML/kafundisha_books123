"use client";

import { useState } from "react";
import { LockIcon, KeyIcon, ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SecretVault() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // The secret code to UNLOCK the vault (not the admin password)
    const SECRET_VAULT_CODE = "777";
    // The current admin password (as a reminder for the admin)
    const ADMIN_PASSWORD = "admin123";

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputCode === SECRET_VAULT_CODE) {
            setIsVerified(true);
        } else {
            alert("Incorrect Secret Code");
            setInputCode("");
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-[100]">
            {/* The subtle trigger - a tiny hidden dot or small lock */}
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="h-2 w-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-default"
                    title="System Access"
                />
            ) : (
                <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-2xl w-72 animate-in zoom-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <LockIcon size={16} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Vault Access</span>
                        </div>
                        <button onClick={() => { setIsOpen(false); setIsVerified(false); setInputCode(""); }} className="text-zinc-300 hover:text-zinc-600 font-bold">&times;</button>
                    </div>

                    {!isVerified ? (
                        <form onSubmit={handleVerify} className="space-y-4">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">Enter your personal secret code to unlock admin details.</p>
                            <input
                                autoFocus
                                type="password"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                placeholder="Secret Code"
                                className="w-full rounded-xl bg-zinc-50 border-none px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                            <button className="w-full bg-zinc-900 text-white rounded-xl py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Verify Identity</button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                                <ShieldCheckIcon size={18} className="text-green-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Verified Admin</span>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Workspace Key:</p>
                                <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                                    <code className="text-xs font-black text-zinc-900 select-all tracking-wider">{ADMIN_PASSWORD}</code>
                                    <KeyIcon size={14} className="text-zinc-300" />
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/admin/login")}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-4 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                                Go to Dashboard
                                <ArrowRightIcon size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
