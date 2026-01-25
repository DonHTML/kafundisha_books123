"use client";

import { useState, useEffect } from "react";
import {
    PlusIcon,
    SearchIcon,
    YoutubeIcon,
    FileTextIcon,
    MusicIcon,
    MoreVerticalIcon,
    Edit2Icon,
    EyeIcon,
    Trash2Icon,
    PlayIcon,
    ArrowRightIcon
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function StoriesManager() {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchStories = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setStories(data || []);
        } catch (err) {
            console.error("Error fetching stories:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this story?")) return;
        try {
            const { error } = await supabase.from('stories').delete().eq('id', id);
            if (error) throw error;
            fetchStories();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (stories.length === 0) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                            Stories & <span className="text-primary italic">Media</span>
                        </h1>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Your media library is currently empty
                        </p>
                    </div>
                    <Link
                        href="/admin/stories/new"
                        className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg"
                    >
                        <PlusIcon size={18} />
                        Add First Story
                    </Link>
                </div>

                <div className="rounded-[3rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-20 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl shadow-zinc-200/50 mb-8">
                        <PlayIcon className="text-zinc-200" size={40} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900">No Stories Found</h3>
                    <p className="mx-auto max-w-xs text-sm font-medium text-zinc-500 mt-2 mb-10 capitalize">
                        Create an engaging library of read-alouds, animations, and folktales.
                    </p>
                    <Link
                        href="/admin/stories/new"
                        className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary hover:gap-5 transition-all"
                    >
                        Click here to start <ArrowRightIcon size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Stories & <span className="text-primary italic">Media</span>
                    </h1>
                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">
                        Control children's stories, animations, and PDFs
                    </p>
                </div>
                <Link
                    href="/admin/stories/new"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-zinc-900/10"
                >
                    <PlusIcon size={18} />
                    Add New Story
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <MediaStat icon={<YoutubeIcon size={18} />} label="YouTube Content" count={stories.filter(s => s.media_type === 'YouTube Video').length} />
                <MediaStat icon={<FileTextIcon size={18} />} label="PDF Library" count={stories.filter(s => s.media_type === 'PDF Document').length} />
                <MediaStat icon={<MusicIcon size={18} />} label="Audio Stories" count={stories.filter(s => s.media_type === 'Audio Track').length} />
            </div>

            {/* Stories Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                    <div key={story.id} className="group relative bg-white rounded-[2.5rem] border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden bg-zinc-100">
                            <img
                                src={story.thumbnail_url || `https://img.youtube.com/vi/${story.youtube_id}/maxresdefault.jpg`}
                                alt={story.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-6 top-6">
                                <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-900 shadow-sm">
                                    {story.media_type}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">
                                    {story.category}
                                </span>
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <div className={`h-1.5 w-1.5 rounded-full ${story.status === 'Published' ? 'bg-green-500' : 'bg-zinc-300'}`} />
                                    {story.status}
                                </div>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-6 line-clamp-1">
                                {story.title}
                            </h3>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/admin/stories/${story.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all shadow-md"
                                >
                                    <Edit2Icon size={14} />
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(story.id)} className="h-11 w-11 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all">
                                    <Trash2Icon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MediaStat({ icon, label, count }: any) {
    return (
        <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</p>
                <p className="text-2xl font-black text-zinc-900">{count}</p>
            </div>
        </div>
    );
}
