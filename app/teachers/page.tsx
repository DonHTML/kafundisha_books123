"use client";

import { useState } from "react";
import { WhatsAppIcon, ArrowUpRightIcon, BookOpenIcon } from "@/components/Icons";
import { CheckCircle2Icon, AlertCircleIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function TeachersPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        school: "",
        phone: "",
        location: "",
        interest: "Bulk Purchase"
    });

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: dbError } = await supabase
                .from('teacher_requests')
                .insert([{
                    ...formData,
                    status: 'New'
                }]);

            if (dbError) throw dbError;

            setSuccess(true);
            setFormData({ name: "", school: "", phone: "", location: "", interest: "Bulk Purchase" });
        } catch (err: any) {
            setError("Failed to send inquiry. Please try WhatsApp directly.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-32">
            <section className="relative py-24 px-6 overflow-hidden bg-soft-blue">
                <div className="blob bg-blue-300/20 w-[600px] h-[600px] -top-24 -left-24" />
                <div className="relative z-10 mx-auto max-w-7xl">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary">Partnership</span>
                    <h1 className="mt-4 text-5xl font-black tracking-tighter text-zinc-900 md:text-8xl">
                        For <span className="text-secondary italic">Educators</span>
                    </h1>
                    <p className="mt-8 max-w-2xl text-xl text-zinc-500 font-medium leading-relaxed">
                        We support Zambian teachers with affordable materials, bulk discounts, and opportunities
                        to partner with us locally.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-3 mt-12 items-start">
                {/* Info Cards */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Bulk Purchases */}
                        <div className="group rounded-[3rem] bg-white border border-zinc-100 p-12 transition-all hover:border-secondary hover:shadow-2xl hover:shadow-secondary/5">
                            <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                                <BookOpenIcon className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-black tracking-tight text-zinc-900 mb-6">Bulk Discount</h2>
                            <p className="text-xl text-zinc-500 mb-8 leading-relaxed font-medium">
                                Equip your entire classroom or school with our high-quality materials at special institutional prices.
                            </p>
                            <ul className="space-y-4 mb-12 text-zinc-900 font-bold">
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-secondary" />
                                    </div>
                                    Up to 30% off for schools
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-secondary" />
                                    </div>
                                    Free shipping on bulk orders
                                </li>
                            </ul>
                            <a
                                href="https://wa.me/260977755766?text=Hi! I'm a teacher and I'd like to inquire about bulk discounts."
                                className="inline-flex items-center gap-3 rounded-2xl bg-secondary px-8 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-zinc-900 shadow-xl"
                            >
                                <WhatsAppIcon className="h-5 w-5" />
                                Get a Quote
                            </a>
                        </div>

                        {/* Wholesale Partner */}
                        <div className="group rounded-[3rem] bg-zinc-900 p-12 transition-all">
                            <div className="h-16 w-16 rounded-3xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                                <span className="text-2xl font-black uppercase tracking-widest">K</span>
                            </div>
                            <h2 className="text-4xl font-black tracking-tight text-white mb-6 uppercase">Wholesale</h2>
                            <p className="text-xl text-zinc-400 mb-8 leading-relaxed font-medium">
                                Become a distributor. Earn income by bringing Kafundisha Books to your community.
                            </p>
                            <a
                                href="https://wa.me/260977755766?text=Hi! I'm interested in becoming a wholesale partner."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-black uppercase tracking-widest text-zinc-900 transition-all hover:bg-secondary hover:text-white"
                            >
                                Apply Today
                                <ArrowUpRightIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Academy Teaser */}
                    <div className="rounded-[4rem] border-4 border-dashed border-zinc-100 p-12 text-center group transition-colors hover:border-secondary/20 bg-zinc-50/50">
                        <span className="inline-block rounded-full bg-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-secondary mb-8">
                            Future Vision
                        </span>
                        <h3 className="text-4xl font-black tracking-tight text-zinc-900 mb-6 md:text-7xl italic">
                            Kafundisha <span className="text-secondary font-serif">Academy</span>
                        </h3>
                        <p className="text-xl text-zinc-500 max-w-xl mx-auto font-medium">
                            We are building a platform for teacher training and expert-led video lessons.
                            Coming late 2026.
                        </p>
                    </div>
                </div>

                {/* Inquiry Form */}
                <div className="sticky top-32 bg-white rounded-[3rem] border border-zinc-200 p-10 shadow-2xl shadow-zinc-200/50 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <SendIcon size={120} />
                    </div>

                    <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Partner <span className="text-secondary italic">Inquiry</span></h2>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">Direct line to our partnership team</p>

                    {success ? (
                        <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                            <div className="h-20 w-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2Icon size={40} />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Inquiry Sent!</h4>
                            <p className="text-sm font-medium text-zinc-500 mb-8 text-center px-4">Our team will reach out to your school or phone shortly.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-xs font-black uppercase tracking-widest text-secondary border-b-2 border-secondary/20 pb-1 hover:border-secondary transition-all"
                            >
                                Send another inquiry
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-4">
                                <input
                                    required
                                    type="text"
                                    placeholder="Your Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20"
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="School / Organization"
                                    value={formData.school}
                                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20"
                                />
                                <input
                                    required
                                    type="tel"
                                    placeholder="WhatsApp / Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20"
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="City / Province"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20"
                                />
                                <select
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20"
                                    value={formData.interest}
                                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                >
                                    <option>Bulk Purchase</option>
                                    <option>Wholesale/Distributor</option>
                                    <option>School Partnership</option>
                                    <option>Export Request</option>
                                </select>
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100">
                                    <AlertCircleIcon size={16} />
                                    <p className="text-[10px] font-black uppercase tracking-wider">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 py-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-secondary shadow-xl shadow-zinc-900/10"
                            >
                                {loading ? (
                                    <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Submit Request
                                        <ArrowUpRightIcon size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
