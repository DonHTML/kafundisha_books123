import { createStaticClient } from "@/utils/supabase/server";
import StoriesClient from "@/components/StoriesClient";
import Link from "next/link";
import { YoutubeIcon, BookOpenIcon } from "@/components/Icons";

export const revalidate = 3600; // revalidate every hour

export default async function StoriesPage() {
    const supabase = createStaticClient();

    const { data: stories } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

    const displayStories = (stories && stories.length > 0) ? stories : [
        {
            title: "Cat and Pig's Fun Run",
            description: "A delightful story about friendship and teamwork as Cat and Pig participate in their community race.",
            youtube_id: "1674mphEgCc",
            category: "Short Stories",
            thumbnail_url: "https://img.youtube.com/vi/1674mphEgCc/maxresdefault.jpg",
        },
        {
            title: "Kalulu and the Stubborn Hippo",
            description: "A traditional African animal story about wisdom and wit. Follow Kalulu as he teaches a lesson.",
            youtube_id: "lW0D3IG2UZ8",
            category: "African Folktales",
            thumbnail_url: "https://img.youtube.com/vi/lW0D3IG2UZ8/maxresdefault.jpg",
        }
    ];

    return (
        <>
            <StoriesClient initialStories={displayStories} />

            <section className="mx-auto max-w-7xl px-6 pb-32 pt-20 text-center">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 text-primary mb-8">
                    <BookOpenIcon className="h-10 w-10" />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 mb-6">
                    More stories <span className="text-primary italic">incoming</span>
                </h2>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium mb-12">
                    We're working with local authors and animators to bring even more Zambian stories to life. Subscribe to our YouTube channel for updates.
                </p>
                <Link
                    href="https://youtube.com/@Kafundisha"
                    className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-10 py-5 text-xl font-black uppercase tracking-widest text-white transition-all hover:bg-primary shadow-xl"
                >
                    <YoutubeIcon className="h-6 w-6" />
                    YouTube Channel
                </Link>
            </section>
        </>
    );
}
