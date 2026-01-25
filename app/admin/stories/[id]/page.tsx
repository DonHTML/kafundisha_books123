"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeftIcon,
    SaveIcon,
    PlayIcon,
    TypeIcon,
    TagIcon,
    CheckCircle2Icon,
    AlertCircleIcon,
    YoutubeIcon,
    FileTextIcon,
    ImageIcon,
    Trash2Icon,
    UploadIcon,
    Loader2Icon
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function EditStory() {
    const router = useRouter();
    const params = useParams();
    const storyId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        youtube_id: "",
        description: "",
        category: "Short Stories",
        media_type: "YouTube Video",
        thumbnail_url: ""
    });

    const supabase = createClient();

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const { data, error: fetchError } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('id', storyId)
                    .single();

                if (fetchError) throw fetchError;
                if (data) setFormData(data);
            } catch (err: any) {
                console.error(err);
                setError("Could not load story data.");
            } finally {
                setLoading(false);
            }
        };

        if (storyId) fetchStory();
    }, [storyId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        setError("");

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `story_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setFormData({ ...formData, thumbnail_url: publicUrl });
        } catch (err: any) {
            console.error("Upload error:", err);
            setError("Thumbnail upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const { error: dbError } = await supabase
                .from('stories')
                .update(formData)
                .eq('id', storyId);

            if (dbError) throw dbError;

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong while saving.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Permanently remove this story from the Media Lab?")) return;
        try {
            const { error: delError } = await supabase
                .from('stories')
                .delete()
                .eq('id', storyId);

            if (delError) throw delError;
            router.push("/admin/stories");
        } catch (err) {
            console.error(err);
            setError("Failed to delete story.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/stories"
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 transition-all shadow-sm"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Edit <span className="text-primary italic">Story</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Modify media for {formData.title || 'this entry'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="h-12 w-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-100"
                >
                    <Trash2Icon size={20} />
                </button>
            </div>

            <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Story Title</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <TypeIcon size={18} />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Story Title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">YouTube Video ID</label>
                                <div className="relative">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <YoutubeIcon size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Video ID (e.g. lW0D3IG2UZ8)"
                                        value={formData.youtube_id}
                                        onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                                        className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Story description..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Selector */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Story Thumbnail</label>
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-200 rounded-[2rem] p-10 bg-zinc-50/50 hover:bg-zinc-50 hover:border-primary/30 transition-all cursor-pointer group">
                                    {uploading ? (
                                        <Loader2Icon className="h-10 w-10 text-primary animate-spin" />
                                    ) : (
                                        <UploadIcon className="h-10 w-10 text-zinc-300 group-hover:text-primary transition-colors" />
                                    )}
                                    <div className="text-center">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-900">{uploading ? "Uploading..." : "Upload new file"}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Image files only</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                </label>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-center">Or update with URL</p>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
                                            <ImageIcon size={18} />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="Paste Image Link"
                                            value={formData.thumbnail_url}
                                            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                                            className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(formData.thumbnail_url || formData.youtube_id) && (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-100 bg-zinc-50 group">
                                <img
                                    src={formData.thumbnail_url || `https://img.youtube.com/vi/${formData.youtube_id}/maxresdefault.jpg`}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-x-6 top-6 flex justify-between w-full pr-12">
                                    <span className="inline-block rounded-lg bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 shadow-sm border border-white">Current Thumbnail</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, thumbnail_url: "" })}
                                    className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-white border border-zinc-200 text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-50"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Classification */}
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
                                    <option>Short Stories</option>
                                    <option>African Folktales</option>
                                    <option>Learn & Play</option>
                                    <option>Nursery Rhymes</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-1">Media Type</label>
                            <div className="relative">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                                    <FileTextIcon size={18} />
                                </div>
                                <select
                                    value={formData.media_type}
                                    onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                                    className="w-full rounded-2xl bg-zinc-50 border-none pl-14 pr-6 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-primary/20 transition-all h-[60px]"
                                >
                                    <option>YouTube Video</option>
                                    <option>PDF Document</option>
                                    <option>Audio Track</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`w-full flex items-center justify-center gap-3 rounded-[2rem] p-6 text-xs font-black uppercase tracking-widest transition-all shadow-xl ${success
                                ? "bg-green-500 text-white"
                                : "bg-zinc-900 text-white hover:bg-primary"
                                }`}
                        >
                            {saving ? (
                                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : success ? (
                                <>
                                    <CheckCircle2Icon size={20} />
                                    Changes Saved
                                </>
                            ) : (
                                <>
                                    <SaveIcon size={20} />
                                    Update Story
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100">
                                <AlertCircleIcon size={18} className="shrink-0" />
                                <p className="text-[10px] font-black uppercase tracking-wider leading-tight">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
