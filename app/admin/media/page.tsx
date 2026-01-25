"use client";

import { useState, useEffect } from "react";
import {
    ImageIcon,
    FolderIcon,
    UploadIcon,
    SearchIcon,
    MoreVerticalIcon,
    PlusIcon,
    FileTextIcon,
    Trash2Icon,
    CopyIcon,
    CheckCircle2Icon
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function MediaLibrary() {
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const supabase = createClient();

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.storage.from('media').list();
            if (error) throw error;
            setFiles(data || []);
        } catch (err) {
            console.error("Error fetching media:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            fetchFiles();
        } catch (err) {
            console.error("Upload error:", err);
            alert("Upload failed. Make sure the 'media' bucket exists and is public.");
        } finally {
            setUploading(false);
        }
    };

    const getPublicUrl = (path: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(path);
        return data.publicUrl;
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopied(url);
        setTimeout(() => setCopied(null), 2000);
    };

    const deleteFile = async (name: string) => {
        if (!confirm("Are you sure you want to delete this file?")) return;
        try {
            const { error } = await supabase.storage.from('media').remove([name]);
            if (error) throw error;
            fetchFiles();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Media <span className="text-primary italic">Lab</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Cloud storage for images, books, and educational resources
                    </p>
                </div>
                <label className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg cursor-pointer">
                    {uploading ? (
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <UploadIcon size={18} />
                    )}
                    {uploading ? "Uploading..." : "Upload Resource"}
                    <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {/* Storage Folders (Abstract View) */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FolderCard name="Products" count={files.filter(f => f.name.includes('prod')).length} color="text-orange-500" />
                <FolderCard name="Stories" count={files.filter(f => f.name.includes('story')).length} color="text-blue-500" />
                <FolderCard name="PDF Docs" count={files.filter(f => f.name.endsWith('.pdf')).length} color="text-red-500" />
                <FolderCard name="All Assets" count={files.length} color="text-purple-500" />
            </div>

            {/* Assets Grid */}
            <div className="bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-sm min-h-[500px]">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 flex items-center gap-3">
                        Cloud Files
                        {loading && <div className="h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />}
                    </h2>
                    <div className="relative max-w-xs w-full">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Find a file..."
                            className="w-full rounded-xl bg-zinc-50 border-none pl-10 pr-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {!loading && files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-200 mb-6">
                            <ImageIcon size={40} />
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-tighter text-zinc-900">Your Lab is Empty</h4>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2 max-w-[240px]">Upload your first book cover or PDF document to start.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {files.map((file) => {
                            const url = getPublicUrl(file.name);
                            const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

                            return (
                                <div key={file.id} className="group relative aspect-square rounded-2xl bg-zinc-50 border border-zinc-100 overflow-hidden">
                                    {isImage ? (
                                        <img src={url} alt={file.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-zinc-400">
                                            <FileTextIcon size={40} />
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-sm">
                                        <button
                                            onClick={() => copyToClipboard(url)}
                                            className="w-full py-2 bg-white rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                                        >
                                            {copied === url ? <CheckCircle2Icon size={12} /> : <CopyIcon size={12} />}
                                            {copied === url ? "Copied" : "Copy Link"}
                                        </button>
                                        <button
                                            onClick={() => deleteFile(file.name)}
                                            className="w-full py-2 bg-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2Icon size={12} />
                                            Delete
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur px-3 py-1.5 border-t border-zinc-100 group-hover:hidden">
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-zinc-900 truncate">
                                            {file.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function FolderCard({ name, count, color }: any) {
    return (
        <div className="group bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden relative">
            <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
                <FolderIcon size={80} fill="currentColor" />
            </div>
            <FolderIcon className={`${color} mb-6 transition-transform group-hover:scale-110 relative z-10`} size={40} fill="currentColor" fillOpacity={0.1} />
            <div className="relative z-10">
                <h3 className="text-lg font-black uppercase tracking-tighter text-zinc-900">{name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">{count} Objects Found</p>
            </div>
        </div>
    );
}
