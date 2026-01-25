import { FacebookIcon, TiktokIcon, YoutubeIcon, WhatsAppIcon, BookOpenIcon } from "@/components/Icons";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pb-32">
            <section className="relative py-24 px-6 overflow-hidden bg-zinc-50">
                <div className="blob bg-orange-100 w-[600px] h-[600px] -top-24 left-0" />
                <div className="relative z-10 mx-auto max-w-7xl">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Our Journey</span>
                    <h1 className="mt-4 text-5xl font-black tracking-tighter text-zinc-900 md:text-8xl">
                        Education <span className="text-primary italic">Reimagined</span>
                    </h1>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-24 mt-12">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight text-zinc-900 mb-8 uppercase">Our Story</h2>
                        <div className="space-y-6 text-xl text-zinc-500 font-medium leading-relaxed">
                            <p>
                                Kafundisha Books was founded with a single, clear purpose: to ensure that learning is a joy,
                                not a chore, for every child in Zambia.
                            </p>
                            <p>
                                We noticed that many educational materials were either outdated, inaccessible, or didn't reflect
                                the vibrant reality of our local culture. We decided to bridge that gap by creating
                                affordable, high-quality, and locally relevant books.
                            </p>
                            <p>
                                Our team of educators and creators work tirelessly to produce content that isn't just about
                                passing exams, but about building curiosity, confidence, and a lifelong love for learning.
                            </p>
                        </div>
                    </div>

                    <div className="p-12 rounded-[3rem] bg-soft-orange border border-orange-100">
                        <h3 className="text-3xl font-black text-zinc-900 mb-6">Our Values</h3>
                        <div className="grid gap-6">
                            {[
                                { t: "Accessibility", d: "Quality education should be affordable for all." },
                                { t: "Representation", d: "Children should see themselves in the stories they read." },
                                { t: "Innovation", d: "Combining physical books with digital storytelling." },
                            ].map(v => (
                                <div key={v.t} className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-black text-zinc-900 uppercase text-sm tracking-widest">{v.t}</p>
                                        <p className="text-zinc-500 font-medium">{v.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="sticky top-32 space-y-8">
                        <div className="rounded-[4rem] bg-zinc-900 p-12 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-all" />
                            <h2 className="text-4xl font-black tracking-tight mb-8">Let's Connect</h2>

                            <div className="space-y-12 relative z-10">
                                <div>
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-4">Chat with us</span>
                                    <a
                                        href="https://wa.me/260977755766"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 text-2xl font-black hover:text-primary transition-colors"
                                    >
                                        <WhatsAppIcon className="h-8 w-8 text-green-500" />
                                        +260 977 755 766
                                    </a>
                                </div>

                                <div>
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-4">Follow the story</span>
                                    <div className="flex gap-6">
                                        <a href="https://facebook.com/kafundishabooks" target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all border border-white/5">
                                            <FacebookIcon className="h-6 w-6" />
                                        </a>
                                        <a href="https://youtube.com/@kafundishabooks1?si=jPTMYOrJw1mKOUk2" target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all border border-white/5">
                                            <YoutubeIcon className="h-6 w-6" />
                                        </a>
                                        <a href="https://tiktok.com/@kafundishabooks" target="_blank" rel="noopener noreferrer" className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all border border-white/5">
                                            <TiktokIcon className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center">
                                        <BookOpenIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">Main Office</p>
                                        <p className="text-xl font-bold">Lusaka, Zambia</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
                            <iframe
                                className="relative z-10 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123086.85210143891!2d28.2323!3d-15.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194074f37803e4d9%3A0x6e9a039b56f2f2!2sLusaka%2C%20Zambia!5e0!3m2!1sen!2sus!4v1642845000000!5m2!1sen!2sus"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
