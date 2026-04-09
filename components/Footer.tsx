import { BookOpenIcon, FacebookIcon, TiktokIcon, YoutubeIcon } from "./Icons";
import StaffLink from "./StaffLink";

export default function Footer() {
    return (
        <footer className="relative border-t border-zinc-100 bg-zinc-50 py-24 overflow-hidden">
            <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid gap-16 md:grid-cols-4 pt-12">
                    <div className="col-span-2">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary shadow-lg">
                                <BookOpenIcon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-zinc-900 uppercase italic">Kafundisha</span>
                        </div>
                        <p className="max-w-sm text-lg text-zinc-500 font-medium">
                            Opening New Worlds, One Page at a Time. Beautiful, affordable learning materials for Zambian children.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-zinc-900">Links</h4>
                        <nav className="flex flex-col gap-4 text-zinc-500 font-bold">
                            <a href="/shop" className="hover:text-primary transition-colors">Shop Books</a>
                            <a href="/stories" className="hover:text-primary transition-colors">Watch Stories</a>
                            <a href="/teachers" className="hover:text-primary transition-colors">For Teachers</a>
                        </nav>
                    </div>
                    <div>
                        <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-zinc-900">Socials</h4>
                        <div className="flex gap-6">
                            <a href="https://facebook.com/kafundishabooks" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com/@kafundishabooks1?si=jPTMYOrJw1mKOUk2" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <YoutubeIcon className="h-5 w-5" />
                            </a>
                            <a href="https://tiktok.com/@kafundishabooks" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <TiktokIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-12 md:flex-row text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <span>© 2026 KAFUNDISHA BOOKS & MEDIA</span>
                    <div className="flex items-center gap-8">
                        <StaffLink />
                        <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
