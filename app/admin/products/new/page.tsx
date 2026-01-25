"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    SaveIcon,
    PlusIcon,
    ShoppingBagIcon,
    TypeIcon,
    TagIcon,
    CheckCircle2Icon,
    AlertCircleIcon,
    ImageIcon,
    UploadIcon,
    Loader2Icon
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function NewProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "K",
        description: "",
        category: "Books",
        color_class: "bg-orange-50",
        image_url: ""
    });

    const supabase = createClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        setError("");

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `prod_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
        } catch (err: any) {
            console.error("Upload error:", err);
            setError("Image upload failed. Check bucket permissions.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: dbError } = await supabase
                .from('products')
                .insert([formData]);

            if (dbError) throw dbError;

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/products");
            }, 2000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong while saving.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 transition-all shadow-sm"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Create <span className="text-primary italic">Product</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Add a new item to your educational catalog
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Product Title</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <TypeIcon size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Preschool Math Workbook"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Price (ZMW)</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <ShoppingBagIcon size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="K0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell the brand manager about this product..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Selector */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Product Image</label>
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-200 rounded-[2rem] p-10 bg-zinc-50/50 hover:bg-zinc-50 hover:border-primary/30 transition-all cursor-pointer group">
                                    {uploading ? (
                                        <Loader2Icon className="h-10 w-10 text-primary animate-spin" />
                                    ) : (
                                        <UploadIcon className="h-10 w-10 text-zinc-300 group-hover:text-primary transition-colors" />
                                    )}
                                    <div className="text-center">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-900">{uploading ? "Uploading..." : "Upload local file"}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">JPG, PNG, WebP allowed</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                </label>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Or use external URL</p>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                            <ImageIcon size={18} />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="Paste Image Link"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {formData.image_url && (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-100 bg-zinc-50 group">
                                <img src={formData.image_url} alt="Preview" className="h-full w-full object-contain" />
                                <div className="absolute inset-x-6 top-6">
                                    <span className="inline-block rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 shadow-sm border border-white">Live Preview</span>
                                </div>
                                <button
                                    onClick={() => setFormData({ ...formData, image_url: "" })}
                                    className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-white border border-zinc-200 text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-50"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Organization */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Category</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                                    <TagIcon size={18} />
                                </div>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                >
                                    <option>Books</option>
                                    <option>Flashcards</option>
                                    <option>Supplies</option>
                                    <option>Downloads</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Card Color Theme</label>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { class: "bg-orange-50", border: "border-orange-200" },
                                    { class: "bg-blue-50", border: "border-blue-200" },
                                    { class: "bg-green-50", border: "border-green-200" },
                                    { class: "bg-purple-50", border: "border-purple-200" },
                                ].map((color) => (
                                    <button
                                        key={color.class}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color_class: color.class })}
                                        className={`h-10 w-10 rounded-xl ${color.class} ${color.border} border-2 transition-all ${formData.color_class === color.class ? 'scale-110 shadow-lg ring-2 ring-primary/20' : 'opacity-60'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`w-full flex items-center justify-center gap-3 rounded-[2rem] p-6 text-xs font-black uppercase tracking-widest transition-all shadow-xl ${success
                                ? "bg-green-500 text-white"
                                : "bg-zinc-900 text-white hover:bg-primary hover:shadow-primary/20"
                                }`}
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : success ? (
                                <>
                                    <CheckCircle2Icon size={20} />
                                    Published!
                                </>
                            ) : (
                                <>
                                    <SaveIcon size={20} />
                                    Publish Product
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 animate-in fade-in zoom-in duration-300">
                                <AlertCircleIcon size={18} className="shrink-0" />
                                <p className="text-[10px] font-black uppercase tracking-wider leading-tight">{error}</p>
                            </div>
                        )}

                        <p className="text-[10px] font-bold text-zinc-400 text-center uppercase tracking-widest px-8">
                            This will make the product visible in the public shop instantly.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
